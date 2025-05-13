import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

import RootLayout from './pages/Root';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <Navigate to="/main" replace />
      }
    ]
  }])

function App() {

  return <RouterProvider router={router} />
}

export default App;
