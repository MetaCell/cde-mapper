import {CDEType, HeaderMapping} from "../models.ts";


export const getVariableName = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.variableNameIndex];
export const getPreciseAbbreviation = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.preciseAbbreviationIndex];
export const getRowType = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.interlexIdIndex] ? CDEType.CDE : CDEType.CustomDataDictionary;
export const isRowMapped = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.preciseAbbreviationIndex] != ''
