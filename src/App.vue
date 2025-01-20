<script setup>
import { ref, provide } from 'vue'
import data from './data/nashville-numbers.json'
import FlashCard from './components/FlashCard.vue'
import KeySelector from './components/KeySelector.vue'
import ViewToggle from './components/ViewToggle.vue'
import { useKeyboardNav } from './composables/useKeyboardNav'

const currentKey = ref('C')
const currentNumber = ref(0)
const isCheatSheetMode = ref(false)
const flashCardRef = ref(null)

const totalNumbers = data.numbers.length

function nextCard() {
   if (currentNumber.value < totalNumbers - 1) {
      currentNumber.value++
   }
}

function previousCard() {
   if (currentNumber.value > 0) {
      currentNumber.value--
   }
}

function setKey(key) {
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
</script>

<template>
   <div class="app">
      <KeySelector
         :keys="data.keys"
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
            :number="data.numbers[currentNumber]"
            :current-key="currentKey"
            ref="flashCardRef"
         />

         <div class="progress">
            {{ currentKey }}, {{ currentNumber + 1 }}/{{ totalNumbers }}
         </div>

         <div class="controls">
            <button @click="previousCard">Previous</button>
            <button @click="nextCard">Next</button>
         </div>
      </div>
   </div>
</template>

<style scoped>
.app {
   padding: 1rem;
   max-width: 600px;
   margin: 0 auto;
}

.current-key {
   text-align: center;
   font-size: 1.5rem;
   margin: 1rem 0;
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
}
</style>