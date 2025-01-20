<script setup>
import { computed } from 'vue'
import { calculateChord } from '../utils/chordUtils'

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

const chords = computed(() =>
   props.numbers.map(num => ({
      ...num,
      chord: calculateChord(props.currentKey, num.number, num.quality)
   }))
)
</script>

<template>
   <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <div
         v-for="item in chords"
         :key="item.number"
         class="bg-white rounded-lg shadow p-4 text-center"
      >
         <div class="text-2xl font-bold">{{ item.number }}</div>
         <div class="text-lg text-gray-600">{{ item.chord }}</div>
      </div>
   </div>
</template>