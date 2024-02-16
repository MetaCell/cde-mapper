import {EntityType, HeaderMapping, Entity} from "../models.ts";
import {CDE_BASE_URL} from "../settings.ts";


export const getVariableName = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.variableNameIndex];
export const getPreciseAbbreviation = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.preciseAbbreviationIndex];
export const isRowMapped = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.preciseAbbreviationIndex] != ''

export const getTypeFromRow = (row: string[], headerMapping: HeaderMapping): EntityType => {
    const isMapped = isRowMapped(row, headerMapping)
    const hasInterLexId = row[headerMapping.interlexIdIndex] !== '';

    if (isMapped) {
        return hasInterLexId ? EntityType.MappedCDE : EntityType.MappedCustomDataDictionary;
    } else {
        return EntityType.Unmapped;
    }
};

export const getEntityFromRow = (
    row: string[],
    datasetMappingHeader: string[],
    headerMapping: HeaderMapping
): Entity => {
    const rowObj: Entity = {
        variableName: row[headerMapping.variableNameIndex],
        preciseAbbrev: row[headerMapping.preciseAbbreviationIndex],
        title: row[headerMapping.titleIndex],
        interlexId: row[headerMapping.interlexIdIndex],
        type: row[headerMapping.interlexIdIndex] ? EntityType.MappedCDE : EntityType.MappedCustomDataDictionary,
    };

    datasetMappingHeader.forEach((header, index) => {
        if (!Object.values(headerMapping).includes(index)) {  // If the index is not one of the base fields' indexes
            rowObj[header] = row[index] || '';
        }
    });
    return rowObj;
}


export function getCleanUrl(interlexId: string) {
    if (!interlexId) {
        return ''
    }
    const cleanedInterlexId = interlexId.toLowerCase().replace(/:/g, '_');
    return `${CDE_BASE_URL}/${cleanedInterlexId}`;
}