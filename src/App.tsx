import './App.css'
import { Button, NextUIProvider } from '@nextui-org/react'
import { Routes, Route } from 'react-router-dom'
import NavbarLayout from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'

function App() {

  return (
    <NextUIProvider>
      <NavbarLayout />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<Button>About</Button>} />
        <Route path='/gallery' element={<Button>Gallery</Button>} />
        <Route path='/myTrips' element={<Button>My Trips</Button>} />
        <Route path='/flights' element={<Button>Flight Deals</Button>} />
        <Route path='/blog' element={<Button>Blog</Button>} />
        <Route path='/contact' element={<Button>Contact</Button>} />
      </Routes>
      <Footer />
    </NextUIProvider>
  )
}

export default App
