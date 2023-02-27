let VOICE_NAME = "Rocko"
let VOICES = []

const voiceLoader = async () => {
  await new Promise(resolve => {
    const timeout = setTimeout(() => resolve(), 1000)
    window.speechSynthesis.onvoiceschanged = () => {
      clearTimeout(timeout)
      resolve()
    }
  })

  return null
  const { voice, voices } = await getVoices()
  VOICES = voices
  return { voice, names: voices.map(v => v.name) }
}

async function getVoices() {
  return new Promise(resolve => {
    if (VOICES.length) resolve(findVoice(VOICES))
    const synth = window.speechSynthesis
    synth.onvoiceschanged = () => {
      console.log(findVoice(synth.getVoices()))
      resolve(findVoice(synth.getVoices()))
    }
  })
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
