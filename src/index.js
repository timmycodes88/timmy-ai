import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import router from "./Router"
import { RouterProvider } from "react-router-dom"
import Loading from "./components/Loading"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="bg-zinc-800 w-screen h-screen flex justify-center items-center">
          <Loading />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
)
