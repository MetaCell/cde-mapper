import {CUSTOM_DICTIONARY_FIELD_COLLECTION_ID, CUSTOM_DICTIONARY_FIELD_COLLECTION_NAME} from "../settings.ts";
import {Collection, Option} from "../models.ts";
import {getTitleFromOption} from "./optionsHelper.ts";

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

export function searchCurrentCustomDictionaryFields(queryString: string, customDictionaryFields: Option[]): Option[] {
    const result = customDictionaryFields.filter(option => {
        const title = getTitleFromOption(option);
        return title.toLowerCase().includes(queryString.toLowerCase()); // Case-insensitive comparison
    });

    return result
}