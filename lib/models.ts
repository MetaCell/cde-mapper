import React from "react";

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
    datasetSample: File;
    callback: Function;
    repositories: Repository[];
    config: Config;
    labName: string
}


// Internal
export interface DatasetCDEMapping {
    [key: string]: CDE; // Key is the column name from the dataset
}


export interface CdeContextProviderProps extends InitParams{
    children: React.ReactNode
}