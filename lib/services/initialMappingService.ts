import {DatasetMapping, HeaderMapping} from "../models.ts";

// Mapper for datasetMapping
export const mapStringTableToDatasetMapping = (rawMapping: string[][], headerMapping: HeaderMapping): [DatasetMapping, string[]] => {
    if (rawMapping.length < 2) return [{}, []];


    const [headers, ...rows] = rawMapping;
    const datasetMapping: DatasetMapping = {};

    rows.forEach((row) => {
        const variableNameValue = row[headerMapping.variableNameIndex];

        // Key the mapping by the variableName value
        datasetMapping[variableNameValue] = row;
    });

    return [datasetMapping, headers];
};

