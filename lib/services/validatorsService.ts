
import {StringTable} from "../models.ts";
import {MAX_DATASET_SAMPLES} from "../settings.ts";

// Validator for datasetSample
export const validateDatasetSample = (datasetSample: StringTable): void => {
    if (datasetSample.length > MAX_DATASET_SAMPLES) {
        throw new Error(`Dataset sample exceeds the maximum limit of ${MAX_DATASET_SAMPLES} entries.`);
    }
};

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
