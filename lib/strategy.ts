import { HeaderIndexes, DatasetMapping } from "./models";


export interface SortingStrategy {
    doSort(data: string[], datasetMapping?: DatasetMapping, headerIndexes?: HeaderIndexes, getType?: (row: any, headerIndexes: HeaderIndexes) => string): string[];
    toggleSortOrder(): void;
}

export enum SortState {
    Off = 0,
    Ascending = 1,
    Descending = 2
}

abstract class SortingStrategyBase implements SortingStrategy {
    protected sortState: SortState = SortState.Off;

    public toggleSortOrder(): void {
        this.sortState = (this.sortState + 1) % 3;
    }

    abstract doSort(data: string[], datasetMapping: DatasetMapping, headerIndexes: HeaderIndexes, getType?: (row: any, headerIndexes: HeaderIndexes) => string): string[];
}

export class CdeSortingFilter extends SortingStrategyBase {
    public doSort(data: string[], datasetMapping: DatasetMapping, headerIndexes: HeaderIndexes): string[] {
        if (this.sortState === SortState.Off) {
            return Object.keys(datasetMapping);
        }

        const sortedData = data.slice();

        sortedData.sort((a, b) => {
            const rowA = datasetMapping[a];
            const rowB = datasetMapping[b];
            let comparisonResult = rowA[headerIndexes.preciseAbbreviation].localeCompare(rowB[headerIndexes.preciseAbbreviation]);

            if (this.sortState === SortState.Descending) {
                comparisonResult *= -1;
            }

            return comparisonResult;
        });

        return sortedData;
    }
}

export class VariableNameFilter extends SortingStrategyBase {
    public doSort(data: string[], datasetMapping: DatasetMapping): string[] {
        console.log("sort order: ", this.sortState)
        if (this.sortState === SortState.Off) {
            return Object.keys(datasetMapping);
        }

        const sortedData = data.slice();

        sortedData.sort((a, b) => {
            let comparisonResult = a.localeCompare(b);

            if (this.sortState === SortState.Descending) {
                comparisonResult *= -1;
            }

            return comparisonResult;
        });

        return sortedData;
    }
}

export class StatusFilter extends SortingStrategyBase {
    public doSort(data: string[], datasetMapping: DatasetMapping, headerIndexes: HeaderIndexes, getType: (row: any, headerIndexes: HeaderIndexes) => string): string[] {
        if (this.sortState === SortState.Off) {
            return Object.keys(datasetMapping)
        }

        const sortedData = data.slice();

        sortedData.sort((a, b) => {
            const rowA = datasetMapping[a];
            const rowB = datasetMapping[b];
            let comparisonResult = getType(rowA, headerIndexes).localeCompare(getType(rowB, headerIndexes));

            if (this.sortState === SortState.Descending) {
                comparisonResult *= -1;
            }

            return comparisonResult;
        });

        return sortedData;
    }
}