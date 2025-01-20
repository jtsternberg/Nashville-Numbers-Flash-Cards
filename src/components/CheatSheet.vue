<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { useChordStore } from '../stores/chords'

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

const emit = defineEmits(['select-number'])

const settings = useSettingsStore()
const chordStore = useChordStore()

// Split numbers into basic and advanced
const basicNumbers = computed(() =>
   props.numbers.filter(n => !n.isException)
)

const advancedNumbers = computed(() =>
   props.numbers.filter(n => n.isException)
)

const diatonicChords = computed(() =>
   basicNumbers.value.map(num => ({
      ...num,
      chord: chordStore.calculateChord(props.currentKey, num.number, num.quality)
   }))
)

const advancedChords = computed(() =>
   advancedNumbers.value.map(num => ({
      ...num,
      chord: chordStore.calculateChord(props.currentKey, num.number, num.quality) || ''
   }))
)

const allChords = computed(() =>
   props.numbers.map(num => ({
      ...num,
      chord: chordStore.calculateChord(props.currentKey, num.number, num.quality) || ''
   }))
)
</script>

<template>
   <div class="p-4 space-y-8">
      <!-- Basic Chords -->
      <div class="space-y-4">
         <h2 class="text-xl font-semibold text-gray-100">Most Common Chord Types</h2>
         <div class="flex flex-wrap gap-4">
            <div
               v-for="item in diatonicChords"
               :key="item.number"
               class="bg-white rounded-lg shadow p-4 text-center w-24 h-36 cursor-pointer hover:scale-105 transition-transform"
               @click="emit('select-number', item)"
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
               class="bg-white rounded-lg shadow p-4 text-center w-24 h-36 cursor-pointer hover:scale-105 transition-transform"
               @click="emit('select-number', item)"
            >
               <div class="text-2xl font-bold text-purple-600">{{ item.number }}</div>
               <div v-show="item.chord" class="text-lg text-gray-600">{{ item.chord }}</div>
               <div v-show="item.quality" class="text-sm text-gray-400">{{ item.quality }}</div>
            </div>
         </div>
      </div>
   </div>
</template>