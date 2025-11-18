import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Clientes from './components/Clientes'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

// Hooks
import useImagePreloader from './hooks/useImagePreloader'

function App() {
  const { imagesLoaded, loadingProgress } = useImagePreloader()

  return (
    <>
      <Helmet>
        <title>Lulu Aguilar - Fotógrafa Profesional | Portfolio</title>
        <meta 
          name="description" 
          content="Portfolio de Lulu, fotógrafa profesional especializada en deporte, paisajes, retratos y fotografía corporativa. Capturando momentos únicos con pasión y creatividad." 
        />
        <meta 
          name="keywords" 
          content="fotógrafa profesional, portfolio fotografía, fotografía deportiva, paisajes, retratos, fotografía corporativa, Madrid, reels, videos" 
        />
        <meta property="og:title" content="Lulu Aguilar - Fotógrafa Profesional | Portfolio" />
        <meta property="og:description" content="Portfolio de Lulu, fotógrafa profesional. Capturando momentos únicos con pasión y creatividad." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="https://res.cloudinary.com/dum0alaoe/image/upload/v1763044138/lulu_wekilz.jpg" />
      </Helmet>

      <AnimatePresence>
        {!imagesLoaded && (
          <Preloader progress={loadingProgress} />
        )}
      </AnimatePresence>

      {imagesLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
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
            <motion.section
              id="galeria"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <Gallery />
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

            {/* Contact Section */}
            <motion.section
              id="contacto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
            </motion.section>

            {/* Clientes Section */}
            <motion.section
              id="clientes"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <Clientes />
            </motion.section>
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App