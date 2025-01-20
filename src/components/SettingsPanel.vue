<script setup>
import { ref } from 'vue'
import { useSettingsStore } from '../stores/settings'
import ToggleSwitch from './ToggleSwitch.vue'

const settings = useSettingsStore()
const isOpen = ref(false)

function toggle() {
   isOpen.value = !isOpen.value
}
</script>

<template>
   <div class="fixed top-4 right-4 z-50">
      <button
         class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
         @click="toggle"
      >
         <span class="material-icons">settings</span>
      </button>

      <Transition
         enter-active-class="transition duration-200 ease-out"
         enter-from-class="transform translate-y-8 opacity-0"
         enter-to-class="transform translate-y-0 opacity-100"
         leave-active-class="transition duration-150 ease-in"
         leave-from-class="transform translate-y-0 opacity-100"
         leave-to-class="transform translate-y-8 opacity-0"
      >
         <div
            v-if="isOpen"
            class="absolute right-0 bottom-11 mb-2 w-64 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 text-purple-900 border border-white/20"
         >
            <h3 class="text-lg font-semibold mb-4 text-purple-900/90">Settings</h3>

            <ToggleSwitch
               v-model="settings.showAdvancedChords"
               label="Show Advanced Chords"
               class="mb-3"
            />

            <ToggleSwitch
               v-model="settings.showSharpsAndFlats"
               label="Show Sharps and Flats"
            />
         </div>
      </Transition>
   </div>
</template>