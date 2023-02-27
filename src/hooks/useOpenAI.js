import openai from "../utils/OpenAIConfig"
import { useState } from "react"
import { pretty } from "../utils/pretty"

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
  const [responses, setResponses] = useState(["Timmai: Hi, I am Timmai!"])

  //* Loading & Error State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  //* Reset Responses
  const resetResponses = () => {
    setError(false)
    setLoading(false)
    setResponses(["Timmai: Hi, I am Timmai!"])
  }
  //* Get Responses
  const generate = async prompt => {
    if (!prompt) return
    setLoading(true)
    setError(false)
    setResponses(curr => [...curr, "Me: " + prompt])
    try {
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: pretty(prompt),
        temperature: 0.7,
        max_tokens: 2048,
      })
      const response = res.data.choices[0].text

      setResponses(curr => [...curr, "Timmy: " + response])
      setLoading(false)
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  return { responses, loading, error, resetResponses, generate }
}
