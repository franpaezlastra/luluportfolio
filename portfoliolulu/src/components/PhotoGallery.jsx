import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { FALLBACK_SUBCATEGORY } from '../constants/gallery'

const PhotoGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [loadedImages, setLoadedImages] = useState(new Set())
  const normalizedImages = useMemo(
    () =>
      images
        .map((image) => {
          if (typeof image === 'string') {
            return { url: image, subcategory: FALLBACK_SUBCATEGORY }
          }
          return {
            url: image?.url,
            subcategory: image?.subcategory || FALLBACK_SUBCATEGORY
          }
        })
        .filter((image) => Boolean(image.url)),
    [images]
  )

  // Protección global contra clic derecho
  useEffect(() => {
    const handleGlobalContextMenu = (e) => {
      // Solo prevenir si el clic es en una imagen o en el área de la galería
      const target = e.target
      if (target.tagName === 'IMG' || target.closest('.relative.group')) {
        e.preventDefault()
        return false
      }
    }

    const handleGlobalDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('contextmenu', handleGlobalContextMenu)
    document.addEventListener('dragstart', handleGlobalDragStart)

    return () => {
      document.removeEventListener('contextmenu', handleGlobalContextMenu)
      document.removeEventListener('dragstart', handleGlobalDragStart)
    }
  }, [])

  // Manejar teclado para navegación y cierre
  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null)
      } else if (e.key === 'ArrowLeft' && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1)
      } else if (e.key === 'ArrowRight' && selectedIndex < normalizedImages.length - 1) {
        setSelectedIndex(selectedIndex + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    // Prevenir scroll del body cuando el lightbox está abierto
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex, normalizedImages.length])

  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= normalizedImages.length) {
      setSelectedIndex(null)
    }
  }, [normalizedImages.length, selectedIndex])

  const openLightbox = useCallback((index) => {
    setSelectedIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  const goToPrevious = useCallback((e) => {
    e.stopPropagation()
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }, [selectedIndex])

  const goToNext = useCallback((e) => {
    e.stopPropagation()
    if (selectedIndex < normalizedImages.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }, [selectedIndex, normalizedImages.length])

  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set([...prev, index]))
  }, [])

  // Prevenir clic derecho
  const handleContextMenu = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }, [])

  // Prevenir drag
  const handleDragStart = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }, [])

  // Prevenir selección (solo en desktop, no en móvil)
  const handleSelectStart = useCallback((e) => {
    // No prevenir en móvil para permitir toques
    if (window.innerWidth <= 768) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    return false
  }, [])

  // Prevenir clic con botón central (abrir en nueva pestaña)
  const handleAuxClick = useCallback((e) => {
    if (e.button === 1) { // Botón central del mouse
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }, [])

  // Prevenir clic con Ctrl/Cmd (abrir en nueva pestaña)
  const handleClick = useCallback((e, index) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
    openLightbox(index)
  }, [openLightbox])

  if (normalizedImages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-600/30 shadow-lg flex items-center justify-center">
          <svg
            className="w-8 h-8 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No se encontraron imágenes
        </h3>
        <p className="text-gray-400">
          Intenta cambiar los filtros para ver más contenido
        </p>
      </motion.div>
    )
  }

  return (
    <>
      {/* Grid de imágenes - Masonry responsive con proporciones naturales */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="columns-2 md:columns-3 lg:columns-4"
        style={{ columnGap: '1rem', WebkitColumnGap: '1rem', MozColumnGap: '1rem' }}
      >
        {normalizedImages.map((imageData, index) => {
          const key = `${imageData.url}-${index}`
          const showSubcategory =
            imageData.subcategory && imageData.subcategory !== FALLBACK_SUBCATEGORY
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg break-inside-avoid mb-4 select-none touch-manipulation"
            onClick={(e) => handleClick(e, index)}
            onTouchStart={(e) => {
              // Permitir toques en móvil
              e.stopPropagation()
            }}
            onTouchEnd={(e) => {
              // Abrir lightbox al tocar en móvil
              e.preventDefault()
              e.stopPropagation()
              handleClick(e, index)
            }}
            onAuxClick={handleAuxClick}
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            style={{ userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'manipulation' }}
          >
            <div className="relative w-full overflow-hidden bg-gray-900 rounded-lg">
              <img
                src={imageData.url}
                alt={`Imagen ${index + 1}`}
                className="w-full h-auto transition-all duration-300 pointer-events-none select-none"
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                draggable={false}
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitUserDrag: 'none' }}
              />
              {/* Overlay de protección invisible - permite click pero bloquea otros eventos */}
              <div 
                className="absolute inset-0 z-10 touch-manipulation"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                onAuxClick={handleAuxClick}
                onTouchStart={(e) => {
                  e.stopPropagation()
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleClick(e, index)
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleClick(e, index)
                }}
                style={{ touchAction: 'manipulation' }}
              />
              {/* Overlay oscuro en hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 pointer-events-none z-0" />
              
              {/* Overlay en hover con indicador de click */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center">
                {showSubcategory && (
                  <p className="text-white text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                    {imageData.subcategory}
                  </p>
                )}
                <svg
                  className="w-8 h-8 text-white mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
                <p className="text-white text-sm font-medium text-center">
                  Click para ampliar
                </p>
              </div>
            </div>
          </motion.div>
        )})}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm touch-manipulation"
            onClick={closeLightbox}
            onTouchStart={(e) => {
              // Cerrar al tocar fuera de la imagen en móvil
              if (e.target === e.currentTarget) {
                closeLightbox()
              }
            }}
            style={{ touchAction: 'manipulation' }}
          >
            {/* Botón cerrar */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                closeLightbox()
              }}
              onTouchEnd={(e) => {
                e.preventDefault()
                e.stopPropagation()
                closeLightbox()
              }}
              className="absolute top-4 right-4 z-50 w-12 h-12 md:w-10 md:h-10 flex items-center justify-center bg-black/50 hover:bg-red-500/60 active:bg-red-500/60 rounded-full border border-white/10 hover:border-red-400/50 transition-all duration-200 focus:outline-none touch-manipulation"
              style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
              aria-label="Cerrar galería"
            >
              <X className="w-6 h-6 md:w-5 md:h-5 text-white" />
            </motion.button>

            {/* Botón anterior */}
            {selectedIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  goToPrevious(e)
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  goToPrevious(e)
                }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-12 md:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 active:bg-black/70 rounded-full border border-white/10 hover:border-white/30 transition-all duration-200 focus:outline-none touch-manipulation"
                style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-7 h-7 md:w-6 md:h-6 text-white" />
              </motion.button>
            )}

            {/* Botón siguiente */}
            {selectedIndex < normalizedImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  goToNext(e)
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  goToNext(e)
                }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-12 md:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 active:bg-black/70 rounded-full border border-white/10 hover:border-white/30 transition-all duration-200 focus:outline-none touch-manipulation"
                style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-7 h-7 md:w-6 md:h-6 text-white" />
              </motion.button>
            )}

            {/* Imagen en lightbox */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              onAuxClick={handleAuxClick}
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center select-none z-40"
              onContextMenu={handleContextMenu}
              onDragStart={handleDragStart}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              <img
                src={normalizedImages[selectedIndex]?.url || ''}
                alt={`Imagen ${selectedIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg select-none pointer-events-none"
                draggable={false}
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitUserDrag: 'none' }}
              />
              
              {/* Overlay de protección invisible en lightbox */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
              />
              
              {/* Indicador de posición */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm z-20 pointer-events-none">
                {selectedIndex + 1} / {normalizedImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PhotoGallery
