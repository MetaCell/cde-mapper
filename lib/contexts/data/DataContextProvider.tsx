import {PropsWithChildren, useMemo, useState} from 'react';
import {Collection, DataInitParams, DatasetMapping} from "../../models.ts";
import {validateDatasetMapping, isTemplateFlow} from "../../services/validatorsService.ts";
import {getDatasetMapping, getTemplateDatasetMapping} from "../../services/initialMappingService.ts";
import ErrorPage from "../../components/ErrorPage.tsx";
import {ABBREVIATION_INDEX, CDE_LEVEL_INDEX, ID_INDEX, TITLE_INDEX, VARIABLE_NAME_INDEX, VARIABLE_NAME_UI, ABBREVIATION, TITLE, INTERLEX_ID, CDE_LEVEL} from "../../settings.ts";
import {DataContext} from './DataContext.ts';
import {computeSuggestions} from "../../services/suggestionsService.ts";
import {
    getCustomDictionaryFields
} from "../../services/customDictionaryFieldService.ts";


const defaultHeaderIndexes = {
    variableName: VARIABLE_NAME_INDEX,
    preciseAbbreviation: ABBREVIATION_INDEX,
    title: TITLE_INDEX,
    id: ID_INDEX,
    cdeLevel: CDE_LEVEL_INDEX,
};

const headerIndexesMapping = {
    variableName: VARIABLE_NAME_UI,
    preciseAbbreviation: ABBREVIATION,
    title:TITLE,
    id: INTERLEX_ID, 
    cdeLevel: CDE_LEVEL
}

export const DataContextProvider = ({
                                        datasetSample,
                                        datasetMapping: rawDatasetMapping,
                                        additionalDatasetMappings: rawAdditionalDatasetMappings = [],
                                        headerIndexes: providedHeaderIndexes = defaultHeaderIndexes,
                                        collections: rawCollections,
                                        config,
                                        name,
                                        emailTemplate,
                                        children
                                    }: PropsWithChildren<DataInitParams>) => {

    // Defines the mapping of the mandatory columns in the dataset mapping file
    const headerIndexes = useMemo(() => {
        // If the dataset mapping is not provided or has no data we use the default header indexes
        if (!rawDatasetMapping || rawDatasetMapping.length === 0) {
            return defaultHeaderIndexes;
        }
        // Merge providedHeaderIndexes with defaultHeaderIndexes if rawDatasetMapping is valid
        return {
            ...defaultHeaderIndexes,
            ...providedHeaderIndexes
        };
    }, [providedHeaderIndexes, rawDatasetMapping]);
    
    // validate dataset sample
    const isDatasetInvalid = useMemo(() => {
        let tmpIsDatasetInvalid = false;
        try {
            isTemplateFlow(datasetSample);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            const errorMessage = `Invalid dataset: ${message}`;
            console.error(errorMessage);
            tmpIsDatasetInvalid = true;
        }

        return tmpIsDatasetInvalid;
    }, [datasetSample]);

    // Validate and process datasetMapping
    const [initialDatasetMapping, initialDatasetMappingHeader, isDatasetMappingInvalid] = useMemo(() => {
        try {
            validateDatasetMapping(rawDatasetMapping, headerIndexes.variableName);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            const errorMessage = `Invalid dataset mapping: ${message}`;
            console.error(errorMessage);
            return [{}, [], true]
        }
        const datasetHeader = datasetSample[0]
        const isDatasetSampleEmpty = datasetSample.length === 0
        const [tmpDatasetMapping, tmpDatasetMappingHeader] = isDatasetSampleEmpty ? getTemplateDatasetMapping(headerIndexes, headerIndexesMapping) : getDatasetMapping(rawDatasetMapping, headerIndexes, datasetHeader);

        return [tmpDatasetMapping, tmpDatasetMappingHeader, false];
    }, [rawDatasetMapping, headerIndexes, datasetSample]);


    const [datasetMapping, setDatasetMapping] = useState<DatasetMapping>(initialDatasetMapping);
    const [datasetMappingHeader, setDatasetMappingHeader] = useState<string[]>(initialDatasetMappingHeader);

    const additionalDatasetMappings: DatasetMapping[] = useMemo(() => {
        return rawAdditionalDatasetMappings.map((additionalMapping, index) => {
            try {
                validateDatasetMapping(additionalMapping, headerIndexes.variableName);
            } catch (error) {
                if (error instanceof Error) {
                    console.warn(`Skipping invalid additionalDatasetMapping at index ${index}: ${error.message}`);
                } else {
                    console.warn(`Skipping invalid additionalDatasetMapping at index ${index}: Unknown error`);
                }
                return null;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [mappedAdditionalMapping, _] = getDatasetMapping(additionalMapping, headerIndexes);
            return mappedAdditionalMapping;
        }).filter(mapping => mapping !== null) as DatasetMapping[];
    }, [rawAdditionalDatasetMappings, headerIndexes]);

    const suggestions = useMemo(() => {
        return computeSuggestions(initialDatasetMapping, additionalDatasetMappings, headerIndexes);
    }, [initialDatasetMapping, additionalDatasetMappings, headerIndexes]);


    const customDictionaryFields = useMemo(() => {
        return getCustomDictionaryFields(additionalDatasetMappings, datasetMappingHeader, headerIndexes)
    }, [additionalDatasetMappings, datasetMappingHeader, headerIndexes]);

    const collectionsDictionary = useMemo(() => {
        return rawCollections.reduce((acc, collection, index) => {
            acc[collection.id] = {
                ...collection,
                suggested: index === 0 // Set 'suggested' for the first collection, false for others
            };
            return acc;
        }, {} as { [key: string]: Collection });
    }, [rawCollections]);

    const dataContextValue = {
        name,
        datasetSample,
        datasetMapping,
        datasetMappingHeader,
        suggestions,
        customDictionaryFields,
        headerIndexes,
        collections: collectionsDictionary,
        config,
        emailTemplate,
        setDatasetMapping,
        setDatasetMappingHeader
    };

    const hasErrors = isDatasetInvalid || isDatasetMappingInvalid || rawCollections.length == 0
    return hasErrors ? <ErrorPage/> : (
        <DataContext.Provider value={dataContextValue}>
            {children}
        </DataContext.Provider>
    );
};
