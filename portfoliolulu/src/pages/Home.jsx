import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import CarouselFeatured from '../components/CarouselFeatured'
import CategoryGrid from '../components/CategoryGrid'
import { getFeaturedMedia } from '../data/media'

const Home = () => {
  const featuredItems = getFeaturedMedia()

  return (
    <>
      <Helmet>
        <title>Lulu - Fotógrafa Profesional | Portfolio de Fotografía</title>
        <meta 
          name="description" 
          content="Descubre el portfolio de Lulu, fotógrafa profesional especializada en deporte, paisajes, retratos y fotografía corporativa. Capturando momentos únicos con pasión y creatividad." 
        />
        <meta 
          name="keywords" 
          content="fotógrafa profesional, portfolio fotografía, fotografía deportiva, paisajes, retratos, fotografía corporativa, Madrid" 
        />
        <meta property="og:title" content="Lulu - Fotógrafa Profesional | Portfolio de Fotografía" />
        <meta property="og:description" content="Descubre el portfolio de Lulu, fotógrafa profesional especializada en deporte, paisajes, retratos y fotografía corporativa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero />

        {/* Featured Carousel */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CarouselFeatured 
            items={featuredItems} 
            title="Trabajos Destacados"
          />
        </motion.section>

        {/* Category Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CategoryGrid />
        </motion.section>

        {/* About Preview Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 lg:py-24 bg-gray-50"
        >
          <div className="container-max section-padding">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-6">
                Una mirada única al mundo
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Cada fotografía cuenta una historia. Mi objetivo es capturar no solo imágenes, 
                sino emociones, momentos únicos y la esencia auténtica de cada sujeto. 
                Con más de 5 años de experiencia, me especializo en crear recuerdos que perduran para siempre.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">500+</span>
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Proyectos Realizados</h3>
                  <p className="text-gray-600 text-sm">Cada proyecto único y personalizado</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">5+</span>
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Años de Experiencia</h3>
                  <p className="text-gray-600 text-sm">Perfeccionando mi arte día a día</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Especialidades</h3>
                  <p className="text-gray-600 text-sm">Deporte, paisajes, retratos y corporativo</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 lg:py-24 bg-primary text-white"
        >
          <div className="container-max section-padding text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Me encantaría conocer tu historia y ayudarte a capturarla de la manera más auténtica y emocional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/contact"
                className="btn-primary bg-accent hover:bg-accent/90"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Trabajemos Juntos
              </motion.a>
              <motion.a
                href="/portfolio"
                className="btn-secondary border-white text-white hover:bg-white hover:text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Portfolio Completo
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  )
}

export default Home
