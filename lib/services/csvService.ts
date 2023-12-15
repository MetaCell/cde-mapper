import Papa from 'papaparse';
import {ABBREVIATION, INTERLEX_ID, MANDATORY_HEADERS, VARIABLE_NAME} from "../settings.ts";
import {CDEStatus, CDEType, DatasetCDEMapping} from "../models.ts";

export const validateMappingFile = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: (results) => {
                const headers = results.data[0] as string[];
                const isValid = MANDATORY_HEADERS.every(header => headers.includes(header));
                resolve(isValid);
            },
            error: (error) => reject(error),
            preview: 1
        });
    });
};


export const processMappingFile = (file: File): Promise<DatasetCDEMapping> => {
    return new Promise((resolve, reject) => {
        const mapping: DatasetCDEMapping = {};

        Papa.parse<Record<string, string | undefined>>(file, {
            header: true,
            step: (result) => {
                const row = result.data;
                const variableName = row[VARIABLE_NAME];
                if (variableName) {
                    mapping[variableName] = {
                        type: row[INTERLEX_ID] ? CDEType.CDE : CDEType.CustomDataDictionary,
                        status: row[ABBREVIATION] ? CDEStatus.Mapped : CDEStatus.Unmapped,
                        ...row
                    };
                }
            },
            complete: () => resolve(mapping),
            error: (error) => reject(error)
        });
    });
};