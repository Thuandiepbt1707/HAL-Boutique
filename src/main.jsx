import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'


import Header from './components/Header'
import Footer from './components/Footer'

import { router } from './until/Router'
import './assets/g-style/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      {
        router.map((value, index)=><Route path={value.path} element = {<value.element />} key = {index}/>)
      }
    </Routes>
    <Footer />
  </BrowserRouter>
)
