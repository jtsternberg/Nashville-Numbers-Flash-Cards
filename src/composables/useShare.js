import { ref, computed } from 'vue'

export function useShare() {
   const canShare = ref('share' in navigator)

   // Detect if user is on iOS/macOS
   const isApplePlatform = computed(() => {
      const platform = navigator.platform || ''
      return /iPhone|iPod|iPad|Mac/.test(platform)
   })

   const shareIcon = computed(() => isApplePlatform.value ? 'ios_share' : 'share')

   async function share() {
      if (!canShare.value) return false

      try {
         await navigator.share({
            title: 'Nashville Numbers',
            text: 'Check out this Nashville Numbers app!',
            url: window.location.href
         })
         return true
      } catch (error) {
         if (error.name !== 'AbortError') {
            console.error('Error sharing:', error)
         }
         return false
      }
   }

   return {
      canShare,
      share,
      shareIcon
   }
}