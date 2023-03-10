import { createBrowserRouter, redirect } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import voiceLoader, { speak } from "./utils/voiceLoader"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>ERROR</div>,
    children: [
      {
        index: true,
        loader: voiceLoader,
        action: speak,
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
