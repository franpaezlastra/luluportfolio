import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

const PhotoGallery = ({ photos, loading = false }) => {
  const [index, setIndex] = useState(-1)

  // Convertir formato de datos para react-photo-album
  const albumPhotos = photos.map(photo => ({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.title,
    title: photo.title,
    description: photo.caption
  }))

  // Convertir formato para lightbox
  const lightboxSlides = photos.map(photo => ({
    src: photo.src,
    alt: photo.title,
    title: photo.title,
    description: photo.caption,
    width: photo.width,
    height: photo.height
  }))
  


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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
          />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">
          No se encontraron fotos
        </h3>
        <p className="text-gray-600">
          Intenta cambiar los filtros para ver más contenido
        </p>
      </motion.div>
    )
  }

  return (
    <>


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={photos.length}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <PhotoAlbum
              photos={albumPhotos}
              layout="masonry"
              targetRowHeight={300}
              spacing={16}
              onClick={({ index: photoIndex }) => {
                setIndex(photoIndex)
              }}
              renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
                <div style={wrapperStyle} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg">
                    {renderDefaultPhoto({ wrapped: true })}
                    {/* Overlay on hover */}
                    <div 
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        const photoIndex = albumPhotos.findIndex(p => p.src === photo.src)
                        setIndex(photoIndex)
                      }}
                    >
                      <div className="text-white text-center p-4 pointer-events-none">
                        <h4 className="font-semibold text-lg mb-1">
                          {photo.title}
                        </h4>
                        <p className="text-sm text-gray-200">
                          {photo.description}
                        </p>
                        <div className="mt-2">
                          <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              sizes={{
                size: 'calc(100vw - 240px)',
                sizes: [
                  { viewport: '(max-width: 640px)', size: 'calc(100vw - 32px)' },
                  { viewport: '(max-width: 768px)', size: 'calc(50vw - 24px)' },
                  { viewport: '(max-width: 1024px)', size: 'calc(33vw - 24px)' },
                  { viewport: '(max-width: 1280px)', size: 'calc(25vw - 24px)' },
                  { viewport: '(max-width: 1536px)', size: 'calc(20vw - 24px)' }
                ]
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Minimalista */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={lightboxSlides.map(slide => ({
          src: slide.src,
          alt: slide.alt,
          width: slide.width,
          height: slide.height
        }))}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 4,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 3,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true
        }}
        animation={{ 
          fade: 300,
          swipe: 400
        }}
        controller={{ 
          closeOnBackdropClick: true,
          closeOnPullUp: true,
          closeOnPullDown: true 
        }}
        styles={{
          container: { 
            backgroundColor: "rgba(0, 0, 0, 0.98)"
          },
          toolbar: { 
            display: "none"
          }
        }}
        toolbar={{
          buttons: []
        }}
        render={{
          buttonPrev: (props = {}) => (
            <button
              type="button"
              disabled={props.disabled || false}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full border border-white/10 hover:border-white/30 transition-all duration-200 focus:outline-none z-50"
              aria-label="Imagen anterior"
              style={{ zIndex: 1000 }}
            >
              <svg 
                className="w-6 h-6 text-white" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>
          ),
          buttonNext: (props = {}) => (
            <button
              type="button"
              disabled={props.disabled || false}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full border border-white/10 hover:border-white/30 transition-all duration-200 focus:outline-none z-50"
              aria-label="Siguiente imagen"
              style={{ zIndex: 1000 }}
            >
              <svg 
                className="w-6 h-6 text-white" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 18L15 12L9 6" />
              </svg>
            </button>
          ),
          buttonClose: () => (
            <button
              type="button"
              className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-red-500/60 rounded-full border border-white/10 hover:border-red-400/50 transition-all duration-200 focus:outline-none z-50"
              aria-label="Cerrar galería"
              style={{ zIndex: 1001 }}
            >
              <svg 
                className="w-5 h-5 text-white" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6L18 18" />
              </svg>
            </button>
          )
        }}
      />
    </>
  )
}

export default PhotoGallery
