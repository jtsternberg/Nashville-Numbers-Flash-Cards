<script setup>
import { ref, onMounted } from 'vue'
import { version } from '../../package.json'
import InstallPrompt from './InstallPrompt.vue'
import { useInstallPrompt } from '../composables/useInstallPrompt'
import ShareButton from './ShareButton.vue'

const isOpen = ref(false)
const lastUpdated = __BUILD_TIME__
const updateAvailable = ref(false)
const { isInstalled } = useInstallPrompt()
let registration = null

onMounted(async () => {
   // Check if service worker is supported
   if ('serviceWorker' in navigator) {
      try {
         registration = await navigator.serviceWorker.getRegistration()

         // Listen for new updates
         registration?.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            newWorker.addEventListener('statechange', () => {
               if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  updateAvailable.value = true
               }
            })
         })
      } catch (error) {
         console.error('Error checking for PWA updates:', error)
      }
   }
})

function toggle() {
   isOpen.value = !isOpen.value
}

async function handleRefresh() {
   try {
      if ('serviceWorker' in navigator) {
         // Unregister existing service worker
         const registrations = await navigator.serviceWorker.getRegistrations()
         await Promise.all(registrations.map(reg => reg.unregister()))

         // Clear caches
         const cacheKeys = await caches.keys()
         await Promise.all(cacheKeys.map(key => caches.delete(key)))
      }

      // Reload the page to get fresh content and reinstall service worker
   } catch (error) {
      console.error('Error refreshing app:', error)
   }
   // Reload the page with timestamp
   const url = new URL(window.location.href)
   url.searchParams.set('t', Date.now())
   window.location.href = url.toString()
}
</script>

<template>
   <div class="relative">
      <button
         class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors relative"
         @click="toggle"
         title="Information"
         aria-label="Show information"
      >
         <span class="material-icons">info</span>
         <!-- Update indicator -->
         <span
            v-if="updateAvailable"
            class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            aria-label="Update available"
         ></span>
      </button>

      <Transition
         enter-active-class="transition duration-200 ease-out"
         enter-from-class="transform -translate-y-8 opacity-0"
         enter-to-class="transform translate-y-0 opacity-100"
         leave-active-class="transition duration-150 ease-in"
         leave-from-class="transform translate-y-0 opacity-100"
         leave-to-class="transform -translate-y-8 opacity-0"
      >
         <div
            v-if="isOpen"
            class="absolute right-0 top-11 mt-2 w-80 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 text-purple-900 border border-white/20 z-50"
         >
            <h3 class="text-lg font-semibold mb-4 text-purple-900/90">About</h3>

            <div class="space-y-3">
               <div class="flex justify-between items-center">
                  <span class="text-sm font-medium">Version</span>
                  <span class="text-sm text-purple-900/70">{{ version }}</span>
               </div>

               <div class="flex justify-between items-center">
                  <span class="text-sm font-medium">Last Updated</span>
                  <span class="text-sm text-purple-900/70">{{ lastUpdated }}</span>
               </div>

               <div class="flex justify-between items-center">
                  <span class="text-sm font-medium">Created By</span>
                  <span class="text-sm text-purple-900/70">
                     <a href="mailto:me@jtsternberg.com?subject=Nashville%20Numbers%20App%20Inquiry">Justin Sternberg</a>
                  </span>
               </div>

               <div v-if="!isInstalled" class="mt-4 pt-4 border-t border-purple-900/10">
                  <h4 class="text-sm font-semibold mb-2">Install App</h4>
                  <InstallPrompt />
               </div>

               <ShareButton class="mt-4" full-width />

               <button
                  @click="handleRefresh"
                  class="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  :class="{ 'bg-red-600 hover:bg-red-700': updateAvailable }"
               >
                  <span class="material-icons text-sm">{{ updateAvailable ? 'system_update' : 'refresh' }}</span>
                  <span>{{ updateAvailable ? 'Update Available' : 'Refresh App' }}</span>
               </button>
            </div>
         </div>
      </Transition>
   </div>
</template>