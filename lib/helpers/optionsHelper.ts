import {Option, OptionDetail} from "../models.ts";
import {CdeDetailItem} from "../components/common/CdeDetails.tsx";
import {
    ABBREVIATION,
    CUSTOM_DICTIONARY_FIELD_GROUP,
    DESCRIPTION, TITLE
} from "../settings.ts";

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

export const getAbbreviationFromOption = (option: Option): string => findDetailValue(option.content, ABBREVIATION);
export const getTitleFromOption = (option: Option): string => findDetailValue(option.content, TITLE);
export const getDescriptionFromOption = (option: Option): string => findDetailValue(option.content, DESCRIPTION);

export const isCustomDictionaryField = (option: Option): boolean => option.group === CUSTOM_DICTIONARY_FIELD_GROUP
