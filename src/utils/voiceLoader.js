const voiceLoader = async () => {
  function getVoices() {
    return new Promise(resolve => {
      const synth = window.speechSynthesis
      let voices = synth.getVoices()
      if (voices.length) {
        resolve(findVoice(voices))
      } else {
        synth.onvoiceschanged = () => {
          resolve(findVoice(synth.getVoices()))
        }
      }
    })
  }

  return await getVoices()
}

const findVoice = voices => {
  let names = []
  let bestVoice
  voices.forEach(voice => {
    names.push(voice.name)
    if (voice.name === "Google US English") {
      bestVoice = voice
    }
  })
  return { voice: bestVoice, names }
}
export default voiceLoader
