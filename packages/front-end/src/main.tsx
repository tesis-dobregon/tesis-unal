import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  LoginPage from './components/login/login';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage/>} path='/login'>

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
