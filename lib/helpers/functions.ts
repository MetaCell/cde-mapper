import {EntityType, HeaderMapping, Entity} from "../models.ts";
import {CDE_BASE_URL} from "../settings.ts";
import {Option} from "../components/common/CustomMappingDropdown.tsx";


export const getVariableName = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.variableNameIndex];
export const getPreciseAbbreviation = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.preciseAbbreviationIndex];
export const isRowMapped = (row: string[], headerMapping: HeaderMapping) => row[headerMapping.preciseAbbreviationIndex] != ''

export const getTypeFromRow = (row: string[], headerMapping: HeaderMapping): EntityType | null => {
    const isMapped = isRowMapped(row, headerMapping)
    const hasInterLexId = row[headerMapping.interlexIdIndex] !== '';

    if (isMapped) {
        return hasInterLexId ? EntityType.CDE : EntityType.CustomDataDictionary;
    } else {
        return null
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
        type: row[headerMapping.interlexIdIndex] ? EntityType.CDE : EntityType.CustomDataDictionary,
    };

    datasetMappingHeader.forEach((header, index) => {
        if (!Object.values(headerMapping).includes(index)) {  // If the index is not one of the base fields' indexes
            rowObj[header] = row[index] || '';
        }
    });
    return rowObj;
}


const EXCLUDED_KEYS = ['variableName', 'interlexId', 'type'];

export const getOptionFromEntity = (entity: Entity, group: string): Option => {
    return {
        id: entity.interlexId,
        label: entity.preciseAbbrev,
        group: group,
        content: Object.keys(entity)
            .filter(key => !EXCLUDED_KEYS.includes(key))
            .map(key => ({
                title: camelCaseToReadable(key),
                value: entity[key],
            })),
    };
};


const camelCaseToReadable = (camelCaseString: string) => {
    return camelCaseString
        // Insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // Replace any underscores with spaces
        .replace(/_/g, ' ')
        // Capitalize the first character and lower the rest
        .replace(/^./, (str: string) => str.toUpperCase())
        // Trim spaces at the start of the string (if any)
        .trim();
};


export function getCleanUrl(interlexId: string) {
    if (!interlexId) {
        return ''
    }
    const cleanedInterlexId = interlexId.toLowerCase().replace(/:/g, '_');
    return `${CDE_BASE_URL}/${cleanedInterlexId}`;
}

