import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Mapper from './containers/Mapper';
import Home from './containers/Home';
import CreateTemplate from './containers/CreateTemplate';
import { datasetMock, dictionaryMock } from './mock';

export let router = createBrowserRouter([
  {
    path: '/',
    // element: <Navigate to="/home" />,
    element: <App dataset={datasetMock} datasetDictionary={dictionaryMock} />,

    children: [
      {
        path: '/',
        element: <Home />,
        // loader: appLoader,
      },
      {
        path: 'mapper',
        element: <Mapper />,
      },
      {
        path: 'create-template',
        element: <CreateTemplate />,
      },
    ],
  },
]);
