
import {StringTable} from "../models.ts";


// Validator for datasetMapping
export const validateDatasetMapping = (datasetMapping: StringTable): void => {
    if (datasetMapping.length === 0) {
        throw new Error("Dataset mapping is empty.");
    }
    const headers = datasetMapping[0];
    if (headers.length < 3) {
        throw new Error("Dataset mapping must have the at least 3 columns (VariableName, PreciseAbbreviation, InterlexId).");
    }
};
