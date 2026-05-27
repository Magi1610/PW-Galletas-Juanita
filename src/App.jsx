import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'


import Home from './components/Home'             // ← agrupas los componentes de home aquí
import ProductsCatalog from './components/ProductsCatalog'
import ProductDetail from './components/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <WhatsAppButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductsCatalog />} />
        <Route path="/productos/:slug" element={<ProductDetail />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App