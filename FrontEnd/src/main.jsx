import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import {Store, persistor } from './app/Store.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './Features/Shared/Language/Config.jsx'
import LanguageContext from './Features/Shared/Language/LanguageContext.jsx'
import { createTheme,ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(","),
    spacing: '8'
  },
  palette: {
    secondary: {
      main: '#16db65',
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
    <LanguageContext>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
          </PersistGate>
      </Provider>
      </LanguageContext>
    </React.StrictMode>
  </BrowserRouter>,
)
