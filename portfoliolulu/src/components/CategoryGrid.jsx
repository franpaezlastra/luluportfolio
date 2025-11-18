import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Mountain, Users, Briefcase, Image as ImageIcon, Layers, ArrowRight } from 'lucide-react'
import { gallery } from '../data/gallery'

const CategoryGrid = () => {
  const categories = [
    {
      id: 'Deportes',
      name: 'Deportes',
      description: 'Capturando la pasión y energía del deporte',
      image: gallery.Deportes?.[0] ?? '',
      icon: Zap,
      link: '/portfolio?category=Deportes'
    },
    {
      id: 'ArqDiseño',
      name: 'Arq/Diseño',
      description: 'Arquitectura y diseño con una mirada artística',
      image: gallery['ArqDiseño']?.[0] ?? '',
      icon: Layers,
      link: '/portfolio?category=ArqDiseño'
    },
    {
      id: 'Comida',
      name: 'Gastronomía',
      description: 'El sabor de cada plato, capturado con detalle',
      image: gallery.Comida?.[0] ?? '',
      icon: ImageIcon,
      link: '/portfolio?category=Comida'
    },
    {
      id: 'Indumentaria',
      name: 'Indumentaria',
      description: 'Moda, estilo y actitud en cada fotografía',
      image: gallery.Indumentaria?.[0] ?? '',
      icon: Users,
      link: '/portfolio?category=Indumentaria'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-max section-padding">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4"
          >
            Especialidades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Cada categoría tiene su propia personalidad y enfoque. Explora mi trabajo organizado por especialidades.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.filter((category) => Boolean(category.image)).map((category) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link
                  to={category.link}
                  className="block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden focus-visible"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={`Fotografía de ${category.name.toLowerCase()}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-accent rounded-full flex items-center justify-center transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 btn-primary"
          >
            <span>Ver Todo el Portfolio</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoryGrid
