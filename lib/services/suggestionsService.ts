import {DatasetMapping, HeaderMapping, MappingFrequency, Suggestion} from "../models.ts";
import {getPreciseAbbreviation, isRowMapped} from "../helpers/functions.ts";

export const computeMappingFrequency = (
    mainDatasetMapping: DatasetMapping,
    additionalDatasetMappings: DatasetMapping[],
    headerMapping: HeaderMapping
): MappingFrequency => {
    const mappingFrequency: MappingFrequency = {};

    // Initialize mappingFrequency with keys from mainDatasetMapping
    Object.keys(mainDatasetMapping).forEach(variableName => {
        mappingFrequency[variableName] = {};
    });

    // Populate mappingFrequency based on additionalDatasetMappings
    additionalDatasetMappings.forEach(datasetMapping => {
        Object.entries(datasetMapping).forEach(([variableName, row]) => {
            if (mappingFrequency[variableName] !== undefined) { // Only consider keys present in mainDatasetMapping
                const mappedTo = getPreciseAbbreviation(row, headerMapping);
                if (isRowMapped(row, headerMapping)) {
                    if (!mappingFrequency[variableName][mappedTo]) {
                        mappingFrequency[variableName][mappedTo] = { count: 0, row: row };
                    }
                    mappingFrequency[variableName][mappedTo].count += 1;
                }
            }
        });
    });

    return mappingFrequency;
};

export const getSuggestionsAux = (
    variableName: string,
    mappingFrequency: MappingFrequency
): Suggestion[] => {
    const keySuggestions: Suggestion[] = [];
    const frequencyMap = mappingFrequency[variableName];

    if (frequencyMap) {
        for (const [, { count, row }] of Object.entries(frequencyMap)) {
            keySuggestions.push({
                key: variableName,
                value: row, // TODO: Transform this to CDE or CustomDictionaryField as needed.
                score: count
            });
        }
    }

    // Sort suggestions for this key based on score, descending
    keySuggestions.sort((a, b) => b.score - a.score);

    return keySuggestions;
};
