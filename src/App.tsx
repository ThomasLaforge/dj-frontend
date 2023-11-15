import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home'
import Connexion from './routes/Connexion'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Connexion />
  },
  {
    path: '/home',
    element: <Home />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
