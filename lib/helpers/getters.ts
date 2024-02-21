import {EntityType, HeaderIndexes} from "../models.ts";


export const getId = (data: string[], headerIndexes: HeaderIndexes): string => getPreciseAbbreviation(data, headerIndexes);

export const getPreciseAbbreviation = (data: string[], headerIndexes: HeaderIndexes): string => {
    return data[headerIndexes.preciseAbbreviation];
};

export const getType = (row: string[], headerMapping: HeaderIndexes): EntityType => {
    const isMapped = isRowMapped(row, headerMapping)
    const hasInterLexId = row[headerMapping.interlexId] !== '';

    if (isMapped) {
        return hasInterLexId ? EntityType.CDE : EntityType.CustomDataDictionary;
    } else {
        return EntityType.Unknown
    }
};

export const isRowMapped = (row: string[], headerIndexes: HeaderIndexes) => row[headerIndexes.preciseAbbreviation] != ''

