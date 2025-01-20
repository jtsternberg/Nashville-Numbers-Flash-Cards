import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'nns-settings'

// Default settings
const DEFAULT_SETTINGS = {
   showAdvancedChords: false,
   hideSharpsAndFlats: true,
   currentKey: 'C'
}

// Load settings from localStorage
function loadSettings() {
   try {
      const savedSettings = localStorage.getItem(STORAGE_KEY)
      if (savedSettings) {
         return { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) }
      }
   } catch (e) {
      console.warn('Failed to load settings from localStorage:', e)
   }
   return DEFAULT_SETTINGS
}

export const useSettingsStore = defineStore('settings', () => {
   const settings = loadSettings()
   const showAdvancedChords = ref(settings.showAdvancedChords)
   const hideSharpsAndFlats = ref(settings.hideSharpsAndFlats)
   const currentKey = ref(settings.currentKey)

   // Watch for changes and save to localStorage
   watch([showAdvancedChords, hideSharpsAndFlats, currentKey], () => {
      try {
         localStorage.setItem(STORAGE_KEY, JSON.stringify({
            showAdvancedChords: showAdvancedChords.value,
            hideSharpsAndFlats: hideSharpsAndFlats.value,
            currentKey: currentKey.value
         }))
      } catch (e) {
         console.warn('Failed to save settings to localStorage:', e)
      }
   })

   return {
      showAdvancedChords,
      hideSharpsAndFlats,
      currentKey
   }
})