<script setup>
import { computed } from 'vue'
import { calculateChord } from '../utils/chordUtils'
import { useSettingsStore } from '../stores/settings'

const props = defineProps({
   currentKey: {
      type: String,
      required: true
   },
   numbers: {
      type: Array,
      required: true
   }
})

const settings = useSettingsStore()

// Split numbers into basic and advanced
const basicNumbers = computed(() =>
   props.numbers.filter(n => !n.isException)
)

const advancedNumbers = computed(() =>
   props.numbers.filter(n => n.isException)
)

const chords = computed(() =>
   basicNumbers.value.map(num => ({
      ...num,
      chord: calculateChord(props.currentKey, num.number, num.quality)
   }))
)

const advancedChords = computed(() => {
   console.log(advancedNumbers.value.map(num => ({
      ...num,
      chord: calculateChord(props.currentKey, num.number, num.quality) || '',
   })))
   return advancedNumbers.value.map(num => ({
      ...num,
      chord: calculateChord(props.currentKey, num.number, num.quality) || '',
   }))
})
</script>

<template>
   <div class="p-4 space-y-8">
      <!-- Basic Chords -->
      <div class="space-y-4">
         <h2 class="text-xl font-semibold text-gray-100">Most Common Chord Types</h2>
         <div class="flex flex-wrap gap-4">
            <div
               v-for="item in chords"
               :key="item.number"
               class="bg-white rounded-lg shadow p-4 text-center w-24 h-36"
            >
               <div class="text-2xl font-bold text-purple-600">{{ item.number }}</div>
               <div v-show="item.chord" class="text-lg text-gray-600">{{ item.chord }}</div>
               <div v-show="item.quality" class="text-sm text-gray-400">{{ item.quality }}</div>
            </div>
         </div>
      </div>

      <!-- Advanced Chords -->
      <div v-if="settings.showAdvancedChords" class="space-y-4">
         <h2 class="text-xl font-semibold text-gray-700">Most Common Exceptions</h2>
         <div class="flex flex-wrap gap-4">
            <div
               v-for="item in advancedChords"
               :key="item.number"
               class="bg-white rounded-lg shadow p-4 text-center"
            >
               <div class="text-2xl font-bold text-purple-600">{{ item.number }}</div>
               <div v-show="item.chord" class="text-lg text-gray-600">{{ item.chord }}</div>
               <div v-show="item.quality" class="text-sm text-gray-400">{{ item.quality }}</div>
            </div>
         </div>
      </div>
   </div>
</template>