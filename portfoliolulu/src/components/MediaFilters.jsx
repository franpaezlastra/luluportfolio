import { motion } from 'framer-motion'
import { Grid, Zap, Mountain, Users, Briefcase, Image, Video } from 'lucide-react'

const MediaFilters = ({ 
  selectedType, 
  selectedCategory, 
  onTypeChange, 
  onCategoryChange,
  showTypeFilter = true 
}) => {
  const mediaTypes = [
    { id: 'todos', name: 'Todos', icon: Grid },
    { id: 'photo', name: 'Fotos', icon: Image },
    { id: 'video', name: 'Videos', icon: Video }
  ]

  const categories = [
    { id: 'todas', name: 'Todas', icon: Grid },
    { id: 'deporte', name: 'Deporte', icon: Zap },
    { id: 'paisajes', name: 'Paisajes', icon: Mountain },
    { id: 'amigas', name: 'Amigas', icon: Users },
    { id: 'trabajo', name: 'Trabajo', icon: Briefcase }
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
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
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Type Filters */}
      {showTypeFilter && (
        <div>
          <h3 className="text-lg font-semibold text-primary mb-3">
            Tipo de contenido
          </h3>
          <div className="flex flex-wrap gap-3">
            {mediaTypes.map((type) => {
              const Icon = type.icon
              return (
                <motion.button
                  key={type.id}
                  variants={itemVariants}
                  onClick={() => onTypeChange(type.id)}
                  className={`filter-chip flex items-center space-x-2 ${
                    selectedType === type.id ? 'active' : ''
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={selectedType === type.id}
                  aria-label={`Filtrar por ${type.name.toLowerCase()}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{type.name}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-3">
          Categorías
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => onCategoryChange(category.id)}
                className={`filter-chip flex items-center space-x-2 ${
                  selectedCategory === category.id ? 'active' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-pressed={selectedCategory === category.id}
                aria-label={`Filtrar por ${category.name.toLowerCase()}`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default MediaFilters
