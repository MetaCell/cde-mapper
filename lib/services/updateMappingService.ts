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
    setDatasetMapping(prevState => ({ ...prevState, [variableName]: updatedRow }));
};

const updateDatasetMapping = (datasetMapping: DatasetMapping, variableName: string, index: number): DatasetMapping => {
    const updatedMapping = { ...datasetMapping };
    updatedMapping[VARIABLE_NAME_UI][index] = variableName;

    Object.keys(updatedMapping).forEach(key => {
        if (key !== VARIABLE_NAME_UI && (updatedMapping[key][index] || updatedMapping[key][index] === "")) {
            updatedMapping[key][index] = "";
        }
    });

    return updatedMapping;
};

const filterEmptyRows = (datasetMapping: DatasetMapping): DatasetMapping => {
    const indicesToKeep = datasetMapping[VARIABLE_NAME_UI]
        .map((value, index) => value !== "" ? index : -1)
        .filter(index => index !== -1);

    const filteredMapping = Object.fromEntries(
        Object.entries(datasetMapping).map(([key, values]) => [
            key, indicesToKeep.map(index => values[index])
        ])
    );

    return filteredMapping;
};

export const _updateRowTemplate = (
    variableName: string,
    newRowContent: OptionDetail[],
    datasetMapping: DatasetMapping,
    datasetMappingHeader: string[],
    setDatasetMapping: React.Dispatch<React.SetStateAction<DatasetMapping>>,
    setDatasetMappingHeader: React.Dispatch<React.SetStateAction<string[]>>,
    headerIndexes: HeaderIndexes,
    rowIndex: number
) => {
    let updatedMapping = { ...datasetMapping };

    if (newRowContent.length === 0) {
        Object.keys(updatedMapping).forEach(key => updatedMapping[key][rowIndex] = "");
        updatedMapping = filterEmptyRows(updatedMapping);
        setDatasetMapping(updatedMapping);
        return;
    }

    updatedMapping = updateDatasetMapping(updatedMapping, variableName, rowIndex);

    let headersAddedCount = 0;
    const newHeaders = [...datasetMappingHeader];

    Object.values(headerIndexes).forEach((index) => {
        if (index !== headerIndexes.variableName) {
            const detail = newRowContent[index];
            if (detail) updatedMapping[detail.title][rowIndex] = detail.value;
        }
    });

    const mandatoryIndexes = new Set(Object.values(headerIndexes));

    newRowContent.forEach((property, index) => {
        if (!mandatoryIndexes.has(index) && property) {
            const headerTitle = property.title;
            const headerIndex = datasetMappingHeader.indexOf(headerTitle);

            if (headerIndex === -1) {
                newHeaders.push(headerTitle);
                headersAddedCount++;
            } else {
                updatedMapping[headerTitle][rowIndex] = property.value;
            }
        }
    });

    if (headersAddedCount > 0) {
        Object.keys(updatedMapping).forEach(key => {
            updatedMapping[key] = [...updatedMapping[key], ...Array(headersAddedCount).fill('')];
        });
        setDatasetMappingHeader(newHeaders);
    }

    updatedMapping = filterEmptyRows(updatedMapping);
    setDatasetMapping(updatedMapping);
};

function isUnmapping(newRowContent: OptionDetail[]) {
    return newRowContent.length == 0;
}