import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const Videos = () => {
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
        <title>Videos | Lulu - Fotógrafa Profesional</title>
        <meta 
          name="description" 
          content="Descubre próximamente mis videos profesionales. Estoy trabajando en nuevas piezas audiovisuales para compartir contigo." 
        />
        <meta 
          name="keywords" 
          content="videos fotografía, videografía, videos profesionales" 
        />
        <meta property="og:title" content="Videos | Lulu - Fotógrafa Profesional" />
        <meta property="og:description" content="Próximamente podrás ver mis videos profesionales." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/videos" />
      </Helmet>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 lg:pt-24"
      >
        <div className="container-max section-padding text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4"
          >
            Videos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Estoy preparando una colección especial de videos para compartir historias en movimiento.
            Vuelve pronto para ver las novedades o contáctame si necesitas contenido audiovisual personalizado.
          </motion.p>
          <motion.a
            href="/contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hablemos de tu proyecto
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}

export default Videos
