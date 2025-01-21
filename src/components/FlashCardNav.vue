<script setup>
defineProps({
   disabled: {
      type: Boolean,
      default: false
   }
})

defineEmits(['next', 'previous'])
</script>

<template>
   <div class="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-4 px-4">
      <!-- Previous button -->
      <button
         class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed md:order-none order-2 md:col-auto col-start-1 justify-self-start md:justify-self-auto"
         @click="$emit('previous')"
         :disabled="disabled"
      >
         <span class="material-icons">arrow_back</span>
      </button>

      <!-- Card -->
      <slot/>

      <!-- Next button -->
      <button
         class="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed md:order-none order-2 md:col-auto col-start-2 justify-self-start md:justify-self-auto"
         @click="$emit('next')"
         :disabled="disabled"
      >
         <span class="material-icons">arrow_forward</span>
      </button>
   </div>
</template>