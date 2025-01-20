// Separate sharp and flat notations based on the chart
const sharpKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#']
const flatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']

const sharpNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const flatNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

export function calculateChord(key, number, quality) {
   // Determine whether to use sharp or flat notation
   const useSharpNotation = sharpKeys.includes(key)
   const noteOrder = useSharpNotation ? sharpNotes : flatNotes

   const keyIndex = noteOrder.findIndex(note => note === key)
   if (keyIndex === -1) return '' // Invalid key

   // Calculate the chord note index based on the Nashville number
   const interval = parseInt(number) - 1
   const chordIndex = (keyIndex + interval) % 12

   // Get the chord note
   const chordNote = noteOrder[chordIndex]

   // Add the quality suffix
   const suffix = quality === 'major' ? '' :
                 quality === 'minor' ? 'm' :
                 quality === 'diminished' ? 'dim' : ''

   return `${chordNote || ''}${suffix || ''}`
}
