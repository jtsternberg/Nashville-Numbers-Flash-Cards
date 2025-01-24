import { ref, computed } from 'vue'

const deferredPrompt = ref(null)

export function useInstallPrompt() {
   const isInstalled = computed(() => {
      return Boolean(
         window.matchMedia('(display-mode: standalone)').matches
         // iOS
         || navigator.standalone
      )
   })

   function initInstallPrompt() {
      // Don't initialize if already installed
      if (isInstalled.value) return

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
      installApp,
      isInstalled
   }
}