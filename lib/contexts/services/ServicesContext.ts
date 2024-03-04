import {createContext, useContext} from "react";
import {
    OptionDetail,
} from "../../models.ts";

export const ServicesContext = createContext<{
    getTotalRowsCount: () => number;
    getMappedRowsCount: () => number;
    getUnmappedRowsCount: () => number;
    getSuggestionsCount: () => number;
    getColumnsWithSuggestions: () => string[];
    getSuggestionsForColumn: (column: string) => string[][];
    updateDatasetMappingRow: (key: string, newData: OptionDetail[]) => void;
    onClose: () => void;
}>({
    getTotalRowsCount: () => 0,
    getMappedRowsCount: () => 0,
    getUnmappedRowsCount: () => 0,
    getSuggestionsCount: () => 0,
    getColumnsWithSuggestions: () => [],
    getSuggestionsForColumn: () => [],
    updateDatasetMappingRow: () => {},
    onClose: () => {}
});


export const useServicesContext = () => useContext(ServicesContext);