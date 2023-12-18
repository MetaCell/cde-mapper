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
    cdeFileMapping: File;
    labFileMapping: File | null;
    datasetSample: File;
    callback: (cdeFileMapping: File | null) => void;
    repositories: Repository[];
    config: Config;
    labName: string
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
export interface DatasetCDEEntry {
    type: CDEType;
    status: CDEStatus;
    // Include other optional string attributes as needed
    [key: string]: string;
}

export interface DatasetCDEMapping {
    [variableName: string]: DatasetCDEEntry;// Key is the column name from the dataset
}

export enum STEPS {
    HOME,
    REPOSITORY
}