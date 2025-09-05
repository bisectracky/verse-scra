import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThirdwebProvider } from 'thirdweb/react'
import App from './App'
import './index.css'
import '../css/12-panel-styles.css'
import { enableHMRDebug } from './hmr-debug.js'

// Enable HMR debugging in development
if (import.meta.env.DEV) {
  enableHMRDebug()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider>
    <App />
  </ThirdwebProvider>
)