import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div className="h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm">Cargando...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
