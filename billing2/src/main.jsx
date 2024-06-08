import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './pages/Dashboard.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Profile from './pages/Profile.jsx'
import Billing from './components/Billing.jsx'
import Pricing from './pages/Pricing.jsx'
import Root from './pages/Root.jsx'
import Landing from './pages/Landing.jsx'
import Contact from './pages/Contact.jsx'


import { AuthProvider } from './Providers/AuthProvider.jsx';


const router = createBrowserRouter([
  {
    path: "/v",
    element: <Root />,
    children: [
      {
        path: "/v/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/v/profile",
        element: <Profile/>
      },
      {
        path: '/v/billing',
        element: <Billing/>
      },
      {
        path: '/v/pricing',
        element: <Pricing/>
      },
      {
        path: '/v/contact',
        element: <Contact/>
      }
    ],
  },
  {
    path: '/',
    element: <Landing/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
