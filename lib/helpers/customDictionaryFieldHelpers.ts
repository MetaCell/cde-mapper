import {HeaderIndexes, Option} from "../models.ts";

export function isCustomDictionaryValid(option: Option, headerIndexes: HeaderIndexes): boolean {
    return option.content[headerIndexes.preciseAbbreviation]?.value != '' && option.content[headerIndexes.title]?.value != ''
}
