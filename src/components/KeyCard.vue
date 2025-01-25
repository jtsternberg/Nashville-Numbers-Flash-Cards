<script setup>
import { ref } from 'vue'
import { useChordStore } from '../stores/chords'
import CardIcon from './CardIcon.vue'

const model = defineModel({
   type: String,
   required: true
})

const props = defineProps({
   isSelected: {
      type: Boolean,
      default: false
   }
})

const emit = defineEmits(['select'])
const chordStore = useChordStore()

// Animation states

function handleClick() {
   if (!props.isSelected) {
      emit('select')
   }
}
</script>

<template>
   <div
      class="relative cursor-pointer transition-all duration-300 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded-xl p-4 -m-3 overflow-visible"
      @click="handleClick"
      @keydown.enter="handleClick"
      @keydown.space.prevent="handleClick"
      tabindex="0"
      role="button"
      :aria-label="`Select key ${model}`"
      :aria-pressed="isSelected"
   >
      <!-- Card container -->
      <div
         class="w-20 h-28 tall:w-24 tall:h-36 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-purple-900 to-purple-950"
         :class="[
            isSelected
               ? 'ring-2 ring-purple-400 -translate-y-1 shadow-2xl'
               : '',
         ]"
      >
         <!-- Card content -->
         <div class="w-full h-full p-3 relative">
            <!-- Top key indicator -->
            <span
               class="absolute top-2 left-2 text-l font-bold font-mono"
               :class="isSelected ? 'text-purple-200' : 'text-purple-300'"
            >{{ model }}</span>

            <!-- Center symbol -->
            <div
               class="absolute inset-0 flex items-center justify-center"
               :class="isSelected ? 'text-purple-200' : 'text-purple-300'"
            >
               <CardIcon :model-value="model" />
            </div>

            <!-- Bottom key indicator -->
            <span
               class="absolute bottom-2 right-2 text-l font-bold rotate-180 font-mono"
               :class="isSelected ? 'text-purple-200' : 'text-purple-300'"
            >{{ model }}</span>
         </div>
      </div>
   </div>
</template>

<style scoped>
.relative {
   perspective: 1000px;
}
</style>