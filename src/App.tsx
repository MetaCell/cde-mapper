import React, { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { csvJSON } from './utils';

const ADDITIONAL = 'additional';
interface ICommonDataElements {
  VariableName?: string;
  'PRECISE-TBI CDE Title'?: string;
  Unit_of_Measure?: string;
  Description?: string;
  DataType?: string;
  'Multiple Values'?: boolean;
  PermittedValues?: string;
  MinimumValue?: string;
  MaximumValue?: string;
  Comments?: string;
  'InterLex ID'?: string;
  children?: ICommonDataElements[];
}

interface IDatasetItem {
  name: string;
  data: string[];
}

type Dataset = IDatasetItem[];

interface DictionaryItem {
  name: string;
  cde: ICommonDataElements;
}

type AppContextType = {
  dictionary: DictionaryItem[];
  datasets: Dataset[];
};

function characterMatchesKey(data: ICommonDataElements, key: string) {
  const nameChunk = data?.VariableName?.split(' ');
  const character = nameChunk?.[0].toLowerCase();
  return key.toLowerCase().includes(character ?? '');
}

function convertCSVDatasetToData(dataset: string, splitter = ',') {
  const raw = csvJSON(dataset);

  // const data = raw.reduce<any[]>((prev, cur: Record<string, unknown>) => {
  //   console.log(prev);
  //   return prev.push(cur)
  // }, []);
  return raw;
}
function convertCSVDictionaryToData(dictionary: string, splitter = ',') {
  const raw: ICommonDataElements[] = csvJSON(dictionary);
  for (const [index, data] of raw.entries()) {
    if (data?.VariableName?.toLowerCase().includes(ADDITIONAL)) {
      let end: number | undefined;

      const key = data.VariableName.split(' ')[1];

      const filteredDictionaries = raw.filter(d => {
        // const nameChunk = d.VariableName?.split(' ');
        // const character = nameChunk?.[0].toLowerCase();
        // return key.toLowerCase().includes(character ?? '');
        return characterMatchesKey(d, key);
      });
      const dataIndex = raw.findIndex(
        d => d.VariableName === filteredDictionaries?.[0]?.VariableName,
      );

      const newDictionary = raw.slice(index);
      const iteratorDictionary = newDictionary.slice(1);
      for (const [childIndex, child] of iteratorDictionary.entries()) {
        if (characterMatchesKey(child, key)) {
          iteratorDictionary.length &&
            iteratorDictionary.map(d => {
              if (d.VariableName === child.VariableName) {
                end = childIndex + 1;
              }

              return d.VariableName === child.VariableName;
            });

          break;
        } else if (!child.VariableName?.toLowerCase().includes(ADDITIONAL)) {
          // const childrenByAdditional = iteratorDictionary.filter(d =>
          //   d.VariableName?.toLowerCase().includes(ADDITIONAL),
          // );
          // const sliceIndex = iteratorDictionary.findIndex(
          //   d => d.VariableName === childrenByAdditional?.[0]?.VariableName,
          // );
          // const endDictionaries = newDictionary.slice(0, sliceIndex + 1);
          end = newDictionary.length;
          break;
        }
      }

      raw[dataIndex] = {
        ...raw[dataIndex],
        children: newDictionary.slice(0, end as number),
      };
      console.log(raw[dataIndex], 'index');
    }
  }
  return raw;
}

// function getDictionaryFormDefaultValue(dictionary, spareDictionaries) {

// }

export default function App({
  dataset,
  datasetDictionary,
  spareDictionaries,
}: {
  dataset: string;
  datasetDictionary: string;
  spareDictionaries?: string[];
}) {
  const [dictionaryData, setDictionary] = useState<DictionaryItem[]>([]);
  const [datasetData, setDataset] = useState<Dataset[]>([]);

  const defaultValue = {
    dictionary: dictionaryData,
    dataset: datasetData,
  };

  console.log(convertCSVDictionaryToData(datasetDictionary), 'dictionary');
  console.log(convertCSVDatasetToData(dataset), 'dictionary');

  return <Outlet context={defaultValue} />;
}

export function useAppContext() {
  return useOutletContext<AppContextType>();
}
