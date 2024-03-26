import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './pages/loginPage.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import ProductDetail from './pages/productdetail.jsx'
import { Page404 } from './components/page404.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/products/:string/:slug",
    element:<ProductDetail/>
  },
  {
    path:"*",
    element:<Page404/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
