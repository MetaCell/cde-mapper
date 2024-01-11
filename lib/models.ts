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

export interface Repository {
    name: string;
    fetch: (query: string) => Promise<CDE[]>;
}

export interface Config {
    height: string; // in %
    width: string; // in %
}

export interface InitParams {
    mappings: InputMappingRow[];
    datasetSample: string[][];
    callback: (cdeFileMapping: File | null) => void;
    repositories: Repository[];
    config: Config;
    labName: string
}

export interface InputMappingRow {
    // Mandatory fields
    variableName: string;
    abbreviation: string;
    interlexID: string;
    // Any optional fields
    [key: string]: string;
}

// Internal

export enum CDEType {
    CDE = 'CDE',
    CustomDataDictionary = 'CustomDataDictionary'
}

export enum CDEStatus {
    Mapped = 'mapped',
    Unmapped = 'unmapped'
}

export interface MappingRow extends InputMappingRow {
    cdeStatus: CDEStatus;
    cdeType: CDEType;
}

export interface CDEMapping {
    [variableName: string]: MappingRow; // Key is the column name from the dataset
}

export enum STEPS {
    HOME,
    REPOSITORY
}