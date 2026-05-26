import Navbar from "./components/Navbar";
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Gallery from './components/Gallery'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Allies from './components/Allies'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Gallery />
      <Allies />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}

export default App
