const noteOrder = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']

export function calculateChord(key, number, quality) {
   // Find the root note index
   const keyIndex = noteOrder.findIndex(note => note === key)
   if (keyIndex === -1) return ''

   // Calculate the chord note index based on the Nashville number
   const interval = parseInt(number) - 1
   const chordIndex = (keyIndex + interval) % 12

   // Get the chord note
   const chordNote = noteOrder[chordIndex]

   // Add the quality suffix
   const suffix = quality === 'major' ? '' :
                 quality === 'minor' ? 'm' :
                 quality === 'diminished' ? 'dim' : ''

   return `${chordNote}${suffix}`
}