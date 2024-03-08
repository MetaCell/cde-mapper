import {CDE_BASE_URL} from "../settings.ts";
import {HeaderIndexes} from "../models.ts";


export function getCleanUrl(interlexId: string) {
    if (!interlexId) {
        return ''
    }
    const cleanedInterlexId = interlexId.toLowerCase().replace(/:/g, '_');
    return `${CDE_BASE_URL}/${cleanedInterlexId}`;
}

export function resetRow(datasetMappingHeaders: string[], headerMapping: HeaderIndexes, variableName: string) {
    const updatedRow = new Array(datasetMappingHeaders.length).fill('');
    updatedRow[headerMapping.variableName] = variableName
    return updatedRow;
}