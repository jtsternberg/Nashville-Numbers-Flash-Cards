import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
   base: '/nashville-numbers/',
   build: {
      outDir: 'nashville-numbers',
      emptyOutDir: true
   },
   define: {
      __BUILD_TIME__: JSON.stringify(new Date().toLocaleDateString())
   },
   plugins: [
      vue(),
      VitePWA({
         registerType: 'autoUpdate',
         includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
         manifest: {
            name: 'Nashville Number System',
            short_name: 'NNS Cards',
            description: 'Nashville Number System Flash Cards',
            theme_color: '#ffffff',
            icons: [
               {
                  src: 'pwa-192x192.png',
                  sizes: '192x192',
                  type: 'image/png'
               },
               {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png'
               },
               {
                  src: 'pwa-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any maskable'
               }
            ]
         },
         workbox: {
            cleanupOutdatedCaches: true,
            clientsClaim: true,
            skipWaiting: true
         }
      })
   ]
})