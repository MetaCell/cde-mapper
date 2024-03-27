import {PropsWithChildren, useMemo} from "react";
import {useDataContext} from "../data/DataContext.ts";
import {Option, OptionDetail, ServiceInitParams} from "../../models.ts";
import {ServicesContext} from "./ServicesContext.ts";
import {isRowMapped} from "../../helpers/rowHelpers.ts";
import {_updateRow} from "../../services/updateMappingService.ts";
import {
    searchCurrentCustomDictionaryFields,
    searchPreviousCustomDictionaryFields
} from "../../services/customDictionaryFieldService.ts";


export const ServicesContextProvider = ({
                                            callback,
                                            children
                                        }: PropsWithChildren<ServiceInitParams>) => {
    const {
        datasetMapping,
        headerIndexes,
        datasetMappingHeader,
        setDatasetMapping,
        setDatasetMappingHeader,
        suggestions,
        customDictionaryFields
    } = useDataContext();

    const datasetMappingService = useMemo(() => {
        const getTotalRowsCount = () => Object.keys(datasetMapping).length;
        const getMappedRowsCount = () => Object.values(datasetMapping).filter(row => isRowMapped(row, headerIndexes)).length;
        const getUnmappedRowsCount = () => getTotalRowsCount() - getMappedRowsCount();
        const updateDatasetMappingRow = (key: string, newData: OptionDetail[]) => {
            _updateRow(
                key,
                newData,
                datasetMapping,
                datasetMappingHeader,
                setDatasetMapping,
                setDatasetMappingHeader,
                headerIndexes
            );
        };

        const getUnmappedVariableNames = () => {
            return Object.keys(datasetMapping).filter(key => !isRowMapped(datasetMapping[key], headerIndexes));
        };

        const isColumnMapped = (column: string) => {
            return datasetMapping[column] && isRowMapped(datasetMapping[column], headerIndexes)
        };

        const onClose = () => {
            callback(datasetMapping, datasetMappingHeader)
        };

        return {
            getTotalRowsCount,
            getMappedRowsCount,
            getUnmappedRowsCount,
            getUnmappedVariableNames,
            updateDatasetMappingRow,
            isColumnMapped,
            onClose
        };
    }, [datasetMapping, callback, datasetMappingHeader, headerIndexes, setDatasetMapping, setDatasetMappingHeader,]);

    const suggestionService = useMemo(() => {
        const getSuggestionsCount = () => {
            return getColumnsWithSuggestions().length
        };
        const getColumnsWithSuggestions = () => {
            return Object.keys(suggestions).filter(column => suggestions[column].length > 0)
        };

        const getSuggestionsForColumn = (column: string) => {
            return suggestions[column]
        };

        return {
            getColumnsWithSuggestions,
            getSuggestionsForColumn,
            getSuggestionsCount,
        };
    }, [suggestions]);

    const customDictionaryFieldService = useMemo(() => {
        const searchCustomDictionaryFields = (queryString: string, createdCustomDictionaryFields: {
            [id: string]: Option
        }): Option[] => {
            return [...searchPreviousCustomDictionaryFields(queryString, customDictionaryFields),
                ...searchCurrentCustomDictionaryFields(queryString, createdCustomDictionaryFields)]
        }

        return {
            searchCustomDictionaryFields
        }

    }, [customDictionaryFields])

    const serviceContextValue = useMemo(() => ({
        ...datasetMappingService,
        ...suggestionService,
        ...customDictionaryFieldService,
    }), [datasetMappingService, suggestionService, customDictionaryFieldService]);

    return (
        <ServicesContext.Provider value={serviceContextValue}>
            {children}
        </ServicesContext.Provider>
    );
};

