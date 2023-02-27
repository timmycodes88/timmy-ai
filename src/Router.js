import { createBrowserRouter, redirect } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import voiceLoader, { changeVoice } from "./utils/voiceLoader"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: voiceLoader,
        action: changeVoice,
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    loader: () => redirect("/"),
  },
])

export default router
