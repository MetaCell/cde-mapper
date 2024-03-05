import {DatasetMapping, HeaderIndexes} from "../models.ts";
import {DEFAULT_HEADERS} from "../settings.ts";

export const getDatasetMapping = (datasetMappingRows: string[][] | undefined, headerMapping: HeaderIndexes,
                                  datasetHeaders?: string[]): [DatasetMapping, string[]] => {
    const datasetMapping: DatasetMapping = {};
    let datasetMappingHeaders: string[];

    // Determine datasetMappingHeaders
    if (datasetMappingRows && datasetMappingRows.length > 0) {
        [datasetMappingHeaders, ...datasetMappingRows] = datasetMappingRows;
    } else {
        // If the dataset mapping was not provided or has no data we use the default headers
        datasetMappingHeaders = Array.from(
            { length: Math.max(...Object.values(headerMapping)) + 1 },
            (_, i) => DEFAULT_HEADERS[i] || '');
    }

    // Include only the datasetMappingRows that exist in the datasetHeader provided or all of them if not
    const relevantRows = datasetHeaders || (datasetMappingRows ? datasetMappingRows.map(row => row[headerMapping.variableName]) : []);
    relevantRows.forEach(key => datasetMapping[key] = new Array(datasetMappingHeaders.length).fill(''));

    // Populate datasetMapping with datasetMappingRows data
    datasetMappingRows?.forEach(row => {
        const variableNameValue = row[headerMapping.variableName];
        const id = row[headerMapping.id];
        const preciseAbbreviation = row[headerMapping.preciseAbbreviation];

        // If variableName already exists in datasetMapping, process the row
        if (variableNameValue in datasetMapping) {
            let updatedRow = [...row];
            if (!id.trim()) {
                updatedRow = new Array(datasetMappingHeaders.length).fill('');
            } else {
                // Ensure preciseAbbreviation is set to ID if missing
                if (!preciseAbbreviation.trim()) {
                    updatedRow[headerMapping.preciseAbbreviation] = id;
                }
            }
            datasetMapping[variableNameValue] = updatedRow;
        }
    });

    return [datasetMapping, datasetMappingHeaders];
};

