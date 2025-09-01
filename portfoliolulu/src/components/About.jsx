import { motion } from 'framer-motion'
import { Camera, Award, Heart, Users, Star, MapPin } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Camera,
      title: 'Pasión por la Fotografía',
      description: 'Cada click del obturador es una oportunidad de crear algo único y memorable.'
    },
    {
      icon: Heart,
      title: 'Conexión Emocional',
      description: 'Busco capturar no solo imágenes, sino las emociones y historias detrás de cada momento.'
    },
    {
      icon: Award,
      title: 'Excelencia Técnica',
      description: 'Combino creatividad artística con dominio técnico para resultados excepcionales.'
    },
    {
      icon: Users,
      title: 'Enfoque Personal',
      description: 'Cada cliente es único, y adapto mi estilo para reflejar su personalidad y visión.'
    }
  ]

  const stats = [
    { number: '500+', label: 'Proyectos Realizados', description: 'Cada proyecto único y personalizado' },
    { number: '5+', label: 'Años de Experiencia', description: 'Perfeccionando mi arte día a día' },
    { number: '4', label: 'Especialidades', description: 'Deporte, paisajes, retratos y corporativo' },
    { number: '98%', label: 'Clientes Satisfechos', description: 'Recomiendan mi trabajo' }
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
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
            Sobre mí
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Soy Lulu, una fotógrafa profesional con más de 5 años de experiencia capturando 
            momentos únicos y emociones auténticas. Mi pasión es contar historias a través de cada imagen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=1000&fit=crop&crop=center"
                  alt="Lulu - Fotógrafa Profesional"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
              
              {/* Location badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-primary">Tucumán, Argentina</span>
              </div>

              {/* Rating badge */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm font-medium text-primary">5.0</span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-primary mb-6">
              Una mirada única al mundo
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Mi viaje en la fotografía comenzó cuando descubrí que cada imagen tiene el poder 
                de contar una historia y evocar sentimientos profundos. Lo que empezó como una 
                pasión se convirtió en mi forma de vida.
              </p>
              <p>
                Especializada en fotografía deportiva, paisajes, retratos y eventos corporativos, 
                mi objetivo es crear imágenes que no solo documenten momentos, sino que los 
                transformen en recuerdos eternos llenos de significado.
              </p>
              <p>
                Cada proyecto es una nueva aventura, una oportunidad de conectar con personas 
                increíbles y capturar su esencia de la manera más auténtica posible.
              </p>
            </div>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">500+</div>
                <div className="text-sm text-gray-600">Proyectos</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">5+</div>
                <div className="text-sm text-gray-600">Años</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-primary text-center mb-12">
            Mi Filosofía
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="font-semibold text-lg text-primary mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary rounded-2xl p-8 lg:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl lg:text-3xl font-bold mb-4">
              Mi Trayectoria en Números
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Cada número representa historias capturadas, momentos inmortalizados y sueños hechos realidad.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-lg mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
