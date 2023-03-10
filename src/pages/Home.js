import React, { useRef, useState, useEffect } from "react"
import Loading from "../components/Loading"
import tw, { styled } from "twin.macro"
import useOpenAI from "../hooks/useOpenAI"
import { useSubmit } from "react-router-dom"
import SyntaxHighlighter from "react-syntax-highlighter"
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs"

export default function Home() {
  const submit = useSubmit()

  const { responses, loading, error, generate, resetResponses } = useOpenAI()

  const [prompt, setPrompt] = useState("")

  const [focused, setFocused] = useState(false)

  const inputRef = useRef()
  const scrollToRef = useRef()
  const loadingRef = useRef()

  const handleGo = () => {
    if (!prompt) return
    generate(prompt)
    setPrompt("")
  }
  const handleEnter = e => e.key === "Enter" && handleGo()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollToRef.current)
        scrollToRef.current.scrollIntoView({ behavior: "smooth" })

      if (responses[responses.length - 1].role === "user") return
      submit(
        { text: responses[responses.length - 1].content },
        { method: "post" }
      )
    }, 100)
    return () => clearTimeout(timeout)
  }, [responses, submit])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loadingRef.current)
        loadingRef.current.scrollIntoView({ behavior: "smooth" })
    }, 100)
    return () => clearTimeout(timeout)
  }, [loading])

  return (
    <Wrapper>
      <Conversation>
        <Title onClick={resetResponses}>Reset</Title>
        <History>
          <Spacer />
          {responses.map(({ role, content }, index) => {
            const lastMessage = index + 1 === responses.length
            const message = content.split("```")
            console.log("message", message)
            return (
              <>
                <Message
                  myMessage={role === "user"}
                  ref={lastMessage ? scrollToRef : undefined}
                >
                  {message.map((text, index) => {
                    if (index % 2 === 0) {
                      return text
                    } else {
                      let language = "javascript"
                      if (text.includes("python")) language = "python"
                      else if (text.includes("json")) language = "json"
                      else if (text.includes("html")) language = "html"
                      return (
                        <CodeWrapper>
                          <SyntaxHighlighter
                            language={language}
                            style={anOldHope}
                          >
                            {text}
                          </SyntaxHighlighter>
                        </CodeWrapper>
                      )
                    }
                  })}
                </Message>
              </>
            )
          })}

          {loading && <Loading ref={loadingRef} />}
          {error && <ErrorText>An Unexpected Error occured</ErrorText>}
        </History>
      </Conversation>
      <FormContainer focused={focused}>
        <Input
          ref={inputRef}
          enterKeyHint="send"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={prompt}
          onKeyDown={handleEnter}
          placeholder="Chat with me..."
          onChange={e => setPrompt(e.target.value)}
        ></Input>
      </FormContainer>
    </Wrapper>
  )
}

// Wrapper Styles
const Wrapper = tw.div`h-full`
const Spacer = tw.div`h-screen`
const Title = tw.button`text-2xl text-center bg-zinc-900 flex items-center justify-center p-4 mx-2 mb-2 rounded-xl`

// Form Styles
const FormContainer = styled.div(({ focused }) => [
  tw`fixed bottom-0 left-0 w-full flex justify-center gap-4 bg-zinc-900 p-4 pb-12 rounded-t-2xl`,
  focused && tw`pb-8`,
])
const Input = tw.input`w-full mx-4 p-2 rounded-lg text-zinc-700`
const Conversation = tw.div`fixed top-[90px] left-0 w-full flex flex-col gap-4 px-4  h-full pb-4`
const History = styled.div(({ focused }) => [
  tw`flex flex-col gap-4 overflow-y-auto px-4 h-[calc(100% - 17.25rem)] `,
  focused && tw`h-[calc(100% - 16.25rem)]`,
])
const Message = styled.div(({ myMessage }) => [
  tw`p-4 rounded-lg whitespace-pre-wrap`,
  myMessage ? tw`bg-zinc-900` : tw`bg-white text-zinc-900`,
])
const ErrorText = tw.p`text-red-500 text-center`

const CodeWrapper = tw.div`rounded-lg overflow-hidden`
