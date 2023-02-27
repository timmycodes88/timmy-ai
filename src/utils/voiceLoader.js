let VOICE
let VOICES

const voiceLoader = async () => {
  function getVoices() {
    return new Promise(resolve => {
      const synth = window.speechSynthesis
      if (VOICES?.length) {
        resolve(findVoice(VOICES))
      } else {
        synth.onvoiceschanged = () => {
          resolve(findVoice(synth.getVoices()))
        }
      }
    })
  }

  const { voice, voices } = await getVoices()
  VOICES = voices
  return { voice, names: voices.map(v => v.name) }
}

const findVoice = voices => {
  let voice = voices.find(voice => voice.name === VOICE) || voices[0]

  return { voice, voices }
}

export const changeVoice = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData.entries())
  VOICES.forEach(v => {
    if (v.name === data.name) VOICE = v.name
  })
  console.log(VOICE)
  return null
}
export default voiceLoader
