import { createBrowserRouter, redirect } from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
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
