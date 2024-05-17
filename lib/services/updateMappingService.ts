import { DatasetMapping, HeaderIndexes, OptionDetail } from "../models.ts";
import React from "react";
import { resetRow } from "../helpers/utils.ts";
import { VARIABLE_NAME_UI } from "../settings.ts";

// Function to update a specific row in datasetMapping
export const _updateRow = (
    variableName: string,
    newRowContent: OptionDetail[],
    datasetMapping: DatasetMapping,
    datasetMappingHeader: string[],
    setDatasetMapping: React.Dispatch<React.SetStateAction<DatasetMapping>>,
    setDatasetMappingHeader: React.Dispatch<React.SetStateAction<string[]>>,
    headerIndexes: HeaderIndexes,
    rowIndex?: number
) => {
    if (!Object.keys(datasetMapping).includes(variableName)) {
        console.error("Updating unknown variableName: " + variableName);
        return;
    }

    let updatedDatasetMapping = { ...datasetMapping };
    let updatedRow: any[] = rowIndex !== undefined ? [...updatedDatasetMapping[VARIABLE_NAME_UI][rowIndex]] : [...updatedDatasetMapping[variableName]];

    if (isUnmapping(newRowContent)) {
        updatedRow = resetRow(datasetMappingHeader, headerIndexes, variableName);
    }

    let headersAddedCount = 0;

    // Update values for mandatory properties using headerIndexes
    Object.values(headerIndexes).forEach((index) => {
        // VariableName should not be modified
        if (index === headerIndexes.variableName) return;

        const detail = newRowContent[index];
        if (detail) {
            if (rowIndex !== undefined) {
                updatedDatasetMapping[detail.title][rowIndex] = detail.value;
            } else {
                updatedRow[index] = detail.value;
            }
        }
    });

    const mandatoryFieldIndexes = new Set(Object.values(headerIndexes));

    newRowContent.forEach((property, index) => {
        // Determine if the current index is a mandatory field index
        const isMandatoryField = mandatoryFieldIndexes.has(index);

        if (!isMandatoryField && property !== null) {
            // For non-mandatory fields, check if the datasetMappingHeader already includes this field
            const headerTitle = property.title;
            const headerIndex = datasetMappingHeader.indexOf(headerTitle);

            if (headerIndex !== -1) {
                // The header exists, update the value
                if (rowIndex !== undefined) {
                    updatedDatasetMapping[headerTitle][rowIndex] = property.value;
                } else {
                    updatedRow[headerIndex] = property.value;
                }
            } else {
                // The header doesn't exist, add new header and value
                datasetMappingHeader.push(headerTitle);
                if (rowIndex !== undefined) {
                    updatedDatasetMapping[headerTitle].push(property.value);
                } else {
                    updatedRow.push(property.value);
                }
                headersAddedCount++;
            }
        }
    });

    // If new headers were added, ensure all rows in datasetMapping have the correct length
    if (headersAddedCount > 0) {
        Object.keys(updatedDatasetMapping).forEach(variableName => {
            updatedDatasetMapping[variableName] = updatedDatasetMapping[variableName].concat(Array(headersAddedCount).fill(''));
        });
        setDatasetMappingHeader([...datasetMappingHeader]);
    }

    if (rowIndex !== undefined) {
        updatedDatasetMapping[VARIABLE_NAME_UI][rowIndex] = variableName;
        Object.keys(updatedDatasetMapping).forEach(key => {
            if (key !== VARIABLE_NAME_UI && (updatedDatasetMapping[key][rowIndex] !== "" || updatedDatasetMapping[key][rowIndex]?.length !== 0)) {
                updatedDatasetMapping[key][rowIndex] = "";
            }
        });
    } else {
        updatedDatasetMapping[variableName] = updatedRow;
    }

    // Update state
    setDatasetMapping(updatedDatasetMapping);
};

function isUnmapping(newRowContent: OptionDetail[]) {
    return newRowContent.length == 0;
}