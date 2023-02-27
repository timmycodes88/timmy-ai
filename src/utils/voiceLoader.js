let VOICE_NAME = "Reed"
let VOICES = []
let VOICE

const voiceLoader = async () => {
  const { voice, voices } = await new Promise(resolve => {
    const timeout = setTimeout(() => resolve({ voice: null, voices: [] }), 5000)
    const voices = window.speechSynthesis.getVoices()
    if (voices.length) resolve(findVoice(voices))
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices()
      clearTimeout(timeout)
      resolve(findVoice(voices))
    }
  })
  VOICES = voices
  return { voice: VOICE || voice, names: voices.map(v => v.name) }
}

const findVoice = voices => {
  let voice = voices.find(voice => voice.name === VOICE_NAME) || voices[0]
  console.log(voice)
  return { voice: voice, voices }
}

export const changeVoice = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())
  VOICES.forEach(v => {
    if (v.name === data.name) VOICE_NAME = v.name
  })
  return null
}
export default voiceLoader
