import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home'
import Connexion from './routes/Connexion'
import AddMusic from './routes/AddMusic'
import ModifyMusic from './routes/ModifyMusic'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Connexion />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/add-music',
    element: <AddMusic />
  },
  {
    path: '/modify-music/:id',
    element: <ModifyMusic />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
