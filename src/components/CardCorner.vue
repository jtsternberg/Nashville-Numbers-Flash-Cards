<script setup>
import { computed } from 'vue'
import CardIcon from './CardIcon.vue'

const model = defineModel({
   type: String,
   required: true
})

const props = defineProps({
   size: {
      type: String,
      default: 'normal' // 'normal' or 'small'
   }
})

const classNames = computed(() => [
   props.size === 'small' ? 'text-lg tall:text-2xl' : 'text-4xl tall:text-6xl',
])

</script>

<template>
   <div class="absolute top-4 left-4 flex flex-col justify-center items-center font-bold" :class="classNames">
      <span class="font-mono"><slot/></span>
      <CardIcon :model-value="model" :size="props.size" />
   </div>
   <div class="absolute bottom-4 right-4 flex flex-col justify-center items-center font-bold rotate-180" :class="classNames">
      <span class="font-mono"><slot/></span>
      <CardIcon :model-value="model" :size="props.size" />
   </div>
</template>