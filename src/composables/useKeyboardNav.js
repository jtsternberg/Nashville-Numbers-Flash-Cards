import { onMounted, onUnmounted } from 'vue'

export function useKeyboardNav(handlers) {
   const handleKeydown = (event) => {
      switch (event.key) {
         case ' ':
         case 'Space':
            handlers.toggleFlip?.()
            break
         case 'ArrowLeft':
            handlers.previous?.()
            break
         case 'ArrowRight':
            handlers.next?.()
            break
      }
   }

   onMounted(() => {
      window.addEventListener('keydown', handleKeydown)
   })

   onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown)
   })
}