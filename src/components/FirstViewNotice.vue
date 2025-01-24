<script setup>
import { ref, onMounted, computed } from 'vue'
import InstallPrompt from './InstallPrompt.vue'
import { useInstallPrompt } from '../composables/useInstallPrompt'

const isVisible = ref(false)
const { deferredPrompt } = useInstallPrompt()
const hasInstallButton = computed(() => !!deferredPrompt.value)

onMounted(() => {
   // Check if notice was previously dismissed
   const dismissed = localStorage.getItem('install-notice-dismissed')
   if (!dismissed) {
      isVisible.value = true
   }
})

function dismiss() {
   isVisible.value = false
   localStorage.setItem('install-notice-dismissed', 'true')
}
</script>

<template>
   <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-full opacity-0"
   >
      <div
         v-if="isVisible"
         class="fixed inset-x-0 bottom-0 p-6 pb-16 bg-white/80 backdrop-blur-sm border-t border-purple-900/10 shadow-lg"
      >
         <div class="max-w-lg mx-auto">
            <div class="flex justify-between items-start mb-4">
               <h3 class="text-lg font-semibold text-purple-900">Install Nashville Numbers</h3>
               <button
                  @click="dismiss"
                  class="text-purple-900/50 hover:text-purple-900 transition-colors"
                  aria-label="Dismiss notice"
               >
                  <span class="material-icons">close</span>
               </button>
            </div>

            <InstallPrompt />

            <div v-if="hasInstallButton" class="mt-4 text-center">
               <button
                  @click="dismiss"
                  class="text-sm text-purple-900/50 hover:text-purple-900 transition-colors"
               >
                  No thank you, maybe later
               </button>
            </div>
         </div>
      </div>
   </Transition>
</template>