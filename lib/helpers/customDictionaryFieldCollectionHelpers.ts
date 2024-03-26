import {CUSTOM_DICTIONARY_FIELD_COLLECTION_ID, CUSTOM_DICTIONARY_FIELD_COLLECTION_NAME} from "../settings.ts";
import {Collection, Option} from "../models.ts";

export function getCustomDictionaryFieldCollection(): Collection {
    return {
        id: CUSTOM_DICTIONARY_FIELD_COLLECTION_ID,
        name: CUSTOM_DICTIONARY_FIELD_COLLECTION_NAME,
        fetch: fetchPreviousCustomDictionaryFields,
    }
}

async function fetchPreviousCustomDictionaryFields(queryString: string): Promise<Option[]> {

    console.log(queryString)

    return []
}

export function searchCurrentCustomDictionaryFields(queryString: string, customDictionaryFields: {
    [id: string]: Option
}): Option[] {
    const optionsArray: Option[] = Object.values(customDictionaryFields);

    return optionsArray.filter(option => {
        return option.label.toLowerCase().includes(queryString.toLowerCase()); // Case-insensitive comparison
    });
}