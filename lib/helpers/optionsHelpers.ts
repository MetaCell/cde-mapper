import {HeaderIndexes, Option, OptionDetail} from "../models.ts";
import {CdeDetailItem} from "../components/common/CdeDetails.tsx";
import {
    CDE_OPTIONS_GROUP,
    CUSTOM_DICTIONARY_FIELD_OPTIONS_GROUP,
    DESCRIPTION,
} from "../settings.ts";
import {isRowCustomDictionaryField} from "./rowHelpers.ts";

export const optionDetailsToCdeDetails = (optionDetails: OptionDetail[]): CdeDetailItem[] => {
    return optionDetails.filter((detail) => detail !== null && detail.value !== '').map(detail => ({
        heading: detail.title,
        text: detail.value
    }));
};


const findDetailValue = (details: OptionDetail[], title: string): string => {
    const detail = details.filter((detail) => detail !== null && detail.value !== '').find(detail => detail.title === title);
    return detail ? detail.value : '';
};

export const getAbbreviationFromOption = (option: Option, headerIndexes: HeaderIndexes): string => option.content[headerIndexes.preciseAbbreviation].value;
export const getDescriptionFromOption = (option: Option): string => findDetailValue(option.content, DESCRIPTION);

export const isCustomDictionaryField = (option: Option): boolean => option.group === CUSTOM_DICTIONARY_FIELD_OPTIONS_GROUP

export const getOptionGroupFromRow = (row: string[], headerIndexes: HeaderIndexes): string => isRowCustomDictionaryField(row, headerIndexes) ? CUSTOM_DICTIONARY_FIELD_OPTIONS_GROUP : CDE_OPTIONS_GROUP