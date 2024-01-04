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

    // Iterate over the outer array of InputMapping arrays in reverse order so that the array order defines priority
    for (let i = inputMappings.length - 1; i >= 0; i--) {
        const innerArray = inputMappings[i];

        innerArray.forEach(mappingObject => {
            if (mappingObject.variableName && !mapping[mappingObject.variableName]) {
                mapping[mappingObject.variableName] = {
                    type: mappingObject.interlexID ? CDEType.CDE : CDEType.CustomDataDictionary,
                    status: mappingObject.abbreviation ? CDEStatus.Mapped : CDEStatus.Unmapped,
                    ...mappingObject
                };
            }
        });
    }

    return mapping;
};