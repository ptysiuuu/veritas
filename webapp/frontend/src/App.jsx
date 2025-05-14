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
        index: true,
        element: <Navigate to="/main" replace />,
      },
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ]
  }])

function App() {

  return <RouterProvider router={router} />
}

export default App;
