<script setup>
import { ref, computed } from 'vue'
import { calculateChord } from '../utils/chordUtils'

const props = defineProps({
   number: {
      type: Object,
      required: true
   },
   currentKey: {
      type: String,
      required: true
   }
})

const isFlipped = ref(false)

const chord = computed(() =>
   calculateChord(props.currentKey, props.number.number, props.number.quality)
)

function toggleFlip() {
   isFlipped.value = !isFlipped.value
}
</script>

<template>
   <div
      class="w-72 h-96 perspective-1000 mx-auto cursor-pointer select-none"
      :class="{ 'is-flipped': isFlipped }"
      @click="toggleFlip"
      role="button"
      tabindex="0"
      :aria-label="`Flashcard showing ${isFlipped ? chord : number.number}. Click to ${isFlipped ? 'show number' : 'show chord'}`"
      @keydown.space.prevent="toggleFlip"
   >
      <div class="relative w-full h-full transition-transform duration-600 transform-style-preserve-3d">
         <div
            class="absolute w-full h-full flex items-center justify-center rounded-xl bg-white shadow-lg"
            :class="{ 'backface-hidden': true }"
            aria-hidden="isFlipped"
         >
            <div class="text-6xl font-bold text-indigo-600">{{ number.number }}</div>
         </div>
         <div
            class="absolute w-full h-full flex items-center justify-center rounded-xl bg-white shadow-lg transform rotate-y-180"
            :class="{ 'backface-hidden': true }"
            aria-hidden="!isFlipped"
         >
            <div class="text-5xl font-bold text-gray-700">{{ chord }}</div>
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
}

.rotate-y-180 {
   transform: rotateY(180deg);
}

.is-flipped .transform-style-preserve-3d {
   transform: rotateY(180deg);
}

/* Focus styles */
.focus:outline-none:focus-visible {
   @apply ring-2 ring-indigo-500 ring-offset-2;
}
</style>