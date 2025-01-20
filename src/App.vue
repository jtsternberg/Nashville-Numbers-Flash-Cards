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
      <div class="current-key text-center text-xl font-semibold mb-4">Key of {{ currentKey }}</div>
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
            <button class="btn btn-outline text-purple bg-purple-100" @click="previousCard">Previous</button>
            <button class="btn btn-outline text-purple bg-purple-100" @click="nextCard">Next</button>
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
   background: linear-gradient(45deg, #6366f1, #8b5cf6);
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