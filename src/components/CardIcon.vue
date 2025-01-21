<script setup>
import { computed } from 'vue'
import { useChordStore } from '../stores/chords'

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

const chordStore = useChordStore()
const icon = computed(() => model.value ? chordStore.getKeyIcon(model.value) : null)
</script>

<template>
   <div class="flex items-center justify-center gap-1">
      <template v-for="(iconItem, index) in icon" :key="iconItem">
         <span
            class="material-icons"
            :class="[
               size === 'small' ? 'text-lg tall:text-2xl' : 'text-3xl tall:text-4xl',
               icon.length > 1 && size === 'normal' ? 'text-lg tall:text-2xl' : ''
            ]"
         >{{ iconItem }}</span>
         <span
            v-if="index < icon.length - 1"
            class="text-xl tall:text-2xl font-light"
         >/</span>
      </template>
   </div>
</template>