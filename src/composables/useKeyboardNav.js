import { onMounted, onUnmounted, ref } from 'vue'

export function useKeyboardNav(handlers) {
   let touchStartX = 0
   let touchStartY = 0
   const SWIPE_THRESHOLD = 50 // Minimum distance for a swipe
   const SWIPE_RESTRAINT = 100 // Maximum perpendicular distance for a swipe

   // Track the current swipe position
   const swipeX = ref(0)
   const swipeY = ref(0)
   const isAnimating = ref(false)

   const handleKeydown = (event) => {
      switch (event.key) {
         case ' ':
         case 'Space':
            // Check if a button has focus... if so, don't do anything
            if (document.activeElement.tagName === 'BUTTON') {
               return
            }
            handlers.toggleFlip?.()
            event.preventDefault()
            break
         case 'ArrowLeft':
            animateSwipe('right')
            break
         case 'ArrowRight':
            animateSwipe('left')
            break
      }
   }

   const animateSwipe = async (direction) => {
      isAnimating.value = true
      swipeX.value = direction === 'left' ? -100 : 100

      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 300))

      // Trigger the navigation
      if (direction === 'left') {
         handlers.next?.()
      } else {
         handlers.previous?.()
      }

      // Reset after navigation
      setTimeout(() => {
         swipeX.value = 0
         isAnimating.value = false
      }, 50)
   }

   const handleTouchStart = (event) => {
      if (isAnimating.value) return
      touchStartX = event.touches[0].clientX
      touchStartY = event.touches[0].clientY
   }

   const handleTouchMove = (event) => {
      if (isAnimating.value) return
      const touchCurrentX = event.touches[0].clientX
      const touchCurrentY = event.touches[0].clientY
      const deltaX = touchCurrentX - touchStartX
      const deltaY = touchCurrentY - touchStartY

      // Only update position if more horizontal than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
         swipeX.value = deltaX
         event.preventDefault() // Prevent scrolling while swiping
      }
   }

   const handleTouchEnd = async (event) => {
      if (isAnimating.value) return
      const touchEndX = event.changedTouches[0].clientX
      const touchEndY = event.changedTouches[0].clientY

      const deltaX = touchEndX - touchStartX
      const deltaY = touchEndY - touchStartY

      // Reset positions
      const shouldAnimate = Math.abs(deltaX) >= SWIPE_THRESHOLD &&
                           Math.abs(deltaY) <= SWIPE_RESTRAINT

      if (shouldAnimate) {
         await animateSwipe(deltaX > 0 ? 'right' : 'left')
      } else {
         // Reset without animation if threshold not met
         swipeX.value = 0
         swipeY.value = 0
      }
   }

   onMounted(() => {
      window.addEventListener('keydown', handleKeydown)
      document.querySelector('.flashcard-view').addEventListener('touchstart', handleTouchStart)
      document.querySelector('.flashcard-view').addEventListener('touchmove', handleTouchMove, { passive: false })
      document.querySelector('.flashcard-view').addEventListener('touchend', handleTouchEnd)
   })

   onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown)
      document.querySelector('.flashcard-view').removeEventListener('touchstart', handleTouchStart)
      document.querySelector('.flashcard-view').removeEventListener('touchmove', handleTouchMove)
      document.querySelector('.flashcard-view').removeEventListener('touchend', handleTouchEnd)
   })

   return {
      swipeX,
      swipeY,
      isAnimating
   }
}