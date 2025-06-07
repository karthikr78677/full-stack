import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Suspense,lazy } from 'react'
const Home=lazy(()=>import('./home.jsx'))
const Signup=lazy(()=>import('./signup.jsx'))
const SignIn=lazy(()=>import('./signin.jsx'))
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
      </Suspense>
      

    </Router>
  </React.StrictMode>
)
