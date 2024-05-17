import {CDE_BASE_URL} from "../settings.ts";
import {HeaderIndexes, Option, SelectableCollection, Collection} from "../models.ts";
import {useServicesContext} from "../contexts/services/ServicesContext.ts";
import {usePairingSuggestions} from "../hooks/usePairingSuggestions.ts";

export function getCleanUrl(interlexId: string) {
    if (!interlexId) {
        return ''
    }
    const cleanedInterlexId = interlexId.toLowerCase().replace(/:/g, '_');
    return `${CDE_BASE_URL}/${cleanedInterlexId}`;
}

export function resetRow(datasetMappingHeaders: string[], headerMapping: HeaderIndexes, variableName: string) {
    const updatedRow = new Array(datasetMappingHeaders.length).fill('');
    updatedRow[headerMapping.variableName] = variableName
    return updatedRow;
}

export function useHandleSelection() {
    const { updateDatasetMappingRow } = useServicesContext();
    const { updateAvailableSuggestions } = usePairingSuggestions();
  
    const handleSelection = async (
      variableName: string,
      option: Option,
      newIsSelectedState: boolean,
      collections: { [key: string]: Collection },
      selectedOptionsMap: { [id: string]: Option },
      selectableCollections: SelectableCollection[],
      setSelectedOptionsMap: React.Dispatch<React.SetStateAction<{ [id: string]: Option }>>,
      rowIndex?: number
    ) => {
      if (option && newIsSelectedState) {
        // Update optionsMap with the new selected option
        setSelectedOptionsMap((prevOptionsMap) => ({
          ...prevOptionsMap,
          [option.id]: option,
        }));
  
        if (rowIndex !== undefined) {
          updateDatasetMappingRow(variableName, option.content, rowIndex);
        } else {
          updateDatasetMappingRow(variableName, option.content);
        }
  
        // Get all selected collections
        const selectedCollections = selectableCollections.filter((collection) => collection.selected);
  
        // Fetch pairing suggestions from all selected collections
        let aggregatedPairingSuggestions: Option[] = [];
        for (const selectableCollection of selectedCollections) {
          const collection = collections[selectableCollection.id];
          if (collection && collection.getPairingSuggestions) {
            const pairingSuggestions: Option[] = await collection.getPairingSuggestions(option.id);
            aggregatedPairingSuggestions = [...aggregatedPairingSuggestions, ...pairingSuggestions];
          }
        }
        const mappedIds = Object.keys(selectedOptionsMap).map((item) => item.toLowerCase().replace(':', '_'));
        const filteredSuggestions = aggregatedPairingSuggestions.filter((suggestion) => !mappedIds.includes(suggestion.id));
        updateAvailableSuggestions(variableName, filteredSuggestions);
      } else if (option && !newIsSelectedState) {
        updateAvailableSuggestions(variableName, []);
        if (rowIndex !== undefined) {
          updateDatasetMappingRow(variableName, option.content, rowIndex);
        } else {
          updateDatasetMappingRow(variableName, option.content);
        }
      } else {
        console.error("No option provided");
      }
    };
  
    return { handleSelection };
  }