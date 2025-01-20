<script setup>
import { ref } from 'vue'
const model = defineModel({
   type: String,
   required: true
})

const props = defineProps({
   isSelected: {
      type: Boolean,
      default: false
   }
})

const emit = defineEmits(['select'])

// Animation states
const isMovingToFront = ref(false)
const isSpread = ref(false)

function handleClick() {
   if (!props.isSelected) {
      isMovingToFront.value = true
      setTimeout(() => {
         isSpread.value = true
         emit('select')
      }, 300)
   }
}
</script>

<template>
   <div
      class="relative cursor-pointer transition-all duration-300 shrink-0"
      @click="handleClick"
   >
      <!-- Card container -->
      <div
         class="w-24 h-36 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
         :class="[
            isSelected ? 'ring-2 ring-purple-400 shadow-purple-400/30' : 'hover:shadow-purple-400/20',
            'bg-gradient-to-br from-purple-900 to-purple-950'
         ]"
      >
         <!-- Card content -->
         <div class="w-full h-full p-3 relative">
            <!-- Top key indicator -->
            <span
               class="absolute top-2 left-2 text-l font-bold"
               :class="isSelected ? 'text-purple-200' : 'text-purple-300'"
            >{{ model }}</span>

            <!-- Center symbol -->
            <div
               class="absolute inset-0 flex items-center justify-center"
               :class="isSelected ? 'text-purple-200' : 'text-purple-300'"
            >
               <span class="text-2xl font-bold">{{ model }}</span>
            </div>

            <!-- Bottom key indicator -->
            <span
               class="absolute bottom-2 right-2 text-l font-bold rotate-180"
               :class="isSelected ? 'text-purple-200' : 'text-purple-300'"
            >{{ model }}</span>
         </div>
      </div>
   </div>
</template>

<style scoped>
.relative {
   perspective: 1000px;
}
</style>