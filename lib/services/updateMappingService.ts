import {DatasetMapping, HeaderIndexes, OptionDetail} from "../models.ts";
import React from "react";

// Function to update a specific row in datasetMapping
export const updateRow = (
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

    const updatedRow = isUnmapping(newRowContent) ? Array(datasetMappingHeader.length).fill('') :
        [...datasetMapping[variableName]];

    let headersAddedCount = 0;

    // Update values for mandatory properties using headerIndexes
    Object.entries(headerIndexes).forEach(([key, index]) => {
        const property = newRowContent.find(p => p.title === key);
        if (property) {
            updatedRow[index] = property.value;
        }
    });

    // Update or add values for additional properties
    newRowContent.forEach(property => {
        if (!Object.keys(headerIndexes).includes(property.title)) {
            const index = datasetMappingHeader.indexOf(property.title);
            if (index !== -1) {
                // The header exists, update the value
                updatedRow[index] = property.value;
            } else {
                // The header doesn't exist, add new header and value
                datasetMappingHeader.push(property.title);
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

function isUnmapping(newRowContent: OptionDetail[]) {
    return newRowContent.length == 0;
}