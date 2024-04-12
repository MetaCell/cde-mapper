import {createContext, useContext} from "react";
import {
    Option,
    OptionDetail,
} from "../../models.ts";

export const ServicesContext = createContext<{
    getTotalRowsCount: () => number;
    getMappedRowsCount: () => number;
    getUnmappedRowsCount: () => number;
    getUnmappedVariableNames: () => string[];
    getSuggestionsCount: () => number;
    getColumnsWithSuggestions: () => string[];
    getSuggestionsForColumn: (column: string) => string[][];
    updateDatasetMappingRow: (key: string, newData: OptionDetail[]) => void;
    isColumnMapped: (column: string) => boolean;
    searchCustomDictionaryFields: (querystring: string, createdCustomDictionaryFields: { [id: string]: Option }) => Option[]
    onClose: () => void;
}>({
    getTotalRowsCount: () => 0,
    getMappedRowsCount: () => 0,
    getUnmappedRowsCount: () => 0,
    getUnmappedVariableNames: () => [],
    getSuggestionsCount: () => 0,
    getColumnsWithSuggestions: () => [],
    getSuggestionsForColumn: () => [],
    updateDatasetMappingRow: () => {},
    isColumnMapped: () => false,
    searchCustomDictionaryFields: () => [],
    onClose: () => {
    },
});


export const useServicesContext = () => useContext(ServicesContext);