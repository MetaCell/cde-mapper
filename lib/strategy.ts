import { HeaderIndexes, DatasetMapping } from "./models";

export interface SortingStrategy {
    doSort(data: string[], direction: string, datasetMapping: DatasetMapping, headerIndexes: HeaderIndexes, getType: (row: any, headerIndexes: HeaderIndexes) => string): void;
}

export class CdeSortingFilter implements SortingStrategy {
    public doSort(data: string[], direction: string, datasetMapping: DatasetMapping, headerIndexes: HeaderIndexes): string[] {
        return data.sort((a, b) => {
            const rowA = datasetMapping[a];
            const rowB = datasetMapping[b];

            if (direction === "asc") return rowA[headerIndexes.preciseAbbreviation].localeCompare(rowB[headerIndexes.preciseAbbreviation]);
            else return rowB[headerIndexes.preciseAbbreviation].localeCompare(rowA[headerIndexes.preciseAbbreviation]);
        })
    }
}

export class VariableNameFilter implements SortingStrategy {
    public doSort(data: string[], direction: string): string[] {
        return direction === "desc" ? data.sort().reverse() : data.sort();
    }
}

export class StatusFilter implements SortingStrategy {
    public doSort(data: string[], direction: string, datasetMapping: DatasetMapping, headerIndexes: HeaderIndexes, getType: (row: any, headerIndexes: HeaderIndexes) => string): string[] {
        return data.sort((a, b) => {
            const rowA = datasetMapping[a];
            const rowB = datasetMapping[b];

            if (direction === "asc") return getType(rowA, headerIndexes).localeCompare(getType(rowB, headerIndexes));
            else return getType(rowB, headerIndexes).localeCompare(getType(rowA, headerIndexes));
        })
    }
}