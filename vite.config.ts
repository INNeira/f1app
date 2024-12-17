/// <reference types=vitest />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'prompt',
      injectRegister: 'inline',

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'F1 Info APP',
        short_name: 'F1 app',
        description: 'test PWA project',
        theme_color: '#ffffff',
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.openf1\.org\/v1\/sessions/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'f1-api-cache',
              expiration: {
                maxAgeSeconds: 7 * 24 * 60 * 60 // Cache for 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },

      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
