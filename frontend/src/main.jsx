import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ProductList from './List.jsx'
import ProductDetail from './Detail.jsx'
import CheckoutCart from './Cart.jsx'
import QueryList from './Query.jsx'
import EsewaPaymentForm from './components/payment.jsx'
import RegistrationForm from './Register.jsx'
import LoginForm from './Login.jsx'
import AccountPage from './Account.jsx'
import PlaceOrderComponent from './Order.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import List from './List.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/list/",
    element: <ProductList/>,
  },
  {path:"/product/:id",
   element:<ProductDetail/>
  },
  {
    path:"/cart/",
    element:<CheckoutCart/>
  },
  {
    path:"/payment/",
    element:<EsewaPaymentForm/>
  },
  {
    path:"/query/",
    element:<QueryList/>
  },
  {
    path:"/register/",
    element:<RegistrationForm/>
  },
  {
    path:"/login/",
    element:<LoginForm/>
  },
  {
    path:"/account/",
    element:<AccountPage/>
  },
  {
    path:"/order/",
    element:<PlaceOrderComponent/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
