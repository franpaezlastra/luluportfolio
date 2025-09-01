import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Camera } from 'lucide-react'

const NotFound = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Página no encontrada | Lulu - Fotógrafa Profesional</title>
        <meta 
          name="description" 
          content="La página que buscas no existe. Regresa al portfolio de Lulu para descubrir fotografías únicas y momentos capturados con pasión." 
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 lg:pt-24 flex items-center"
      >
        <div className="container-max section-padding">
          <div className="text-center max-w-2xl mx-auto">
            {/* Animated Camera Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                <Camera className="h-16 w-16 text-accent" />
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h1 className="font-display text-6xl lg:text-8xl font-bold text-primary mb-4">
                404
              </h1>
              <h2 className="font-display text-2xl lg:text-3xl font-semibold text-primary mb-6">
                Imagen no encontrada
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Parece que la página que buscas se ha desenfocado o no existe. 
                No te preocupes, incluso los mejores fotógrafos tienen tomas que no salen perfectas.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/"
                className="inline-flex items-center space-x-2 btn-primary"
              >
                <Home className="h-5 w-5" />
                <span>Volver al Inicio</span>
              </Link>
              
              <Link
                to="/portfolio"
                className="inline-flex items-center space-x-2 btn-secondary"
              >
                <Camera className="h-5 w-5" />
                <span>Ver Portfolio</span>
              </Link>
            </motion.div>

            {/* Go Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors duration-200 focus-visible"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Regresar a la página anterior</span>
              </button>
            </motion.div>

            {/* Decorative Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-16 p-6 bg-gray-50 rounded-xl"
            >
              <blockquote className="text-gray-600 italic">
                "En fotografía, el error más pequeño puede arruinar toda la imagen, 
                pero también puede crear la foto más bella."
              </blockquote>
              <cite className="block mt-3 text-sm text-accent font-medium">
                — Filosofía de la fotografía
              </cite>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute top-1/4 left-10 w-16 h-16 bg-accent/5 rounded-full blur-xl"
          />
          
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2
            }}
            className="absolute bottom-1/4 right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl"
          />
        </div>
      </motion.div>
    </>
  )
}

export default NotFound
