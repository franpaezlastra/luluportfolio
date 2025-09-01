import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Image, Video, Grid } from 'lucide-react'
import PhotoGallery from './PhotoGallery'
import InstagramReels from './InstagramReels'
import { getFilteredMedia, getCategoriesByType } from '../data/media'

const Gallery = () => {
  const [selectedType, setSelectedType] = useState('photo') // Empezar con fotos
  const [selectedCategory, setSelectedCategory] = useState('todas')
  const [filteredMedia, setFilteredMedia] = useState([])
  const [loading, setLoading] = useState(false)
  const [availableCategories, setAvailableCategories] = useState([])

  const mediaTypes = [
    { id: 'photo', name: 'Fotos', icon: Image },
    { id: 'reel', name: 'Reels', icon: Video }
  ]

  // Actualizar categorías disponibles cuando cambia el tipo
  useEffect(() => {
    const categories = getCategoriesByType(selectedType)
    setAvailableCategories(categories)
    setSelectedCategory('todas') // Reset category when type changes
  }, [selectedType])

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
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  // Separar fotos y reels
  const photos = filteredMedia.filter(item => item.type === 'photo')
  const reels = filteredMedia.filter(item => item.type === 'reel')
  


  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-6">
            Mi Galería
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explora mi trabajo a través de fotografías que capturan momentos únicos y 
            reels que cuentan historias en movimiento. Cada imagen y video refleja mi pasión por el arte visual.
          </p>
        </motion.div>

        {/* Type Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center">
            <div className="inline-flex bg-white rounded-xl p-2 shadow-sm border border-gray-200">
              {mediaTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      selectedType === type.id
                        ? 'bg-accent text-white shadow-sm'
                        : 'text-gray-600 hover:text-accent hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{type.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-primary">
              Categorías de {selectedType === 'photo' ? 'Fotografía' : 'Reels'}
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {availableCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-accent text-white border-accent shadow-sm'
                    : 'border-gray-300 text-gray-600 hover:border-accent hover:text-accent bg-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-center">
            <div className="text-gray-600">
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <span>Cargando...</span>
                </div>
              ) : (
                <>
                  {selectedType === 'photo' ? (
                    `${photos.length} ${photos.length === 1 ? 'fotografía encontrada' : 'fotografías encontradas'}`
                  ) : (
                    `${reels.length} ${reels.length === 1 ? 'reel encontrado' : 'reels encontrados'}`
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Gallery Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {selectedType === 'photo' ? (
            <PhotoGallery photos={photos} loading={loading} />
          ) : (
            <InstagramReels reels={reels} loading={loading} />
          )}
        </motion.div>

        {/* Additional Info */}
        {!loading && filteredMedia.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                {selectedType === 'photo' ? '¿Te gustan mis fotografías?' : '¿Te encantan mis reels?'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {selectedType === 'photo' 
                  ? 'Cada fotografía está cuidadosamente compuesta para capturar no solo la imagen, sino la emoción del momento. Mi objetivo es crear recuerdos que perduren para siempre.'
                  : 'Mis reels combinan técnica y creatividad para contar historias en movimiento. Cada video está diseñado para conectar emocionalmente y transmitir la esencia de cada momento.'
                }
              </p>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contacto')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-200"
              >
                <span>Trabajemos Juntos</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Gallery
