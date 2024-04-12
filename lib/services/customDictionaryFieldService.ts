import {DatasetMapping, HeaderIndexes, Option, SelectableCollection} from "../models.ts";
import {CUSTOM_DICTIONARY_FIELD_COLLECTION_ID, CUSTOM_DICTIONARY_FIELD_COLLECTION_NAME} from "../settings.ts";
import {isRowCustomDictionaryField} from "../helpers/rowHelpers.ts";
import {mapRowToOption} from "../helpers/mappers.ts";

export function getCustomDictionaryFieldSelectableCollection(): SelectableCollection {
    return {
        id: CUSTOM_DICTIONARY_FIELD_COLLECTION_ID,
        name: CUSTOM_DICTIONARY_FIELD_COLLECTION_NAME,
        selected: true,
    }
}


function searchCustomDictionaryField(queryString: string, optionsArray: Option[]) {
    return optionsArray.filter(option => {
        return option.label.toLowerCase().includes(queryString.toLowerCase()); // Case-insensitive comparison
    });
}

export function searchCurrentCustomDictionaryFields(queryString: string, customDictionaryFields: { [id: string]: Option }): Option[] {
    const optionsArray: Option[] = Object.values(customDictionaryFields);
    return searchCustomDictionaryField(queryString, optionsArray);
}


export function searchPreviousCustomDictionaryFields(queryString: string, customDictionaryFields: Option[]): Option[] {
    return searchCustomDictionaryField(queryString, customDictionaryFields)
}


export const getCustomDictionaryFields = (
    additionalDatasetMappings: DatasetMapping[],
    datasetMappingHeader: string[],
    headerIndexes: HeaderIndexes
): Option[] => {

    const customDictionaryFields: Option[] = []


    additionalDatasetMappings.forEach((datasetMapping: DatasetMapping) => {
        Object.values(datasetMapping).forEach((row: string[]) => {
            if (isRowCustomDictionaryField(row, headerIndexes)) {
                customDictionaryFields.push(mapRowToOption(row, datasetMappingHeader, headerIndexes))
            }
        })

    });

    return customDictionaryFields;
};