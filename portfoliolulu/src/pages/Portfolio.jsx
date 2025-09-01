import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import MediaFilters from '../components/MediaFilters'
import PhotoGallery from '../components/PhotoGallery'
import { getFilteredMedia } from '../data/media'

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedType, setSelectedType] = useState('photo') // Solo fotos por defecto
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [filteredMedia, setFilteredMedia] = useState([])
  const [loading, setLoading] = useState(false)

  // Inicializar filtros desde URL
  useEffect(() => {
    const typeParam = searchParams.get('type') || 'photo'
    const categoryParam = searchParams.get('category') || 'todas'
    
    setSelectedType(typeParam)
    setSelectedCategory(categoryParam)
  }, [searchParams])

  // Filtrar media cuando cambien los filtros
  useEffect(() => {
    setLoading(true)
    
    // Simular loading para mejor UX
    const timer = setTimeout(() => {
      const filtered = getFilteredMedia(selectedType, selectedCategory)
      setFilteredMedia(filtered)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [selectedType, selectedCategory])

  const handleTypeChange = (type) => {
    setSelectedType(type)
    const params = new URLSearchParams(searchParams)
    params.set('type', type)
    setSearchParams(params)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams)
    params.set('category', category)
    setSearchParams(params)
  }

  // Filtrar solo fotos para esta página
  const photos = filteredMedia.filter(item => item.type === 'photo')

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
        <title>Portfolio de Fotografía | Lulu - Fotógrafa Profesional</title>
        <meta 
          name="description" 
          content="Explora mi portfolio completo de fotografía. Especializada en deporte, paisajes, retratos y fotografía corporativa. Cada imagen cuenta una historia única." 
        />
        <meta 
          name="keywords" 
          content="portfolio fotografía, galería fotos, fotografía deportiva, paisajes, retratos, fotografía corporativa" 
        />
        <meta property="og:title" content="Portfolio de Fotografía | Lulu - Fotógrafa Profesional" />
        <meta property="og:description" content="Explora mi portfolio completo de fotografía. Cada imagen cuenta una historia única." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/portfolio" />
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
              Portfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Una colección de mis trabajos más representativos. Cada fotografía captura un momento único 
              y cuenta su propia historia a través de mi lente.
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
                selectedType={selectedType}
                selectedCategory={selectedCategory}
                onTypeChange={handleTypeChange}
                onCategoryChange={handleCategoryChange}
                showTypeFilter={true}
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
                `${photos.length} ${photos.length === 1 ? 'fotografía encontrada' : 'fotografías encontradas'}`
              )}
            </p>
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <PhotoGallery photos={photos} loading={loading} />
          </motion.div>

          {/* Load More Button (Future Implementation) */}
          {!loading && photos.length > 0 && photos.length >= 20 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <button
                className="btn-secondary"
                onClick={() => {
                  // Implementar lógica de "cargar más" aquí
                  console.log('Load more photos')
                }}
              >
                Cargar Más Fotos
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default Portfolio
