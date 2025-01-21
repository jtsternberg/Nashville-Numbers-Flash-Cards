<script setup>
import KeyCard from './KeyCard.vue'
import { ref, onMounted } from 'vue'

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

const keyRefs = ref({})

function scrollToKey(key) {
   const element = keyRefs.value[key]
   if (element?.$el) {
      element.$el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
   }
}

// Scroll to initial key on mount
onMounted(() => {
   // Use a small delay to ensure the DOM is fully rendered
   setTimeout(() => {
      scrollToKey(props.currentKey)
   }, 100)
})

defineExpose({ scrollToKey })
</script>

<template>
   <div class="overflow-x-auto py-4 hide-scrollbar">
      <div class="flex gap-2 px-4">
         <!-- <div
            v-for="key in keys"
            :key="key"
            :ref="el => keyRefs[key] = el"
            class="key-card flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-lg font-semibold cursor-pointer transition-all duration-300"
            :class="[
               currentKey === key
                  ? 'bg-white text-purple-600 shadow-lg scale-110'
                  : 'bg-white/10 text-white hover:bg-white/20'
            ]"
            @click="$emit('select-key', key)"
         >
            {{ key }}
         </div> -->

         <KeyCard
            v-for="key in keys"
            :key="key"
            :ref="el => keyRefs[key] = el"
            :model-value="key"
            :is-selected="currentKey === key"
            @select="() => $emit('select-key', key)"
         />
      </div>
   </div>
</template>

<style scoped>
.hide-scrollbar {
   -ms-overflow-style: none;
   scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
   display: none;
}
</style>