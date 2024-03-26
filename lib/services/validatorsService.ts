import {HeaderIndexes, Option} from "../models.ts";

export const validateDataset = (dataset: string[][]) => {
    if (dataset.length < 2) {
        throw new Error("Dataset must have at least two rows (one for headers and one for data).");
    }
};

export const validateDatasetMapping = (datasetMapping: string[][] | undefined, variableNameIndex: number): void => {
    if (datasetMapping == undefined || datasetMapping.length === 0) {
        return
    }
    const headers = datasetMapping[0];
    if (headers.length < 4) {
        throw new Error("Dataset mapping must have at least 4 columns (VariableName, PreciseAbbreviation, Id, CdeLevel).");
    }

    // Create a set to track variableNames
    const variableNameSet = new Set<string>();

    // Skip the header row, start from the first data row
    for (let i = 1; i < datasetMapping.length; i++) {
        const row = datasetMapping[i];
        const variableName = row[variableNameIndex];

        // Check if the variableName is already in the set
        if (variableNameSet.has(variableName)) {
            // TODO: Potentially use the last one instead of throw an error
            throw new Error(`Duplicate variable name '${variableName}' found at row ${i + 1}.`);
        }

        // Add the variableName to the set
        variableNameSet.add(variableName);
    }
};

export function isCustomDictionaryValid(option: Option, headerIndexes: HeaderIndexes): boolean {
    return option.content[headerIndexes.preciseAbbreviation]?.value != '' && option.content[headerIndexes.title]?.value != ''
}
