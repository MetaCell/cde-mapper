import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

interface ICommonDataElements {
  id: string;
  'PRECISE-TBI CDE Title': string;
  Unit_of_Measure?: string;
  Description?: string;
  DataType?: string;
  'Multiple Values': boolean;
  PermittedValues?: string;
  MinimumValue?: string;
  MaximumValue?: string;
  Comments?: string;
  'InterLex ID': string;
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

const defaultValue = {
  dictionary: [],
  datasets: [],
};

export default function App() {
  return <Outlet context={defaultValue} />;
}

export function useAppContext() {
  return useOutletContext<AppContextType>();
}
