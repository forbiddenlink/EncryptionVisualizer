import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { LazyMotion } from 'framer-motion'
import posthog from 'posthog-js'
import { registerSW } from 'virtual:pwa-register'
import { motionFeatures } from './lib/motionFeatures'
import { router } from './router'
import './index.css'

registerSW({ immediate: true })

if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={motionFeatures} strict>
      <RouterProvider router={router} />
    </LazyMotion>
  </StrictMode>,
)
