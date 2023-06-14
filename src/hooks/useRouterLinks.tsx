import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { LoginPage } from '../pages/Login';

import App from '../App.tsx'

export const useRouterLinks = () => {
  const routerObjects: RouteObject[] = [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ];
  const router = createBrowserRouter(routerObjects);

  return { router };
};
