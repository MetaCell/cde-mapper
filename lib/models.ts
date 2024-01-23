export interface CDE {
    VariableName: string;
    PreciseCDEAbbrev: string;
    PreciseTBICDETitle: string;
    UnitOfMeasure: string;
    Description: string;
    DataType: string;
    Comments: string;
    MultipleValue: string;
    PermittedValues: string;
    MinimumValue: string;
    MaximumValue: string;
    InterLexID: string;
}

export interface CustomDictionaryField {
    VariableName: string;
    Title: string;
    [key: string]: string;
}

export interface Collection {
    name: string;
    fetch: (query: string) => Promise<CDE[]>;
}

export interface Config {
    height: string; // in %
    width: string; // in %
}

export type StringTable = string[][]

export interface InitParams {
    // First row should be the header.
    // The header should have the columns in the following order:
    // Variable Name; Abbreviation; InterlexId; Any other column.
    // The names can vary, but the content should match with what is said above.
    datasetMapping: StringTable;
    // List of files in the same format as the above.
    // The content will be used in the suggestions algorithm, order in the list may be used to break ties.
    additionalDatasetMappings: StringTable[];
    // First row should be the headers
    datasetSample: StringTable;

    collections: Collection[];
    config: Config;
    name: string
    callback: (cdeFileMapping: DatasetMapping) => void;

}


// Internal

export type DatasetRow = string[]

export type DatasetSample = DatasetRow[]


export enum CDEType {
    CDE = 'CDE',
    CustomDataDictionary = 'CustomDataDictionary'
}

export enum CDEStatus {
    Mapped = 'mapped',
    Unmapped = 'unmapped'
}

export type DatasetMappingRow = string[];

export interface DatasetMapping {
    [variableName: string]: DatasetMappingRow;
}

export enum STEPS {
    HOME,
    COLLECTION,
}