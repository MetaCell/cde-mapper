import {EntityType, HeaderIndexes} from "../models.ts";
import {CUSTOM_DATA_FIELD_CDE_LEVEL} from "../settings.ts";


export const getId = (data: string[], headerIndexes: HeaderIndexes): string => data[headerIndexes.id];

export const getPreciseAbbreviation = (data: string[], headerIndexes: HeaderIndexes): string => {
    return data[headerIndexes.preciseAbbreviation];
};

export const getType = (row: string[], headerMapping: HeaderIndexes): EntityType => {
    const isMapped = isRowMapped(row, headerMapping)

    if (isMapped) {
        return _isRowCDE(row, headerMapping) ? EntityType.CDE : EntityType.CustomDictionaryField;
    } else {
        return EntityType.Unknown
    }
};

export const isRowMapped = (row: string[], headerIndexes: HeaderIndexes) => getId(row, headerIndexes) != ''
export const _isRowCDE = (row: string[], headerIndexes: HeaderIndexes) => row[headerIndexes.cdeLevel] != CUSTOM_DATA_FIELD_CDE_LEVEL

