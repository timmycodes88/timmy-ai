import React, { useRef, useState, useEffect } from "react"
import Loading from "../components/Loading"
import tw, { styled } from "twin.macro"
import useOpenAI from "../hooks/useOpenAI"

export default function Home() {
  const { responses, loading, error, generate, resetResponses } = useOpenAI()

  const [prompt, setPrompt] = useState("")

  const [focused, setFocused] = useState(false)

  const inputRef = useRef()
  const scrollToRef = useRef()
  const loadingRef = useRef()

  const handleGo = () => {
    if (!prompt) return
    inputRef.current.blur()
    setFocused(false)
    generate(prompt)
    setPrompt("")
  }
  const handleEnter = e => e.key === "Enter" && handleGo()

  useEffect(() => {
    if (!loading && scrollToRef.current)
      scrollToRef.current.scrollIntoView({ behavior: "smooth" })
  }, [loading])
  useEffect(() => {
    if (scrollToRef.current)
      scrollToRef.current.scrollIntoView({ behavior: "smooth" })
  }, [prompt])

  return (
    <Wrapper>
      <Title onClick={resetResponses}>Chat with Timmy</Title>
      <History>
        {responses.map((text, index) => {
          const lastMessage = index + 1 === responses.length
          const myMessage = text.includes("Me:")
          return (
            <Message
              myMessage={myMessage}
              ref={lastMessage ? scrollToRef : undefined}
            >
              {text}
            </Message>
          )
        })}
        {loading && <Loading ref={loadingRef} />}
        {error && <ErrorText>An Unexpected Error occured</ErrorText>}
      </History>
      <FormContainer focused={focused}>
        <Input
          ref={inputRef}
          onFocus={() => setFocused(true)}
          value={prompt}
          onKeyDown={handleEnter}
          placeholder="Chat with me..."
          onChange={e => setPrompt(e.target.value)}
        ></Input>
        <Button onClick={handleGo}>Go!</Button>
      </FormContainer>
    </Wrapper>
  )
}

// Wrapper Styles
const Wrapper = tw.div`h-full`
const Title = tw.h1`text-3xl text-center pb-4`

// Form Styles
const FormContainer = styled.div(({ focused }) => [
  tw`absolute bottom-0 left-0 w-full flex justify-center gap-4 bg-zinc-900 p-4 pb-12`,
  focused && tw`pb-4`,
])
const Input = tw.input`w-[24rem] p-2 rounded-lg text-zinc-700`
const Button = tw.button`bg-zinc-700 px-2 rounded-lg`
const History = tw.div`flex flex-col gap-4 overflow-y-auto px-4 h-[calc(100% - 16.25rem)] `
const Message = styled.div(({ myMessage }) => [
  tw`p-4 rounded-lg`,
  myMessage ? tw`bg-zinc-900` : tw`bg-white text-zinc-900`,
])
const ErrorText = tw.p`text-red-500 text-center`
