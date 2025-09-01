import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Share } from 'lucide-react'

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
            className="aspect-[9/16] bg-gray-200 rounded-xl animate-pulse"
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
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <Play className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">
          No se encontraron reels
        </h3>
        <p className="text-gray-600">
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
      {reels.map((reel) => (
        <ReelCard key={reel.id} reel={reel} variants={itemVariants} />
      ))}
    </motion.div>
  )
}

const ReelCard = ({ reel, variants }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [isExternal, setIsExternal] = useState(false)
  const [embedUrl, setEmbedUrl] = useState('')
  const videoRef = useRef(null)
  const hoverTimeoutRef = useRef(null)

  // Detectar si es URL externa y convertir a video directo
  useEffect(() => {
    if (reel.isExternal && reel.platform === 'instagram') {
      setIsExternal(true)
      // Para Instagram, usar video directo si está disponible
      // Si no, usar el poster como fallback
      if (reel.videoUrl) {
        setEmbedUrl(reel.videoUrl) // URL directa del video
      } else {
        setEmbedUrl(reel.src) // Fallback a la URL original
      }
    } else if (reel.src.startsWith('http')) {
      setIsExternal(true)
      setEmbedUrl(reel.src)
    }
  }, [reel.src, reel.isExternal, reel.platform, reel.videoUrl])

  // Auto-play en hover con bucle de 5 segundos
  useEffect(() => {
    let playTimer = null
    let stopTimer = null

    // Para videos locales O videos de Instagram con videoUrl
    const hasVideo = !isExternal || (isExternal && reel.videoUrl)
    
    if (isHovered && hasVideo) {
      // Reproducir después de 300ms
      playTimer = setTimeout(() => {
        if (videoRef.current && !isPlaying) {
          videoRef.current.currentTime = 0
          videoRef.current.play()
          setIsPlaying(true)
          
          // Parar después de 5 segundos y reiniciar bucle
          stopTimer = setTimeout(() => {
            if (videoRef.current && isPlaying && isHovered) {
              videoRef.current.currentTime = 0
              // Continuar el bucle mientras esté en hover
              if (isHovered) {
                videoRef.current.play()
              }
            }
          }, 5000)
        }
      }, 300)
    } else if (!isHovered) {
      // Limpiar timers y pausar
      if (playTimer) clearTimeout(playTimer)
      if (stopTimer) clearTimeout(stopTimer)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
      
      if (videoRef.current && isPlaying) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
        setIsPlaying(false)
      }
    }

    return () => {
      if (playTimer) clearTimeout(playTimer)
      if (stopTimer) clearTimeout(stopTimer)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [isHovered, isPlaying, isExternal, reel.videoUrl])

  const handleVideoClick = () => {
    // Para embeds externos, redirigir al contenido original
    if (isExternal && reel.platform === 'instagram') {
      window.open(reel.src, '_blank')
      return
    }
    
    // Para videos locales, controlar reproducción
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <motion.div
      variants={variants}
      className="group relative aspect-[9/16] bg-black rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true)
        if (!isExternal) {
          setShowControls(true)
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowControls(false)
      }}
      onClick={handleVideoClick}
    >
      {/* Video o Embed */}
      {isExternal && reel.platform === 'instagram' ? (
        <div className="w-full h-full relative bg-black">
          {/* Si tenemos videoUrl, mostrar como video nativo */}
          {reel.videoUrl ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              poster={reel.poster}
              preload="metadata"
            >
              <source src={reel.videoUrl} type="video/mp4" />
              Tu navegador no soporta el elemento video.
            </video>
          ) : (
            /* Fallback: mostrar poster con overlay de Instagram */
            <div className="w-full h-full relative">
              <img
                src={reel.poster || '/demo/placeholder-reel.jpg'}
                alt={reel.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay de Instagram */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {/* Instagram hover overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <span className="text-white text-sm font-medium">Ver en Instagram</span>
                </div>
                <p className="text-white text-xs opacity-90 line-clamp-2">
                  {reel.caption}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          poster={reel.poster}
          preload="metadata"
        >
          <source src={reel.src} type="video/mp4" />
          Tu navegador no soporta el elemento video.
        </video>
      )}

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play/Pause overlay cuando no está en hover */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
            {isExternal && reel.platform === 'instagram' ? (
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            ) : (
              <Play className="h-6 w-6 text-white ml-0.5" />
            )}
          </div>
        </div>
      )}

      {/* Controls overlay (estilo Instagram) - Solo para videos locales */}
      {showControls && !isExternal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex flex-col justify-between p-3"
        >
          {/* Top controls */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
              <span className="text-white text-sm font-medium">lulu_photo</span>
            </div>
            
            <button
              onClick={toggleMute}
              className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-white" />
              ) : (
                <Volume2 className="h-4 w-4 text-white" />
              )}
            </button>
          </div>

          {/* Bottom info */}
          <div>
            {/* Action buttons (lado derecho estilo Instagram) */}
            <div className="absolute right-3 bottom-16 flex flex-col space-y-4">
              <button className="flex flex-col items-center space-y-1 hover:scale-110 transition-transform">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-white text-xs">125</span>
              </button>
              
              <button className="flex flex-col items-center space-y-1 hover:scale-110 transition-transform">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-white text-xs">12</span>
              </button>
              
              <button className="flex flex-col items-center space-y-1 hover:scale-110 transition-transform">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                  <Share className="h-6 w-6 text-white" />
                </div>
              </button>
            </div>

            {/* Caption */}
            <div className="pr-16">
              <p className="text-white text-sm font-medium mb-1">
                {reel.title}
              </p>
              <p className="text-white/80 text-xs leading-relaxed line-clamp-2">
                {reel.caption}
              </p>
              
              {/* Category tag */}
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent capitalize">
                  #{reel.category}
                </span>
              </div>
            </div>
          </div>

          {/* Play/Pause button central */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center"
            >
              <Play className="h-8 w-8 text-white ml-1" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Progress bar (cuando está reproduciendo) */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
          />
        </div>
      )}

      {/* Duration badge o Platform badge */}
      <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {isExternal && reel.platform === 'instagram' ? (
          <div className="flex items-center space-x-1">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>IG</span>
          </div>
        ) : (
          `0:${Math.floor(Math.random() * 30 + 10).toString().padStart(2, '0')}`
        )}
      </div>
    </motion.div>
  )
}

export default InstagramReels
