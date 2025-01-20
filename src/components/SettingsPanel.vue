<script setup>
import { ref } from 'vue'
import { useSettingsStore } from '../stores/settings'

const settings = useSettingsStore()
const isOpen = ref(false)

function toggle() {
   isOpen.value = !isOpen.value
}
</script>

<template>
   <div class="fixed top-4 right-4 z-50">
      <button
         class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-purple-900 flex items-center justify-center transition-colors"
         @click="toggle"
      >
         <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
         </svg>
      </button>

      <div
         v-if="isOpen"
         class="absolute right-0 mt-2 w-64 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 text-purple-900 border border-white/20"
      >
         <h3 class="text-lg font-semibold mb-4 text-purple-900/90">Settings</h3>

         <div class="flex items-center justify-between">
            <label class="text-sm text-purple-900/80">Show Advanced Chords</label>
            <button
               class="relative inline-flex items-center h-6 rounded-full w-11"
               :class="settings.showAdvancedChords ? 'bg-purple-500' : 'bg-white/20'"
               @click="settings.showAdvancedChords = !settings.showAdvancedChords"
            >
               <span
                  class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
                  :class="settings.showAdvancedChords ? 'translate-x-6' : 'translate-x-1'"
               />
            </button>
         </div>

         <div class="flex items-center justify-between pt-3">
            <label class="text-sm text-purple-900/80">Hide Sharps and Flats</label>
            <button
               class="relative inline-flex items-center h-6 rounded-full w-11"
               :class="settings.hideSharpsAndFlats ? 'bg-purple-500' : 'bg-white/20'"
               @click="settings.hideSharpsAndFlats = !settings.hideSharpsAndFlats"
            >
               <span class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full" :class="settings.hideSharpsAndFlats ? 'translate-x-6' : 'translate-x-1'" />
            </button>
         </div>
      </div>
   </div>
</template>