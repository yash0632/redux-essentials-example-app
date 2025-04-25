import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store'

import App from './App'

import { worker } from './api/server'

import './primitiveui.css'
import './index.css'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  const root = createRoot(document.getElementById('root')!)

  root.render(
    <Provider store = {store}>
      <React.StrictMode>
        
        <App />
      </React.StrictMode>
    </Provider>
  )
}

start()
