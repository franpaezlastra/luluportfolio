import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PhotoGallery from '../components/PhotoGallery'
import { gallery } from '../data/gallery'

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const categories = useMemo(() => ['Todos', ...Object.keys(gallery)], [])
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [categories, searchParams])

  const images = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return Object.values(gallery).flat()
    }
    return gallery[selectedCategory] || []
  }, [selectedCategory])

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams)
    params.set('category', category)
    setSearchParams(params)
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

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-accent text-white border-accent shadow-sm'
                      : 'border-gray-300 text-gray-600 hover:border-accent hover:text-accent bg-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 text-center text-gray-600"
          >
            {`${images.length} ${images.length === 1 ? 'fotografía' : 'fotografías'} disponibles`}
          </motion.div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <PhotoGallery
              category={selectedCategory === 'Todos' ? undefined : selectedCategory}
              images={images}
            />
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

export default Portfolio
