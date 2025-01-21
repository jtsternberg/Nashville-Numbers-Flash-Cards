<script setup>
import { ref } from 'vue'
import FlashCard from './FlashCard.vue'
import FlashCardNav from './FlashCardNav.vue'

const props = defineProps({
   currentKey: {
      type: String,
      required: true
   },
   number: {
      type: Object,
      required: true
   },
   cardClasses: {
      type: Object,
      default: () => ({})
   },
   currentNumber: {
      type: Number,
      required: true
   },
   totalNumbers: {
      type: Number,
      required: true
   }
})

const flashCardRef = ref(null)

defineExpose({ flashCardRef })
</script>

<template>
   <div class="flashcard-view w-full">
      <div class="text-center my-2 text-white text-2xl current-key">Key of {{ currentKey }}</div>

      <FlashCardNav @next="$emit('next')" @previous="$emit('previous')">
         <FlashCard
            :number="number"
            :current-key="currentKey"
            :card-classes="cardClasses"
            ref="flashCardRef"
            @next="$emit('next')"
            @previous="$emit('previous')"
         />
      </FlashCardNav>

      <div class="progress mt-4 text-white text-center">
         {{ currentKey }}, {{ currentNumber + 1 }}/{{ totalNumbers }}
      </div>
   </div>
</template>