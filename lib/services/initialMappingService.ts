// Mapper for datasetSample
import {DatasetMapping, StringTable} from "../models.ts";
import {VARIABLE_NAME_INDEX} from "../settings.ts";

// Mapper for datasetMapping
export const mapStringTableToDatasetMapping = (rawMapping: StringTable): [DatasetMapping, string[]] => {
    if (rawMapping.length < 2) return [{}, []];

    const [headers, ...rows] = rawMapping;
    const datasetMapping: DatasetMapping = {};


    rows.forEach((row) => {
        const variableNameValue = row[VARIABLE_NAME_INDEX];

        // Key the mapping by the variableName value
        datasetMapping[variableNameValue] = row;
    });

    return [datasetMapping, headers];
};


