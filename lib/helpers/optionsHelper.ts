import {OptionDetail} from "../models.ts";
import {CdeDetailItem} from "../components/common/CdeDetails.tsx";
import {ABBREVIATION, DESCRIPTION} from "../settings.ts";

export const optionDetailsToCdeDetails = (optionDetails: OptionDetail[]): CdeDetailItem[] => {
    return optionDetails.map(detail => ({
        heading: detail.title,
        text: detail.value
    }));
};


const findDetailValue = (details: OptionDetail[], title: string): string => {
    const detail = details.find(detail => detail.title === title);
    return detail ? detail.value : '';
};

export const getAbbreviationFromOption = (details: OptionDetail[]): string => findDetailValue(details, ABBREVIATION);
export const getDescriptionFromOption = (details: OptionDetail[]): string => findDetailValue(details, DESCRIPTION);
