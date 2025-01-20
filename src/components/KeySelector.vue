<script setup>
import KeyCard from './KeyCard.vue'

defineProps({
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
   <div class="flex overflow-x-auto overflow-y-visible gap-1 py-8 px-4 min-h-[12rem]">
      <KeyCard
         v-for="key in keys"
         :key="key"
         :model-value="key"
         :is-selected="currentKey === key"
         @update:model-value="$emit('select-key', key)"
         @select="$emit('select-key', key)"
      />
   </div>
</template>

<style scoped>
.flex {
   -webkit-overflow-scrolling: touch;
   scrollbar-width: none; /* Firefox */
   position: relative;
   z-index: 0;
}

.flex::-webkit-scrollbar {
   display: none; /* Chrome, Safari */
}
</style>