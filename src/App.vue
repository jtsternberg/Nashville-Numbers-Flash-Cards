<script setup>
import { ref, provide, computed, watch } from 'vue'
import data from './data/nashville-numbers.json'
import FlashCard from './components/FlashCard.vue'
import KeySelector from './components/KeySelector.vue'
import ViewToggle from './components/ViewToggle.vue'
import CheatSheet from './components/CheatSheet.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import { useKeyboardNav } from './composables/useKeyboardNav'
import { useSettingsStore } from './stores/settings'

const settings = useSettingsStore()
const currentKey = computed({
   get: () => settings.currentKey,
   set: (value) => settings.currentKey = value
})
const currentNumber = ref(0)
const isCheatSheetMode = ref(false)
const flashCardRef = ref(null)
const isKeyChanging = ref(false)


const hideSharpsAndFlats = computed(() => settings.hideSharpsAndFlats)

// Filter numbers based on settings
const filteredNumbers = computed(() =>
   data.numbers.filter(n => settings.showAdvancedChords || !n.isException)
)

const totalNumbers = computed(() => filteredNumbers.value.length)

function nextCard() {
   if (currentNumber.value < totalNumbers.value - 1) {
      currentNumber.value++
   }
}

function previousCard() {
   if (currentNumber.value > 0) {
      currentNumber.value--
   }
}

function setKey(key) {
   if (currentKey.value === key) return

   isKeyChanging.value = true
   currentKey.value = key
   currentNumber.value = 0

   // Reset the changing state after animation completes
   setTimeout(() => {
      isKeyChanging.value = false
   }, 600)
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
</script>

<template>
   <div class="app relative">
      <SettingsPanel />
      <!-- Progress Header -->
      <div class="mb-8">
         <div class="flex items-center justify-between mb-2">
            <h1 class="text-xl font-semibold text-white">Nashville Numbers</h1>
            <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
               <span class="text-sm text-white">{{ totalNumbers }}</span>
            </div>
         </div>

         <!-- Progress Indicators -->
         <div class="flex justify-between items-center text-white/80 text-sm mb-4">
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
         </div>

         <!-- Progress Bar -->
         <div class="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
               class="h-full bg-white transition-all duration-300"
               :style="{ width: `${((currentNumber + 1) / totalNumbers) * 100}%` }"
            ></div>
         </div>
      </div>
      <KeySelector
         :keys="hideSharpsAndFlats ? data.keysNoSharpsAndFlats : data.keys"
         :current-key="currentKey"
         @select-key="setKey"
      />

      <ViewToggle
         :is-cheat-sheet="isCheatSheetMode"
         @toggle="toggleView"
      />

      <div v-if="isCheatSheetMode">
         <CheatSheet
            :current-key="currentKey"
            :numbers="data.numbers"
         />
      </div>
      <div v-else class="flashcard-view">
         <div class="current-key">Key of {{ currentKey }}</div>

         <FlashCard
            :number="filteredNumbers[currentNumber]"
            :current-key="currentKey"
            :card-classes="cardClasses"
            ref="flashCardRef"
         />

         <div class="progress">
            {{ currentKey }}, {{ currentNumber + 1 }}/{{ totalNumbers }}
         </div>

         <div class="controls">
            <button
               class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
               @click="previousCard"
            >
               <span class="material-icons">arrow_back</span>
            </button>
            <button
               class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
               @click="nextCard"
            >
               <span class="material-icons">arrow_forward</span>
            </button>
         </div>
      </div>
   </div>
</template>

<style>
.app {
   padding: 1rem;
   max-width: 600px;
   margin: 0 auto;
   position: relative;
   z-index: 1;
}

/* Add the wave background */
body {
   background: linear-gradient(135deg, #7c3aed, #9333ea);
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
   /* animation: wave 2s infinite linear; */
}

body::before {
   /* background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); */

   /* animation-delay: -3s; */
}

body::after {
   /* background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); */

}

@keyframes wave {
   50% {
      transform: scaleY(1.1);
   }
}

.current-key {
   text-align: center;
   font-size: 1.5rem;
   margin: 1rem 0;
   color: white;
}

.controls {
   display: flex;
   justify-content: center;
   gap: 1rem;
   margin-top: 1rem;
}

.progress {
   text-align: center;
   margin-top: 1rem;
   color: white;
}
</style>