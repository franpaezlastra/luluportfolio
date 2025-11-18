import { useMemo, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Image, Video, CheckCircle2, ArrowLeft } from 'lucide-react'
import { gallery } from '../data/gallery'
import { reels } from '../data/reels'
import PhotoGallery from './PhotoGallery'
import InstagramReels from './InstagramReels'
import { FALLBACK_SUBCATEGORY } from '../constants/gallery'

// Función para aleatorizar array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const CATEGORY_LABELS = {
  ArqDiseño: 'Arq/Diseño',
  Comida: 'Gastronomía'
}

const Gallery = () => {
  const categories = useMemo(
    () => Object.keys(gallery).filter((cat) => (gallery[cat]?.length ?? 0) > 0),
    []
  )
  const [selectedType, setSelectedType] = useState('photo') // 'photo' o 'video'
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const shuffledCacheRef = useRef({ length: 0, images: [] })

  // Obtener todas las imágenes sin aleatorizar (base)
  const allImagesBase = useMemo(() => {
    return categories.flatMap((category) => gallery[category])
  }, [categories])

  const categorySubcategories = useMemo(() => {
    if (selectedCategory === 'Todos') return []
    const images = gallery[selectedCategory] || []

    const grouped = images.reduce((acc, image) => {
      const key = image?.subcategory || FALLBACK_SUBCATEGORY
      if (!acc[key]) {
        acc[key] = {
          images: [],
          meta: image?.meta
        }
      }
      if (!acc[key].meta && image?.meta) {
        acc[key].meta = image.meta
      }
      acc[key].images.push(image)
      return acc
    }, {})

    return Object.entries(grouped).map(([name, data]) => ({
      name,
      images: data.images,
      cover: data.images[0]?.url,
      count: data.images.length,
      meta: data.meta
    }))
  }, [selectedCategory])

  const currentSubcategory = useMemo(() => {
    if (!selectedSubcategory) return null
    return categorySubcategories.find((subcat) => subcat.name === selectedSubcategory) || null
  }, [categorySubcategories, selectedSubcategory])

  useEffect(() => {
    setSelectedSubcategory(null)
  }, [selectedCategory])

  // Obtener todos los reels (sin categorías)
  const reelsToShow = useMemo(() => {
    return reels
  }, [])

  // Obtener imágenes según la categoría seleccionada
  const imagesToShow = useMemo(() => {
    if (selectedType !== 'photo') return []

    if (selectedCategory === 'Todos') {
      const cacheEmpty = shuffledCacheRef.current.images.length === 0
      const baseChanged = shuffledCacheRef.current.length !== allImagesBase.length

      if (cacheEmpty || baseChanged) {
        const shuffled = shuffleArray(allImagesBase)
        shuffledCacheRef.current = {
          length: allImagesBase.length,
          images: shuffled.slice(0, Math.min(15, shuffled.length))
        }
      }

      return shuffledCacheRef.current.images
    }

    shuffledCacheRef.current = { length: 0, images: [] }

    if (!selectedSubcategory) {
      return []
    }

    return (gallery[selectedCategory] || []).filter(
      (image) => (image?.subcategory || FALLBACK_SUBCATEGORY) === selectedSubcategory
    )
  }, [selectedCategory, selectedSubcategory, selectedType, allImagesBase])

  return (
    <section className="pt-16  lg:pt-24 lg:pb-2 bg-white text-black">
      <div className="container-max section-padding">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="hidden sm:block w-14 h-px bg-black/15" />
            <div className="relative inline-block">
              <h2 className="text-4xl lg:text-5xl font-montserrat font-bold">
                Mi Galería
              </h2>
            </div>
            <span className="hidden sm:block w-14 h-px bg-black/15" />
          </div>
        </motion.div>

        {/* Type Filters (Fotos/Videos) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              onClick={() => setSelectedType('photo')}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 ${
                selectedType === 'photo'
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'border-gray-700 text-gray-300 hover:border-accent hover:text-accent bg-black'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image className="w-4 h-4" />
              Fotos
            </motion.button>
            <motion.button
              onClick={() => setSelectedType('video')}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2 ${
                selectedType === 'video'
                  ? 'bg-accent text-white border-accent shadow-sm'
                  : 'border-gray-700 text-gray-300 hover:border-accent hover:text-accent bg-black'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Video className="w-4 h-4" />
              Videos
            </motion.button>
          </div>
        </motion.div>

        {/* Category Filters - Solo para fotos */}
        {selectedType === 'photo' && (
          <div className="flex items-center justify-center mb-8 px-6">
            <span className="block w-full max-w-4xl h-px bg-black/10" />
          </div>
        )}
        {selectedType === 'photo' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {['Todos', ...categories].map((category) => {
                const isActive = selectedCategory === category
                const displayName = CATEGORY_LABELS[category] ?? category
                return (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black ${
                      isActive
                        ? 'bg-accent text-white border-transparent shadow-lg shadow-accent/30'
                        : 'border-gray-700 text-gray-300 hover:border-accent hover:text-accent bg-black'
                    }`}
                    aria-pressed={isActive}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {displayName}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border-2 border-white/40 pointer-events-none animate-pulse" />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
        {selectedType === 'photo' && (
          <div className="flex items-center justify-center mb-12 px-6">
            <span className="block w-full max-w-4xl h-px bg-black/10" />
          </div>
        )}

        {/* Subcategorías destacadas */}
        {selectedType === 'photo' &&
          selectedCategory !== 'Todos' &&
          categorySubcategories.length > 0 &&
          (!selectedSubcategory ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="text-center mb-6">
                <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
                  {selectedCategory}
                </p>
                <h3 className="text-3xl font-semibold text-black">Explora sus subcategorías</h3>
                <p className="text-gray-600 mt-2">
                  Elegí una serie para ver todas las fotos que la componen.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categorySubcategories.map((subcat, index) => {
                  const isActive = selectedSubcategory === subcat.name
                  return (
                    <motion.button
                      key={subcat.name}
                      onClick={() => setSelectedSubcategory(subcat.name)}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`group text-left rounded-2xl overflow-hidden border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-black ${
                        isActive
                          ? 'border-accent shadow-xl shadow-accent/20 scale-[1.02]'
                          : 'border-black/10 hover:border-black/40'
                      }`}
                      aria-pressed={isActive}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {subcat.cover ? (
                          <img
                            src={subcat.cover}
                            alt={subcat.name}
                            className={`w-full h-full object-cover transform transition duration-500 group-hover:scale-105 ${
                              isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                            }`}
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                        )}
                        <div
                          className={`absolute inset-0 transition-opacity duration-300 ${
                            isActive
                              ? 'bg-black/70'
                              : 'bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90'
                          }`}
                        />
                        {isActive && (
                          <>
                            <div className="absolute inset-0 rounded-2xl border-[3px] border-accent/70 pointer-events-none" />
                            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 text-black text-xs font-semibold uppercase tracking-[0.3em] shadow-lg">
                              <CheckCircle2 className="w-4 h-4 text-accent" />
                              En foco
                            </div>
                          </>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <p className="text-xs uppercase tracking-[0.6em] text-white/70 mb-2">
                            {selectedCategory}
                          </p>
                          <p className="text-2xl font-semibold leading-tight">{subcat.name}</p>
                          {subcat.meta?.para && (
                            <p className="text-xs uppercase tracking-[0.4em] text-white/60 mt-1">
                              para {subcat.meta.para}
                            </p>
                          )}
                          <p className="text-sm text-white/80 mt-1">{subcat.count} fotografías</p>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            currentSubcategory && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl border border-black/10 bg-white text-black p-6 shadow-lg"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-2">
                    {selectedCategory}
                  </p>
                  <h3 className="text-3xl font-semibold leading-tight text-black">{currentSubcategory.name}</h3>
                  {currentSubcategory.meta?.para && (
                    <p className="text-sm uppercase tracking-[0.35em] text-gray-500 mt-1">
                      para {currentSubcategory.meta.para}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    {currentSubcategory.count} fotografías seleccionadas
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-black/10 text-black text-sm font-semibold bg-gray-100 hover:bg-black hover:text-white transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver a subcategorías
                </button>
              </motion.div>
            )
          ))}

        {/* Gallery Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {selectedType === 'photo' ? (
            selectedCategory !== 'Todos' &&
            categorySubcategories.length > 0 &&
            !selectedSubcategory ? (
              <div className="text-center py-16">
                <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-3">
                  {selectedCategory}
                </p>
                <h4 className="text-3xl font-semibold font-montserrat text-black mb-2">
                  Elegí una subcategoría para continuar
                </h4>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Cada serie cuenta una historia distinta. Seleccioná una de las portadas
                  para entrar y ver todas sus fotografías.
                </p>
              </div>
            ) : (
              <PhotoGallery images={imagesToShow} />
            )
          ) : (
            <InstagramReels reels={reelsToShow} />
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default Gallery
