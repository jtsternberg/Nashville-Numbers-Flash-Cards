<script setup>
import { ref } from 'vue'
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
      class="flashcard"
      :class="{ 'is-flipped': isFlipped }"
      @click="toggleFlip"
   >
      <div class="flashcard-inner">
         <div class="flashcard-front">
            <div class="number">{{ number.number }}</div>
         </div>
         <div class="flashcard-back">
            <div class="chord">{{ chord }}</div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.flashcard {
   width: 280px;
   height: 400px;
   perspective: 1000px;
   margin: 0 auto;
   cursor: pointer;
}

.flashcard-inner {
   position: relative;
   width: 100%;
   height: 100%;
   text-align: center;
   transition: transform 0.6s;
   transform-style: preserve-3d;
   box-shadow: 0 4px 8px rgba(0,0,0,0.1);
   border-radius: 10px;
}

.flashcard.is-flipped .flashcard-inner {
   transform: rotateY(180deg);
}

.flashcard-front, .flashcard-back {
   position: absolute;
   width: 100%;
   height: 100%;
   backface-visibility: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 10px;
   background: white;
}

.flashcard-back {
   transform: rotateY(180deg);
}

.number, .chord {
   font-size: 4rem;
   font-weight: bold;
}

/* Optional: Add different colors for front/back */
.flashcard-front {
   background-color: #f8f9fa;
}

.flashcard-back {
   background-color: #e9ecef;
}
</style>