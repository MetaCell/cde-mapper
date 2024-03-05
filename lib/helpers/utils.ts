import {CDE_BASE_URL} from "../settings.ts";


export function getCleanUrl(interlexId: string) {
    if (!interlexId) {
        return ''
    }
    const cleanedInterlexId = interlexId.toLowerCase().replace(/:/g, '_');
    return `${CDE_BASE_URL}/${cleanedInterlexId}`;
}