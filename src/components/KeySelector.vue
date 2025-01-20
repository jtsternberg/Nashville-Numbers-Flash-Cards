<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
   keys: {
      type: Array,
      required: true
   },
   currentKey: {
      type: String,
      required: true
   }
})

const emit = defineEmits(['select-key'])
</script>

<template>
   <div class="flex flex-wrap gap-2 justify-center mb-6">
      <button
         v-for="key in keys"
         :key="key"
         @click="emit('select-key', key)"
         :class="[
            'btn',
            currentKey === key
               ? 'bg-indigo-600 text-white'
               : 'bg-gray-100 hover:bg-gray-200'
         ]"
         :aria-pressed="currentKey === key"
      >
         {{ key }}
      </button>
   </div>
</template>