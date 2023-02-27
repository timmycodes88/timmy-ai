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
    if (bestVoice) return
    if (voice.name === "Rocko") bestVoice = voice
    else if (voice.name === "Google UK English Male") {
      bestVoice = voice
    }
  })
  return { voice: bestVoice, names }
}
export default voiceLoader
