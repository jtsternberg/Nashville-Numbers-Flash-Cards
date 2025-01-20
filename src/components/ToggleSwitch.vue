<script setup>
defineProps({
   modelValue: {
      type: Boolean,
      required: true
   },
   label: {
      type: String,
      required: true
   }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
   <div class="flex items-center justify-between">
      <label class="text-sm text-purple-900/80">{{ label }}</label>
      <button
         class="relative inline-flex items-center h-6 rounded-full w-11"
         :class="modelValue ? 'bg-purple-500' : 'bg-white/60'"
         @click="emit('update:modelValue', !modelValue)"
      >
         <span
            class="inline-block w-4 h-4 transform transition-transform rounded-full"
            :class="modelValue ? 'bg-white translate-x-6' : 'bg-purple-500 translate-x-1'"
         />
      </button>
   </div>
</template>