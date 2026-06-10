import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'izitoast/dist/css/iziToast.min.css';
import './index.css';
import { GlobalStyles } from './components/components.jsx';
import { router } from './router/router.jsx';





createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </StrictMode>,
);
