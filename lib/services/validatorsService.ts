export const validateDatasetMapping = (datasetMapping: string[][], variableNameIndex: number): void => {
    if (datasetMapping.length === 0) {
        throw new Error("Dataset mapping is empty.");
    }
    const headers = datasetMapping[0];
    if (headers.length < 3) {
        throw new Error("Dataset mapping must have at least 3 columns (VariableName, PreciseAbbreviation, InterlexId).");
    }

    // Create a set to track variableNames
    const variableNameSet = new Set<string>();

    // Skip the header row, start from the first data row
    for (let i = 1; i < datasetMapping.length; i++) {
        const row = datasetMapping[i];
        const variableName = row[variableNameIndex];

        // Check if the variableName is already in the set
        if (variableNameSet.has(variableName)) {
            throw new Error(`Duplicate variable name '${variableName}' found at row ${i + 1}.`);
        }

        // Add the variableName to the set
        variableNameSet.add(variableName);
    }
};
