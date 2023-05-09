import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { mainTheme } from './themes/mainTheme.ts'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { CamerasProvider } from './context/index.ts'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme} >
      <CssBaseline/>
        <CamerasProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CamerasProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
