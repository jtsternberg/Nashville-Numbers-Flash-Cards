<script setup>
import { useToast } from '../composables/useToast'

const { isVisible, message } = useToast()
</script>

<template>
   <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-2 opacity-0"
   >
      <div
         v-if="isVisible"
         class="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-[rgb(44,16,74)]/90 backdrop-blur-sm text-white rounded-lg shadow-lg text-sm flex items-center gap-2 border border-white/10"
      >
         <span class="material-icons text-sm">check_circle</span>
         {{ message }}
      </div>
   </Transition>
</template>