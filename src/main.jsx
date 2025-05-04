import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DataProvider } from './DataProvider.jsx'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from './state/store'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <DataProvider>
        <App />
        <ToastContainer />
      </DataProvider>
    </Provider>
  </StrictMode>
)
