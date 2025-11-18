import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const PLACEHOLDER_REEL = 'https://res.cloudinary.com/dum0alaoe/image/upload/v1/Luluportfolio/Otros/placeholder-reel.jpg'

const InstagramReels = ({ reels, loading = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[9/16] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl animate-pulse border border-gray-600/30 shadow-lg"
          />
        ))}
      </div>
    )
  }

  if (reels.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600/30 shadow-lg flex items-center justify-center">
          <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No se encontraron reels
        </h3>
        <p className="text-gray-400">
          Intenta cambiar los filtros para ver más contenido
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      {reels.map((reel, index) => (
        <ReelCard key={reel.id || `reel-${index}`} reel={reel} variants={itemVariants} />
      ))}
    </motion.div>
  )
}

const ReelCard = ({ reel, variants }) => {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)

  // Obtener URL del video
  const videoUrl = reel.video || reel.videoUrl || reel.src

  // Auto-play en hover con loop continuo
  useEffect(() => {
    if (isHovered && videoUrl && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isHovered, videoUrl])

  const handleClick = () => {
    if (reel.link) {
      window.open(reel.link, '_blank')
    } else if (reel.src) {
      window.open(reel.src, '_blank')
    }
  }

  return (
    <motion.div
      variants={variants}
      className="group relative aspect-[9/16] bg-black rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] hover:opacity-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Contenedor de video/imagen */}
      <div className="relative w-full h-full">
        {/* Thumbnail - se desvanece en hover */}
        <img
          src={reel.thumbnail || reel.poster || PLACEHOLDER_REEL}
          alt={reel.title || 'Reel'}
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />

        {/* Video - aparece en hover con loop */}
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            preload="metadata"
          />
        )}

        {/* Overlay sutil en hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

        {/* Icono de Instagram y texto "Ver en Instagram" - CENTRADO EN UNA LÍNEA */}
        {isHovered && reel.link && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full whitespace-nowrap">
            <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-white text-sm font-medium">Ver en Instagram</span>
          </div>
        )}
      </div>

      {/* Título con la misma fuente de la página */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-8 pb-4 px-4">
        <h3 className="text-white text-2xl font-bold text-center ">
          {reel.title}
        </h3>
      </div>
    </motion.div>
  )
}

export default InstagramReels
