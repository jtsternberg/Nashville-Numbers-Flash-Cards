<script setup>
import { ref, computed } from 'vue'
import { useChordStore } from '../stores/chords'

const props = defineProps({
   number: {
      type: Object,
      required: true
   },
   currentKey: {
      type: String,
      required: true
   },
   cardClasses: {
      type: Object,
      default: () => ({})
   }
})

const isFlipped = ref(false)
const chordStore = useChordStore()

const chord = computed(() =>
   chordStore.calculateChord(props.currentKey, props.number.number, props.number.quality)
)

function toggleFlip() {
   isFlipped.value = !isFlipped.value
}

// Expose the toggleFlip method to the parent component
defineExpose({ toggleFlip })
</script>

<template>
   <div
      class="w-full max-w-sm col-span-2 md:col-span-1 aspect-[3/4] short:aspect-[9/10] perspective-1000 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded-2xl order-1 md:order-none mx-auto"
      :class="[
         { 'is-flipped': isFlipped },
         cardClasses
      ]"
      @click="toggleFlip"
      @keydown.enter="toggleFlip"
      @keydown.space.prevent="toggleFlip"
      tabindex="0"
      role="button"
      :aria-label="`Flashcard for number ${number.number}. Press Enter or Space to flip.`"
      :aria-pressed="isFlipped"
   >
      <div class="relative w-full h-full transition-transform duration-600 transform-style-preserve-3d">
         <div
            class="absolute w-full h-full flex flex-col items-center justify-center rounded-2xl bg-purple-300 text-purple-900 shadow-xl backface-hidden"
            aria-hidden="isFlipped"
         >
            <div class="text-6xl font-bold">{{ number.number }}</div>
         </div>
         <div
            class="absolute w-full h-full flex flex-col items-center justify-center rounded-2xl bg-purple-100 shadow-xl backface-hidden rotate-y-180"
            aria-hidden="!isFlipped"
         >
            <div class="text-6xl font-bold text-purple-600 mb-2">{{ chord }}</div>
            <div class="text-base text-gray-500">{{ number.quality }}</div>
         </div>
      </div>
   </div>
</template>

<style>
.perspective-1000 {
   perspective: 1000px;
}

.transform-style-preserve-3d {
   transform-style: preserve-3d;
}

.backface-hidden {
   backface-visibility: hidden;
   -webkit-backface-visibility: hidden;
}

.rotate-y-180 {
   transform: rotateY(180deg);
}

.is-flipped .transform-style-preserve-3d {
   transform: rotateY(180deg);
}

/* Focus styles */
.focus:outline-none:focus-visible {
   @apply ring-2 ring-purple-500 ring-offset-2;
}
</style>
