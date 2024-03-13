import {DatasetMapping, HeaderIndexes} from "../models.ts";
import {DEFAULT_HEADERS} from "../settings.ts";
import {resetRow} from "../helpers/utils.ts";

export const getDatasetMapping = (datasetMappingRows: string[][] | undefined, headerIndexes: HeaderIndexes,
                                  datasetHeaders?: string[]): [DatasetMapping, string[]] => {
    const datasetMapping: DatasetMapping = {};
    let datasetMappingHeader: string[];

    // Determine datasetMappingHeader
    if (datasetMappingRows && datasetMappingRows.length > 0) {
        [datasetMappingHeader, ...datasetMappingRows] = datasetMappingRows;
    } else {
        // If the dataset mapping was not provided or has no data we use the default headers
        datasetMappingHeader = Array.from(
            { length: Math.max(...Object.values(headerIndexes)) + 1 },
            (_, i) => DEFAULT_HEADERS[i] || '');
    }

    // Include only the datasetMappingRows that exist in the datasetHeader provided or all of them if not
    const relevantRows = datasetHeaders || (datasetMappingRows ? datasetMappingRows.map(row => row[headerIndexes.variableName]) : []);
    relevantRows.forEach(key => datasetMapping[key] = resetRow(datasetMappingHeader, headerIndexes, key));

    // Populate datasetMapping with datasetMappingRows data
    datasetMappingRows?.forEach(row => {
        const variableName = row[headerIndexes.variableName];
        const id = row[headerIndexes.id];
        const preciseAbbreviation = row[headerIndexes.preciseAbbreviation];

        // If variableName already exists in datasetMapping, process the row
        if (variableName in datasetMapping) {
            let updatedRow = [...row];
            if (!id.trim()) {
                updatedRow = resetRow(datasetMappingHeader, headerIndexes, variableName);
            } else {
                // Ensure preciseAbbreviation is set to ID if missing
                if (!preciseAbbreviation.trim()) {
                    updatedRow[headerIndexes.preciseAbbreviation] = id;
                }
            }
            datasetMapping[variableName] = updatedRow;
        }
    });

    return [datasetMapping, datasetMappingHeader];
};

