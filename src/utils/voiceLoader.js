import axios from "axios"

let VOICE_ID = null

const voiceLoader = async () => {
  const { data } = await axios({
    method: "get",
    url: "https://api.elevenlabs.io/v1/voices",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": process.env.REACT_APP_XI_API_KEY,
    },
  })
  VOICE_ID = data.voices.find(voice => voice.name === "First try").voice_id
  return null
}

export const speak = async ({ request }) => {
  const formData = await request.formData()
  const text = formData.get("text")
  const { data } = await axios({
    method: "post",
    url: "https://api.elevenlabs.io/v1/text-to-speech/" + VOICE_ID,
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": process.env.REACT_APP_XI_API_KEY,
    },
    data: {
      text,
    },
  })
  // console.log("data", data)
  // const audio = new Audio()
  // audio.src = URL.createObjectURL(new Blob(['data:audio/mpeg;base64,'], { type: "audio/mpeg" }))
  // audio.play()

  return null
}

export default voiceLoader
