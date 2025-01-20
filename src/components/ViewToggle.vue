<script setup>
const props = defineProps({
   isCheatSheet: {
      type: Boolean,
      required: true
   }
})

const emit = defineEmits(['toggle'])
</script>

<template>
   <div class="flex justify-center mb-6">
      <button
         class="btn btn-primary"
         @click="emit('toggle')"
         :aria-pressed="isCheatSheet"
      >
         {{ isCheatSheet ? 'Show Flashcards' : 'Show Cheat Sheet' }}
      </button>
   </div>
</template>