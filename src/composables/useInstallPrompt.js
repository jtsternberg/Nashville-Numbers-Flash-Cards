import { ref } from 'vue'

const deferredPrompt = ref(null)

export function useInstallPrompt() {
   function initInstallPrompt() {
      // Listen for 'beforeinstallprompt' event
      window.addEventListener('beforeinstallprompt', (e) => {
         e.preventDefault()
         deferredPrompt.value = e
         console.log('beforeinstallprompt event:', e)
      })
   }

   async function installApp() {
      if (!deferredPrompt.value) return

      try {
         const result = await deferredPrompt.value.prompt()
         console.log('Install prompt result:', result)
         deferredPrompt.value = null
      } catch (error) {
         console.error('Error installing app:', error)
      }
   }

   return {
      deferredPrompt,
      initInstallPrompt,
      installApp
   }
}