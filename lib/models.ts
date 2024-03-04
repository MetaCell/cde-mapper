
export interface DataInitParams {
    // First row should be the header.
    datasetMapping?: string[][];
    // List of files in the same format as the above.
    // The content will be used in the suggestions algorithm, order in the list may be used to break ties.
    additionalDatasetMappings?: string[][][];
    // First row should be the headers
    datasetSample: string[][];
    headerIndexes?: HeaderIndexes;
    collections: Collection[];
    config: Config;
    name: string
}

export interface ServiceInitParams {
    callback: (cdeFileMapping: DatasetMapping) => void;
}

export type InitParams = DataInitParams & ServiceInitParams;

export interface HeaderIndexes {
    variableName: number;
    preciseAbbreviation: number;
    title: number;
    interlexId: number;
}

export interface Collection {
    id: string;
    name: string;
    fetch: (queryString: string) => Promise<Option[]>;
    suggested: boolean | null
}

export interface Config {
    height: string; // in %
    width: string; // in %
}

export type OptionDetail = {
    title: string; // What to display as the title/label for the property.
    value: string; // The actual value/content for the property.
};

export type Option = {
    id: string;
    label: string;
    group: string;
    content: OptionDetail[];
}

// Internal

export enum EntityType {
    CDE = 'CDE',
    CustomDataDictionary = 'CustomDataDictionary',
    Unknown = 'Unknown',
}

export interface Suggestions {
    [column: string]: string[][]
}

export interface DatasetMapping {
    [variableName: string]: string[];
}

export enum STEPS {
    HOME,
    COLLECTION,
}

export interface SelectableCollection {
    id: string;
    name: string;
    selected: boolean;
}