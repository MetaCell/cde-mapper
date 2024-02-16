import {DatasetMapping, HeaderMapping} from "../models.ts";
import {DEFAULT_HEADERS} from "../settings.ts";

// Mapper for datasetMapping
export const mapStringTableToDatasetMapping = (rawMapping: string[][] | undefined, headerMapping: HeaderMapping, includeHeaders?: string[]): [DatasetMapping, string[]] => {
    const datasetMapping: DatasetMapping = {};
    let headers: string[];

    // Determine headers
    if (rawMapping && rawMapping.length > 0) {
        [headers, ...rawMapping] = rawMapping;
    } else {
        headers = Array.from({ length: Math.max(...Object.values(headerMapping)) + 1 }, (_, i) => DEFAULT_HEADERS[i] || '');
    }

    // Initialize datasetMapping keys
    const mappingKeys = includeHeaders || (rawMapping ? rawMapping.map(row => row[headerMapping.variableNameIndex]) : []);
    mappingKeys.forEach(key => datasetMapping[key] = new Array(headers.length).fill(''));

    // Populate datasetMapping with rawMapping data
    rawMapping?.forEach(row => {
        const variableNameValue = row[headerMapping.variableNameIndex];
        if (variableNameValue in datasetMapping) {
            datasetMapping[variableNameValue] = row;
        }
    });

    return [datasetMapping, headers];
};

