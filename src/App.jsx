import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Pages/Home'

export default function App() {

  const router = createBrowserRouter([
    {path:'' , element:<Layout/>  , children:[
      {path:'' , element:<Home/>}
    ]}
  ])
  return <>
  <RouterProvider router={router}/>
  </>
}
