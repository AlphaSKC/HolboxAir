import './App.css'
import { Button, NextUIProvider } from '@nextui-org/react'
import { Routes, Route } from 'react-router-dom'
import NavbarLayout from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import Slogan from './components/layout/Slogan'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'

function App() {

  return (
    <NextUIProvider>
      <NavbarLayout />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/myTrips' element={<Button>My Trips</Button>} />
        <Route path='/flights' element={<Button>Flight Deals</Button>} />
        <Route path='/blog' element={<Button>Blog</Button>} />
        <Route path='/contact' element={<Button>Contact</Button>} />
      </Routes>
      <Slogan />
      <Footer />
    </NextUIProvider>
  )
}

export default App
