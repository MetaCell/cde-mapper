import {PropsWithChildren, useMemo} from "react";
import {useDataContext} from "../data/DataContext.ts";
import {OptionDetail, ServiceInitParams} from "../../models.ts";
import {ServicesContext} from "./ServicesContext.ts";
import {isRowMapped} from "../../helpers/getters.ts";
import {_updateRow} from "../../services/updateMappingService.ts";

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

    const serviceContextValue = useMemo(() => ({
        ...datasetMappingService,
        ...suggestionService,
    }), [datasetMappingService, suggestionService]);

    return (
        <ServicesContext.Provider value={serviceContextValue}>
            {children}
        </ServicesContext.Provider>
    );
};

