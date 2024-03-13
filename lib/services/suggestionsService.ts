import {DatasetMapping, EntityType, HeaderIndexes, Suggestions} from "../models.ts";
import {getId, getType, isRowMapped} from "../helpers/getters.ts";


type SortingEntity = {
    row: string[],
    type: EntityType,
    count: number,
    index: number
};

interface IntermediateResults {
    [variableName: string]: {
        [preciseAbbrev: string]: SortingEntity
    }
}

export const computeSuggestions = (
    mainDatasetMapping: DatasetMapping,
    additionalDatasetMappings: DatasetMapping[],
    headerIndexes: HeaderIndexes
): Suggestions => {

    // Intermediate object to store SortingEntities
    const intermediateResults: IntermediateResults = {};

    // Populate intermediateResults based on additionalDatasetMappings
    additionalDatasetMappings.forEach((datasetMapping, index) => {
        Object.entries(datasetMapping).forEach(([variableName, row]) => {
            if (mainDatasetMapping[variableName] !== undefined &&
                !isRowMapped(mainDatasetMapping[variableName], headerIndexes)) { // Only consider keys present but not mapped in mainDatasetMapping
                if (isRowMapped(row, headerIndexes)) {
                    const entryId = getId(row, headerIndexes);

                    if (!intermediateResults[variableName]) {
                        intermediateResults[variableName] = {};
                    }
                    if (!intermediateResults[variableName][entryId]) {
                        intermediateResults[variableName][entryId] = {
                            row,
                            type: getType(row, headerIndexes),
                            count: 0,
                            index
                        };
                    }
                    intermediateResults[variableName][entryId].count += 1;
                }
            }
        });
    });

    // Convert intermediateResults to final suggestions format and sort
    const suggestions: Suggestions = {};
    Object.keys(intermediateResults).forEach(variableName => {
        const entities = Object.values(intermediateResults[variableName]);
        entities.sort((a, b) => {
            if (a.type === b.type) {
                if (a.count === b.count) {
                    return a.index - b.index; // Prioritize suggestions from additionalDatasetMappings with lower index
                }
                return b.count - a.count; // Sort by count, higher first
            }
            return a.type === EntityType.CDE ? -1 : 1; // Prioritize 'cde' type
        });
        suggestions[variableName] = entities.map(item => item.row);
    });

    return suggestions;
};
