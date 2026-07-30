import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home'
import ScreenLoader from './Components/Common/screenLoader'

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const router = createBrowserRouter([
    {path:'' , element:<Layout/>  , children:[
      {path:'' , element:<Home/>}
    ]}
  ])
  return <>
  {showSplash && <ScreenLoader onComplete={() => setShowSplash(false)} />}
  <RouterProvider router={router}/>
  </>
}
