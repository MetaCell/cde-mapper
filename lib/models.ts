export interface InitParams {
    // First row should be the header.
    datasetMapping?: string[][];
    // List of files in the same format as the above.
    // The content will be used in the suggestions algorithm, order in the list may be used to break ties.
    additionalDatasetMappings?: string[][][];
    // First row should be the headers
    datasetSample: string[][];
    headerMapping?: HeaderMapping;
    collections: Collection[];
    config: Config;
    name: string
    callback: (cdeFileMapping: DatasetMapping) => void;
}

export interface HeaderMapping {
    variableNameIndex: number;
    preciseAbbreviationIndex: number;
    titleIndex: number;
    interlexIdIndex: number;
}

export interface Collection {
    id: string;
    name: string;
    fetch: (queryString: string) => Promise<Entity[]>;
    suggested: boolean | null
}

export interface Config {
    height: string; // in %
    width: string; // in %
}

// Internal

export interface Entity {
    variableName: string;
    preciseAbbrev: string;
    title: string;
    interlexId: string;
    type: EntityType;

    [key: string]: string;
}

export enum EntityType {
    MappedCDE = 'MappedCDE',
    MappedCustomDataDictionary = 'MappedCustomDataDictionary',
    Unmapped = 'Unmapped'
}

export interface Suggestions {
    [column: string]: Entity[]
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