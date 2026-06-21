import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App.tsx'
import './lib/debug.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/Otkluci_go_Krusevo">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
