<script setup>
import { ref, computed } from 'vue'
import { useChordStore } from '../stores/chords'

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
const chordStore = useChordStore()

// Animation states
const isMovingToFront = ref(false)
const isSpread = ref(false)

const icon = computed(() => chordStore.getKeyIcon(model.value))

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
      class="relative cursor-pointer transition-all duration-300 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 rounded-xl p-1"
      @click="handleClick"
      @keydown.enter="handleClick"
      @keydown.space.prevent="handleClick"
      tabindex="0"
      role="button"
      :aria-label="`Select key ${model}`"
      :aria-pressed="isSelected"
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
               class="absolute inset-0 flex items-center justify-center gap-1"
               :class="isSelected ? 'text-purple-200' : 'text-purple-300'"
            >
               <template v-for="(iconItem, index) in icon" :key="iconItem">
                  <span
                     class="material-icons"
                     :class="icon.length > 1 ? 'text-2xl' : 'text-4xl'"
                  >{{ iconItem }}</span>
                  <span
                     v-if="index < icon.length - 1"
                     class="text-2xl font-light"
                  >/</span>
               </template>
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