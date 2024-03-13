import React, {createContext, useContext} from "react";
import {
    Collection,
    Config,
    DatasetMapping,
    HeaderIndexes,
    Suggestions,
    EmailTemplateParams
} from "../../models.ts";
import {
    ABBREVIATION_INDEX,
    CDE_LEVEL_INDEX,
    ID_INDEX,
    TITLE_INDEX,
    VARIABLE_NAME_INDEX
} from "../../settings.ts";

export const DataContext = createContext<{

    name: string;
    datasetSample: string[][];
    datasetMapping: DatasetMapping;
    datasetMappingHeader: string[];
    suggestions: Suggestions;
    headerIndexes: HeaderIndexes;
    collections: { [key: string]: Collection };
    config: Config;
    setDatasetMapping:  React.Dispatch<React.SetStateAction<DatasetMapping>>;
    setDatasetMappingHeader:  React.Dispatch<React.SetStateAction<string[]>>;
    emailTemplate: EmailTemplateParams;
}>({
    name: '',
    datasetSample: [],
    datasetMapping: {},
    datasetMappingHeader: [],
    suggestions:{},
    headerIndexes: {
        variableName: VARIABLE_NAME_INDEX,
        preciseAbbreviation: ABBREVIATION_INDEX,
        title: TITLE_INDEX,
        id: ID_INDEX,
        cdeLevel: CDE_LEVEL_INDEX
    },
    collections: {},
    config: {
        width: "100%",
        height: "100%",
    },
    setDatasetMapping: () => {},
    setDatasetMappingHeader: () => {},
    emailTemplate: {
        email: 'support@interlex.org',
        title: 'CDE Mapper collection not found',
        description: 'This is an email coming from the cde mapper application to flag that a certain collection is missing.'
    }
});

export const useDataContext = () => useContext(DataContext);