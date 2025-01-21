/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         screens: {
            'tall': { 'raw': '(min-height: 880px)' },
            'short': { 'raw': '(max-height: 880px)' },
         },
         animation: {
            'flip': 'flip 0.6s ease-in-out',
         },
         keyframes: {
            flip: {
               '0%': { transform: 'rotateY(0deg)' },
               '100%': { transform: 'rotateY(180deg)' },
            }
         }
      },
   },
   plugins: [],
}