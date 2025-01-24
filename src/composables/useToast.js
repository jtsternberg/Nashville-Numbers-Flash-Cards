import { ref } from 'vue'

const isVisible = ref(false)
const message = ref('')
let timeout = null

export function useToast() {
   function show(msg, duration = 3000) {
      message.value = msg
      isVisible.value = true

      if (timeout) {
         clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
         isVisible.value = false
      }, duration)
   }

   return {
      isVisible,
      message,
      show
   }
}