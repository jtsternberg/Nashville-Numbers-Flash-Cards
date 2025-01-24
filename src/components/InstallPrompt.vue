<script setup>
import { onMounted } from 'vue'
import { useInstallPrompt } from '../composables/useInstallPrompt'

const { deferredPrompt, initInstallPrompt, installApp } = useInstallPrompt()

onMounted(() => {
   initInstallPrompt()
})
</script>

<template>
   <div>
      <template v-if="deferredPrompt">
         <p class="text-sm text-purple-900/70 mb-2">Install this app on your device for quick access and offline use.</p>
         <button
            @click="installApp"
            class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
         >
            <span class="material-icons text-sm">download</span>
            <span>Install App</span>
         </button>
      </template>

      <template v-else>
         <p class="text-sm text-purple-900/70 mb-2">To install:</p>
         <ul class="text-sm text-purple-900/70 space-y-2">
            <li><strong>iOS Safari:</strong> Tap share icon → Add to Home Screen</li>
            <li><strong>Android Chrome:</strong> Tap menu → Install App</li>
            <li><strong>Desktop Chrome:</strong> Click install icon in address bar</li>
         </ul>
      </template>
   </div>
</template>