// import React from 'react'
import { Providers } from './context/Providers.tsx';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { useRouterLinks } from './hooks/useRouterLinks';

import './index.css'
import 'dayjs/locale/ar-sa.js';
import './i18n';
import 'antd/dist/reset.css';
import './index.scss';

const container = document.getElementById('root');

const root = createRoot(container!);
const App = () => {
  const { router } = useRouterLinks();
  return <RouterProvider router={router} />;
};

root.render(
  <Providers>
    <App />
  </Providers>
);

postMessage({ payload: 'removeLoading' }, '*')
