<script setup>
import { useShare } from '../composables/useShare'
import { useToast } from '../composables/useToast'

const props = defineProps({
   fullWidth: {
      type: Boolean,
      default: false
   }
})

const { canShare, share, shareIcon } = useShare()
const { show: showToast } = useToast()

async function handleShare() {
   if (canShare.value) {
      await share()
      return
   }

   try {
      await navigator.clipboard.writeText(window.location.href)
      showToast('Link copied to clipboard!')
   } catch (error) {
      console.error('Error copying to clipboard:', error)
      showToast('Failed to copy link')
   }
}
</script>

<template>
   <button
      @click="handleShare"
      class="px-4 py-2 bg-purple-300 opacity-80 hover:opacity-100 text-purple-900 rounded-lg transition-colors flex items-center gap-2 border border-purple-200"
      :class="{ 'w-full justify-center': fullWidth }"
   >
      <span class="material-icons text-sm">{{ canShare ? shareIcon : 'content_copy' }}</span>
      <span>{{ canShare ? 'Share App' : 'Copy Link' }}</span>
   </button>
</template>