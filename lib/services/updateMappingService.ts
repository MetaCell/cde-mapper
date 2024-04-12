import {DatasetMapping, HeaderIndexes, OptionDetail} from "../models.ts";
import React from "react";
import {resetRow} from "../helpers/utils.ts";

// Function to update a specific row in datasetMapping
export const _updateRow = (
    variableName: string,
    newRowContent: OptionDetail[],
    datasetMapping: DatasetMapping,
    datasetMappingHeader: string[],
    setDatasetMapping: React.Dispatch<React.SetStateAction<DatasetMapping>>,
    setDatasetMappingHeader: React.Dispatch<React.SetStateAction<string[]>>,
    headerIndexes: HeaderIndexes
) => {
    if (!Object.keys(datasetMapping).includes(variableName)) {
        console.error("Updating unknown variableName: " + variableName);
        return;
    }

    let updatedRow = [...datasetMapping[variableName]];

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
            updatedRow[index] = detail.value;
        }
    });

    const mandatoryFieldIndexes = new Set(Object.values(headerIndexes))
    newRowContent.forEach((property, index) => {
        // Determine if the current index is a mandatory field index
        const isMandatoryField = mandatoryFieldIndexes.has(index);

        if (!isMandatoryField && property !== null) {
            // For non-mandatory fields, check if the datasetMappingHeader already includes this field
            const headerTitle = property.title;
            const headerIndex = datasetMappingHeader.indexOf(headerTitle);

            if (headerIndex !== -1) {
                // The header exists, update the value
                updatedRow[headerIndex] = property.value;
            } else {
                // The header doesn't exist, add new header and value
                datasetMappingHeader.push(headerTitle);
                updatedRow.push(property.value);
                headersAddedCount++;
            }
        }
    });


    // If new headers were added, ensure all rows in datasetMapping have the correct length
    if (headersAddedCount > 0) {
        Object.keys(datasetMapping).forEach(variableName => {
            datasetMapping[variableName] = datasetMapping[variableName].concat(Array(headersAddedCount).fill(''));
        });
        setDatasetMappingHeader([...datasetMappingHeader]);
    }

    // Update the datasetMapping with the new or updated row
    datasetMapping[variableName] = updatedRow;

    // Update state
    setDatasetMapping(prevState => ({...prevState, [variableName]: updatedRow}));
};

function isUnmapping(newRowContent: OptionDetail[]) {
    return newRowContent.length == 0;
}