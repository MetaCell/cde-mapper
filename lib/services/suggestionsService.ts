import {DatasetMapping, Entity, EntityType, HeaderMapping, Suggestions} from "../models.ts";
import {getEntityFromRow, getPreciseAbbreviation, isRowMapped} from "../helpers/functions.ts";


type SortingEntity = {
    entity: Entity,
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
    datasetMappingHeader: string[],
    headerMapping: HeaderMapping
): Suggestions => {
    // Intermediate object to store SortingEntities
    const intermediateResults: IntermediateResults = {};

    // Populate intermediateResults based on additionalDatasetMappings
    additionalDatasetMappings.forEach((datasetMapping, index) => {
        Object.entries(datasetMapping).forEach(([variableName, row]) => {
            if (mainDatasetMapping[variableName] !== undefined) { // Only consider keys present in mainDatasetMapping
                if (isRowMapped(row, headerMapping)) {
                    const entity = getEntityFromRow(row, datasetMappingHeader, headerMapping);
                    const preciseAbbrev = getPreciseAbbreviation(row, headerMapping);

                    if (!intermediateResults[variableName]) {
                        intermediateResults[variableName] = {};
                    }
                    if (!intermediateResults[variableName][preciseAbbrev]) {
                        intermediateResults[variableName][preciseAbbrev] = {
                            entity,
                            type: entity.type,
                            count: 0,
                            index
                        };
                    }
                    intermediateResults[variableName][preciseAbbrev].count += 1;
                }
            }
        });
    });

    // Convert intermediateResults to final Suggestions format and sort
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
            return a.type === EntityType.MappedCDE ? -1 : 1; // Prioritize 'cde' type
        });
        suggestions[variableName] = entities.map(item => item.entity);
    });

    return suggestions;
};
