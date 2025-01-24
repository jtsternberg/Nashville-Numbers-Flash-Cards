<script setup>
import { ref, provide, computed, watch, nextTick } from 'vue'
import data from './data/nashville-numbers.json'
import FlashCard from './components/FlashCard.vue'
import KeySelector from './components/KeySelector.vue'
import CheatSheet from './components/CheatSheet.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import InfoPanel from './components/InfoPanel.vue'
import { useKeyboardNav } from './composables/useKeyboardNav'
import { useSettingsStore } from './stores/settings'
import FlashCardNav from './components/FlashCardNav.vue'
import FlashCardView from './components/FlashCardView.vue'
import FirstViewNotice from './components/FirstViewNotice.vue'
import Toast from './components/Toast.vue'

const settings = useSettingsStore()
const currentKey = computed({
   get: () => settings.currentKey,
   set: (value) => settings.currentKey = value
})
const currentNumber = ref(0)
const isCheatSheetMode = ref(false)
const flashCardRef = ref(null)
const keySelectorRef = ref(null)
const isKeyChanging = ref(false)

const showSharpsAndFlats = computed(() => settings.showSharpsAndFlats)

// Filter numbers based on settings
const filteredNumbers = computed(() => {
   return data.numbers.filter(n => settings.showAdvancedChords || !n.isException)
})

const totalNumbers = computed(() => filteredNumbers.value.length)

function nextCard() {
   if (currentNumber.value < totalNumbers.value - 1) {
      currentNumber.value++
   } else {
      // Get the current key index
      const keyList = showSharpsAndFlats.value ? data.keys : data.keysNoSharpsAndFlats
      const currentKeyIndex = keyList.indexOf(currentKey.value)

      // Move to the next key if not at the last key
      if (currentKeyIndex < keyList.length - 1) {
         const nextKey = keyList[currentKeyIndex + 1]
         setKey(nextKey)
      } else {
         // Optionally wrap around to the first key
         setKey(keyList[0])
      }
   }
}

function previousCard() {
   if (currentNumber.value > 0) {
      currentNumber.value--
   } else {
      // Get the current key index
      const keyList = showSharpsAndFlats.value ? data.keys : data.keysNoSharpsAndFlats
      const currentKeyIndex = keyList.indexOf(currentKey.value)

      // Move to the previous key if not at the first key
      if (currentKeyIndex > 0) {
         const prevKey = keyList[currentKeyIndex - 1]
         setKey(prevKey)
         // Set to last card of the previous key
         currentNumber.value = totalNumbers.value - 1
      } else {
         // Optionally wrap around to the last key
         setKey(keyList[keyList.length - 1])
         currentNumber.value = totalNumbers.value - 1
      }
   }
}

function afterSetKey(key) {
   isKeyChanging.value = true
   currentNumber.value = 0

   // Scroll the key selector to the new key
   nextTick(() => {
      keySelectorRef.value?.scrollToKey(key)
   })

   // Reset the changing state after animation completes
   setTimeout(() => {
      isKeyChanging.value = false
   }, 600)
}

function setKey(key) {
   if (currentKey.value === key) return

   currentKey.value = key
}

function toggleView() {
   isCheatSheetMode.value = !isCheatSheetMode.value
}

useKeyboardNav({
   toggleFlip: () => {
      if (!isCheatSheetMode.value) {
         flashCardRef.value?.toggleFlip()
      }
   },
   previous: previousCard,
   next: nextCard
})

// Add transition classes when key changes
const cardClasses = computed(() => ({
   'transition-transform duration-300': isKeyChanging.value,
   'scale-0': isKeyChanging.value,
}))

const selectCard = (number) => {
   try {
      // First ensure the advanced chords are shown if needed
      if (number.isException && !settings.showAdvancedChords) {
         settings.showAdvancedChords = true
         // Wait for the settings change to propagate
         return;
      }

      // Make sure filteredNumbers is available
      if (!filteredNumbers.value) {
         return;
      }

      const index = filteredNumbers.value.findIndex(n => n.number === number.number)
      if (index !== -1) {
         currentNumber.value = index
         isCheatSheetMode.value = false
      }
   } catch (error) {
      console.error('Error switching to flashcard:', error)
   }
};

watch(() => settings.showAdvancedChords, (newVal) => {
   if (!newVal) {
      currentNumber.value = 0
   }
})
watch(() => settings.showSharpsAndFlats, (newVal) => {
   if (!newVal) {
      setKey(data.keysNoSharpsAndFlats[0])
   }
})
// Watch for currentKey changes and scroll to it
watch(() => currentKey.value, (newVal) => {
   afterSetKey(newVal)
}, { immediate: true })
</script>

<template>
   <div class="app relative">
      <!-- Progress Header -->
      <div class="mb-2">
         <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl font-semibold text-white">Nashville Numbers</h1>
            <InfoPanel />
         </div>

         <!-- Progress Indicators -->
         <!-- <div class="flex justify-between items-center text-white/80 text-sm mb-4">
            <div class="text-center">
               <div>Learning</div>
               <div class="text-xl font-bold">{{ currentNumber + 1 }}</div>
            </div>
            <div class="text-center opacity-50">
               <div>Reviewing</div>
               <div class="text-xl font-bold">0</div>
            </div>
            <div class="text-center opacity-50">
               <div>Mastered</div>
               <div class="text-xl font-bold">0</div>
            </div>
         </div> -->

      </div>
      <KeySelector
         ref="keySelectorRef"
         :keys="showSharpsAndFlats ? data.keys : data.keysNoSharpsAndFlats"
         :current-key="currentKey"
         @select-key="setKey"
      />

      <!-- Progress Bar -->
      <div class="h-1 bg-white/20 rounded-full overflow-hidden mt-5">
         <div
            class="h-full bg-white transition-all duration-300"
            :style="{ width: `${((currentNumber + 1) / totalNumbers) * 100}%` }"
         ></div>
      </div>

      <CheatSheet
         v-if="isCheatSheetMode"
         :current-key="currentKey"
         :numbers="data.numbers"
         @select-number="selectCard"
      />
      <div v-else class="flex flex-col items-center justify-center flex-grow min-h-[calc(100vh-20rem)]">
         <FlashCardView
            :current-key="currentKey"
            :number="filteredNumbers[currentNumber]"
            :card-classes="cardClasses"
            :current-number="currentNumber"
            :total-numbers="totalNumbers"
            @next="nextCard"
            @previous="previousCard"
            ref="flashCardRef"
         />
      </div>

      <!-- Footer Navigation -->
      <div class="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-4 bg-white/10 backdrop-blur-sm border-t border-white/20">
         <div class="max-w-2xl w-full flex justify-between items-center">
            <button
               class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
               @click="toggleView"
            >
               <span class="material-icons">{{ isCheatSheetMode ? 'school' : 'grid_view' }}</span>
            </button>

            <SettingsPanel />
         </div>
      </div>

      <!-- Add padding to prevent content from being hidden behind footer -->
      <div class="h-20"></div>

      <FirstViewNotice />
      <Toast />
   </div>
</template>

<style>
.app {
   padding: 1rem 1rem 3rem;
   max-width: 2xl;
   margin: 0 auto;
   position: relative;
   z-index: 1;
}

/* Add the wave background */
body {
   background: linear-gradient(135deg, #9157f5, #412360);
   position: relative;
   overflow-x: hidden;
   height: 100vh;
}

body::before,
body::after {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   height: 100vh;
   width: 100%;
   background-repeat: no-repeat;
   background-size: 100% 100%;
   transform-origin: top center;
   animation: wave 2s infinite linear;
}

@keyframes wave {
   50% {
      transform: scaleY(1.1);
   }
}

</style>