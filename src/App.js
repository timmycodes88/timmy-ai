import { Suspense, useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import tw, { styled, css } from "twin.macro"
import Loading from "./components/Loading"

const colors = [
  "red",
  "dodgerblue",
  "lime",
  "yellow",
  "magenta",
  "darkturquoise",
]

function App() {
  const [colorIndex, setColorIndex] = useState(0)
  useEffect(() => {
    let interval
    interval = setInterval(() => {
      setColorIndex(curr => (curr + 1) % colors.length)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <Wrapper>
      <NavBar>
        <Title color={colors[colorIndex]}>Timmai</Title>
      </NavBar>

      <Content>
        <Suspense
          fallback={
            <div className="bg-zinc-800 w-screen h-screen flex justify-center items-center">
              <Loading />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </Content>
    </Wrapper>
  )
}

export default App

const Wrapper = tw.div`fixed w-screen h-screen bg-zinc-800`
const Title = styled.h1(({ color }) => [
  tw`text-4xl text-white`,
  color &&
    css`
      color: ${color};
    `,
])
const NavBar = tw.nav`fixed left-0 top-0 w-full flex items-center px-10 py-5 bg-zinc-900 rounded-b-2xl`
const Content = tw.div`mx-auto max-w-7xl mt-4 h-full text-white`
