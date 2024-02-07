import {ABBREVIATION_INDEX, INTERLEX_INDEX} from "../settings.ts";
import {CDEStatus, CDEType} from "../models.ts";

export const getRowMappingStatus = (row: string[]) => row[ABBREVIATION_INDEX] ? CDEStatus.Mapped : CDEStatus.Unmapped;
export const getRowType = (row: string[]) => row[INTERLEX_INDEX] ? CDEType.CDE : CDEType.CustomDataDictionary;