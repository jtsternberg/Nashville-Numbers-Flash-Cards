<script setup>
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

</script>

<template>
   <div class="absolute top-4 left-4 flex flex-row gap-2 text-2xl font-bold">
      <CardIcon :model-value="model" size="small" />
      <slot/>
   </div>
   <div class="absolute bottom-4 right-4 flex flex-row gap-2 text-2xl font-bold rotate-180">
      <CardIcon :model-value="model" size="small" />
      <slot/>
   </div>
</template>