import {CDEMapping, CDEStatus, CDEType, InputMappingRow, MappingRow} from "../models.ts";

export const areMappingsValid = (mappings: InputMappingRow[]) => {
    return mappings.length > 0 && mappings.every(mapping =>
        'variableName' in mapping &&
        'abbreviation' in mapping &&
        'interlexID' in mapping
    )
};

export const getMappingsDict = (inputMappingRows: InputMappingRow[]): CDEMapping => {
    const cdeMapping: CDEMapping = {};

    inputMappingRows.forEach(row => {
        const mappingRow: MappingRow = {
            ...row,
            cdeType: row.interlexID ? CDEType.CDE : CDEType.CustomDataDictionary,
            cdeStatus: row.abbreviation ? CDEStatus.Mapped : CDEStatus.Unmapped
        };

        cdeMapping[row.variableName] = mappingRow;
    });

    return cdeMapping;
}