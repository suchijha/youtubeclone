import { useState } from 'react'


import SideMenu from "./components/SideMenu"
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
  const sideBar = useSelector((state)=>state.Sidebar)

  return (
    <>
    <Header/>
    <main className='flex   p-2'>
    {sideBar && <SideMenu/>}
    <Outlet/>
    </main>
     </>
  )
}

export default App
