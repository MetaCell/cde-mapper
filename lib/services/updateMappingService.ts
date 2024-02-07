import {DatasetMapping, Entity} from "../models.ts";
import React from "react";

// Function to update a specific row in datasetMapping
export const updateDatasetMappingRow = (
    key: string,
    newData: Entity,
    datasetMapping: DatasetMapping,
    datasetMappingHeader: string[],
    setDatasetMapping: React.Dispatch<React.SetStateAction<DatasetMapping>>,
    setDatasetMappingHeader: React.Dispatch<React.SetStateAction<string[]>>
) => {

    let updatedRow = datasetMapping[key];

    if (!updatedRow) {
        // If the key doesn't exist, create a new row initialized with empty strings
        updatedRow = Array(datasetMappingHeader.length).fill('');
    }

    let headersAddedCount = 0;

    Object.entries(newData).forEach(([dataKey, value]) => {
        const index = datasetMappingHeader.indexOf(dataKey);

        if (index !== -1) {
            // The header exists, update the value
            updatedRow[index] = value;
        } else {
            // The header doesn't exist, add new header and value
            datasetMappingHeader.push(dataKey);
            updatedRow.push(value);
            headersAddedCount++;
        }
    });

    // If new headers were added, update all rows to have the same length
    if (headersAddedCount > 0) {
        Object.keys(datasetMapping).forEach(rowKey => {
            // Add empty strings for the new headers
            datasetMapping[rowKey] = datasetMapping[rowKey].concat(Array(headersAddedCount).fill(''));
        });
    }

    // Update the state
    setDatasetMapping({ ...datasetMapping });
    if (headersAddedCount > 0) {
        setDatasetMappingHeader([...datasetMappingHeader]);
    }
};
