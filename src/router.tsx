import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Mapper from './containers/Mapper';
import Home from './containers/Home';

export let router = createBrowserRouter([
  {
    path: '/',
    // element: <Navigate to="/home" />,
    element: <App />,

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
    ],
  },
]);
