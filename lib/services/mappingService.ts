import {CDEStatus, CDEType, DatasetCDEMapping, InputMapping} from "../models.ts";

export const validateInputMappings = (inputMappings: InputMapping[][]) => {
    return inputMappings.every(innerArray =>
        innerArray.every(mapping =>
            'variableName' in mapping &&
            'abbreviation' in mapping &&
            'interlexID' in mapping
        )
    );
};


export const processInputMappings = (inputMappings: InputMapping[][]) => {
    const mapping: DatasetCDEMapping = {};

    // Iterate over each array of InputMapping
    inputMappings.forEach(innerArray => {
        // Iterate in reverse so that the array order defines priority
        for (let i = innerArray.length - 1; i >= 0; i--) {
            const mappingObject = innerArray[i];

            if (mappingObject.variableName && !mapping[mappingObject.variableName]) {
                mapping[mappingObject.variableName] = {
                    type: mappingObject.interlexID ? CDEType.CDE : CDEType.CustomDataDictionary,
                    status: mappingObject.abbreviation ? CDEStatus.Mapped : CDEStatus.Unmapped,
                    ...mappingObject
                };
            }
        }
    });

    return mapping;
};