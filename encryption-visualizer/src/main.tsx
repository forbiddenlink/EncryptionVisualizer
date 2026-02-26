import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion } from 'framer-motion'
import { motionFeatures } from './lib/motionFeatures'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={motionFeatures} strict>
      <App />
    </LazyMotion>
  </StrictMode>,
)
