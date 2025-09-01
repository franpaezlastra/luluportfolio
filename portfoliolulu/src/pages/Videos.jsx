import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import MediaFilters from '../components/MediaFilters'
import VideoGrid from '../components/VideoGrid'
import { getFilteredMedia } from '../data/media'

const Videos = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [filteredMedia, setFilteredMedia] = useState([])
  const [loading, setLoading] = useState(false)

  // Inicializar filtros desde URL
  useEffect(() => {
    const categoryParam = searchParams.get('category') || 'todas'
    setSelectedCategory(categoryParam)
  }, [searchParams])

  // Filtrar media cuando cambien los filtros
  useEffect(() => {
    setLoading(true)
    
    // Simular loading para mejor UX
    const timer = setTimeout(() => {
      const filtered = getFilteredMedia('video', selectedCategory)
      setFilteredMedia(filtered)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [selectedCategory])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams)
    params.set('category', category)
    setSearchParams(params)
  }

  // Filtrar solo videos para esta página
  const videos = filteredMedia.filter(item => item.type === 'video')

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
          content="Descubre mi colección de videos. Momentos capturados en movimiento que cuentan historias únicas a través de la imagen en movimiento." 
        />
        <meta 
          name="keywords" 
          content="videos fotografía, videografía, videos deportivos, videos paisajes, contenido audiovisual" 
        />
        <meta property="og:title" content="Videos | Lulu - Fotógrafa Profesional" />
        <meta property="og:description" content="Descubre mi colección de videos. Momentos capturados en movimiento." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/videos" />
      </Helmet>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 lg:pt-24"
      >
        <div className="container-max section-padding">
          {/* Header */}
          <div className="text-center mb-12">
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
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              La fotografía captura instantes, pero el video cuenta historias completas. 
              Explora mi trabajo en movimiento, donde cada frame es una obra de arte.
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <MediaFilters
                selectedType="video"
                selectedCategory={selectedCategory}
                onTypeChange={() => {}} // No se usa en esta página
                onCategoryChange={handleCategoryChange}
                showTypeFilter={false} // Solo mostrar filtros de categoría
              />
            </div>
          </motion.div>

          {/* Results Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-gray-600">
              {loading ? (
                'Cargando...'
              ) : (
                `${videos.length} ${videos.length === 1 ? 'video encontrado' : 'videos encontrados'}`
              )}
            </p>
          </motion.div>

          {/* Video Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <VideoGrid videos={videos} loading={loading} />
          </motion.div>

          {/* Info Section */}
          {!loading && videos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16 bg-gray-50 rounded-xl p-8"
            >
              <div className="text-center">
                <h2 className="font-display text-2xl font-bold text-primary mb-4">
                  Sobre mis Videos
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Cada video está cuidadosamente editado para transmitir emociones y contar historias auténticas. 
                  Utilizo técnicas como time-lapse, slow motion y composición cinematográfica para crear 
                  piezas que van más allá de la simple documentación, convirtiéndose en experiencias visuales únicas.
                </p>
              </div>
            </motion.div>
          )}

          {/* Load More Button (Future Implementation) */}
          {!loading && videos.length > 0 && videos.length >= 12 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center mt-12"
            >
              <button
                className="btn-secondary"
                onClick={() => {
                  // Implementar lógica de "cargar más" aquí
                  console.log('Load more videos')
                }}
              >
                Cargar Más Videos
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default Videos
