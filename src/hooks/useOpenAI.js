import openai from "../utils/OpenAIConfig"
import { useState } from "react"
import { pretty } from "../utils/pretty"

const intialMessages = [
  {
    role: "system",
    content:
      "You are helpful assistant named Timmai. You are here to help people with their problems. You are also very wise when the question allows for it.",
  },
  { role: "user", content: "" },
  { role: "assistant", content: "" },
]

/**
 * @typedef {Object} OpenAI
 * @property {string[]} responses - Array of responses
 * @property {boolean} loading - Loading state
 * @property {boolean} error - Error state
 * @property {() => void} resetResponses - Reset responses
 * @property {(prompt: string) => void} generate - Generate response
 *
 * @description Hook to use Open AI Chat Bot
 * @returns {OpenAI}
 */
export default function useOpenAI() {
  //* Responses State
  const [responses, setResponses] = useState([
    { role: "assistant", content: "Hello, I am Timmai." },
  ])

  //* Loading & Error State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  //* Reset Responses
  const resetResponses = () => {
    setError(false)
    setLoading(false)
    setResponses([{ role: "assistant", content: "Hello, I am Timmai." }])
  }
  //* Get Responses
  const generate = async prompt => {
    if (!prompt) return
    setLoading(true)
    setError(false)
    const messages = [...responses, { role: "user", content: pretty(prompt) }]
    setResponses(messages)
    try {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [...intialMessages, ...messages],
        temperature: 0.7,
        max_tokens: 2048,
      })
      const response = res.data.choices[0].message

      setResponses(curr => [...curr, response])
      setLoading(false)
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  return { responses, loading, error, resetResponses, generate }
}
