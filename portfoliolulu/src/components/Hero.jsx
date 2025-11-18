import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const HERO_IMAGE = 'https://res.cloudinary.com/dum0alaoe/image/upload/v1763044138/lulu_wekilz.jpg'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Lulu - Fotógrafa profesional capturando paisajes al atardecer"
          className="w-full h-full object-cover object-center"
          style={{
            objectPosition: 'center center'
          }}
        />
        {/* Overlay gradiente para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center text-white section-padding max-w-4xl mx-auto"
      >
        

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-retro-signature text-[3.25rem] sm:text-6xl md:text-8xl lg:text-9xl text-shadow leading-tight"
        >
          Lourdes Aguilar
        </motion.h1>

        <motion.span
          variants={itemVariants}
          className="block mb-2 font-montserrat font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl"
        >
          contenido audiovisual
        </motion.span>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl mt-5 lg:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed"
        >
          Capturando momentos únicos y emociones auténticas a través de mi lente. 
          Cada imagen cuenta una historia, cada historia merece ser contada.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => {
              const gallerySection = document.getElementById('galeria')
              if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group inline-flex items-center space-x-2 bg-accent text-white px-8 py-4 rounded-lg text-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 focus-visible shadow-lg"
          >
            <span>Ver Galería</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          
          <button
            onClick={() => {
              const contactSection = document.getElementById('contacto')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="group inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg text-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 focus-visible"
          >
            <span>Contactar</span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full"
      />
    </section>
  )
}

export default Hero
