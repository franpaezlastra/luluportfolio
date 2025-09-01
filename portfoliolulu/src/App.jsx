import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Helmet>
        <title>Lulu - Fotógrafa Profesional | Portfolio</title>
        <meta 
          name="description" 
          content="Portfolio de Lulu, fotógrafa profesional especializada en deporte, paisajes, retratos y fotografía corporativa. Capturando momentos únicos con pasión y creatividad." 
        />
        <meta 
          name="keywords" 
          content="fotógrafa profesional, portfolio fotografía, fotografía deportiva, paisajes, retratos, fotografía corporativa, Madrid, reels, videos" 
        />
        <meta property="og:title" content="Lulu - Fotógrafa Profesional | Portfolio" />
        <meta property="og:description" content="Portfolio de Lulu, fotógrafa profesional. Capturando momentos únicos con pasión y creatividad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/demo/hero-bg.jpg" />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <motion.section
            id="inicio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
          </motion.section>

          {/* About Section */}
          <motion.section
            id="sobre-mi"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <About />
          </motion.section>

          {/* Gallery Section */}
          <motion.section
            id="galeria"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Gallery />
          </motion.section>

          {/* Contact Section */}
          <motion.section
            id="contacto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Contact />
          </motion.section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App