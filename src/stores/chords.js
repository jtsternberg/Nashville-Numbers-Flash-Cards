import { defineStore } from 'pinia'
import data from '../data/nashville-numbers.json'

export const useChordStore = defineStore('chords', {
	state: () => ({
		data,
	}),

	getters: {
		getKeyIcon: (state) => (key) => {
			const [baseKey, keyModifier] = key.split('/')
			if (baseKey && keyModifier) {
				// If key looks like A#/Bb, we need to split it into A# and Bb, and send back BOTH icons
				console.log({baseKey, keyModifier, icons: [state.data.keyIcons[baseKey], state.data.keyIcons[keyModifier]]})
				return [state.data.keyIcons[baseKey], state.data.keyIcons[keyModifier]]
			}
			return [state.data.keyIcons[key] || 'music_note']
		},

		getChordNote: (state) => (key, number) => {
			// Parse the number to handle special cases like "b3", "#5", etc.
			const parsedNumber = parseInt(number.replace(/[^\d]/g, '')) - 1
			const isFlat = number.includes('b')
			const isSharp = number.includes('#')

			// Get the scale for the current key
			const scale = state.data.keyScales[key]
			if (!scale) return ''

			// For basic numbers (1-7), just return the note from the scale
			if (!isFlat && !isSharp) {
				return scale[parsedNumber]
			}

			// For flats and sharps, we need to find the note and modify it
			const baseNote = scale[parsedNumber]
			if (!baseNote) return ''

			// The scale already contains the correct sharp/flat notes for the key
			// so we just need to adjust based on the modifier
			if (isFlat) {
				// Find the flat note from the scales
				const flatKey = Object.keys(state.data.keyScales).find(k =>
					state.data.keyScales[k].includes(baseNote.replace('#', 'b'))
				)
				return flatKey ? state.data.keyScales[flatKey][parsedNumber] : baseNote
			}

			if (isSharp) {
				// Find the sharp note from the scales
				const sharpKey = Object.keys(state.data.keyScales).find(k =>
					state.data.keyScales[k].includes(baseNote.replace('b', '#'))
				)
				return sharpKey ? state.data.keyScales[sharpKey][parsedNumber] : baseNote
			}

			return baseNote
		},

		calculateChord: (state) => (key, number, quality) => {
			const note = state.getChordNote(key, number)
			if (!note) return ''

			// Add the quality suffix
			const suffix = quality === 'major' ? '' :
			quality === 'minor' ? 'm' :
			//   We don't use diminished chords in this app
			//   quality === 'diminished' ? 'dim' : ''
			''

			return `${note}${suffix}`
		}
	}
})