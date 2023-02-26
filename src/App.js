import { Outlet } from "react-router-dom"
import tw from "twin.macro"

function App() {
  return (
    <Wrapper>
      <NavBar>
        <Title>Timmy AI</Title>
      </NavBar>

      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  )
}

export default App

const Wrapper = tw.div`fixed w-screen h-screen bg-zinc-800`
const Title = tw.h1`text-4xl text-white`
const NavBar = tw.nav`flex items-center  px-10 py-5 bg-zinc-900`
const Content = tw.div`mx-auto max-w-7xl mt-4 h-full text-white`
