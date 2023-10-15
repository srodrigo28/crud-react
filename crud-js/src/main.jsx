import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Condominio } from './views/Condominio'
import { Users } from './views/Users'
import { Register } from './views/Register'
import { Login } from './views/Login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
      
      { path: "/condominio", element: <Condominio /> },
      { path: "/users", element: <Users /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
