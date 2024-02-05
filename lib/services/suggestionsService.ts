import {DatasetMapping, HeaderMapping, MappingFrequency} from "../models.ts";
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