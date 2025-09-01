import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Camera, Award, Heart, Users, ArrowRight } from 'lucide-react'

const About = () => {
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

  const skills = [
    {
      name: 'Fotografía Deportiva',
      level: 95,
      description: 'Capturando la intensidad y emoción del deporte'
    },
    {
      name: 'Paisajes',
      level: 90,
      description: 'La belleza natural en su máximo esplendor'
    },
    {
      name: 'Retratos',
      level: 88,
      description: 'Revelando la personalidad única de cada persona'
    },
    {
      name: 'Fotografía Corporativa',
      level: 92,
      description: 'Profesionalismo y elegancia en cada imagen'
    }
  ]

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

  return (
    <>
      <Helmet>
        <title>Sobre mí | Lulu - Fotógrafa Profesional</title>
        <meta 
          name="description" 
          content="Conoce la historia detrás de la lente. Soy Lulu, fotógrafa profesional con más de 5 años de experiencia capturando momentos únicos y emociones auténticas." 
        />
        <meta 
          name="keywords" 
          content="sobre mí, fotógrafa profesional, biografía, experiencia fotografía, Lulu fotógrafa" 
        />
        <meta property="og:title" content="Sobre mí | Lulu - Fotógrafa Profesional" />
        <meta property="og:description" content="Conoce la historia detrás de la lente. Fotógrafa profesional con pasión por capturar momentos únicos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/about" />
      </Helmet>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 lg:pt-24"
      >
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container-max section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="/demo/photographer.jpg"
                      alt="Lulu - Fotógrafa Profesional"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="order-1 lg:order-2"
              >
                <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary mb-6">
                  Hola, soy <span className="text-accent">Lulu</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Fotógrafa profesional con más de 5 años de experiencia capturando momentos únicos 
                  y emociones auténticas. Mi pasión por la fotografía comenzó cuando descubrí que 
                  cada imagen tiene el poder de contar una historia y evocar sentimientos profundos.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Especializada en fotografía deportiva, paisajes, retratos y eventos corporativos, 
                  mi objetivo es crear imágenes que no solo documenten momentos, sino que los 
                  transformen en recuerdos eternos llenos de significado.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 btn-primary"
                  >
                    <span>Trabajemos Juntos</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center space-x-2 btn-secondary"
                  >
                    <span>Ver mi Trabajo</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container-max section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
                Mi Filosofía
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Estos son los valores que guían cada proyecto y cada click de mi cámara.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg text-primary mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 lg:py-24">
          <div className="container-max section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
                Especialidades
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Áreas donde he desarrollado expertise a lo largo de mi carrera profesional.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg text-primary">
                      {skill.name}
                    </h3>
                    <span className="text-accent font-semibold">
                      {skill.level}%
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {skill.description}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                      className="bg-accent h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container-max section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Mi Trayectoria
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Un viaje de crecimiento constante y pasión por capturar la belleza del mundo.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-accent mb-2">2019</div>
                <h3 className="font-semibold text-lg mb-2">Inicios</h3>
                <p className="text-gray-300">
                  Comenzé mi carrera profesional especializándome en fotografía deportiva
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl font-bold text-accent mb-2">2021</div>
                <h3 className="font-semibold text-lg mb-2">Expansión</h3>
                <p className="text-gray-300">
                  Amplié mi portafolio incluyendo paisajes y fotografía de retratos
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-4xl font-bold text-accent mb-2">2024</div>
                <h3 className="font-semibold text-lg mb-2">Presente</h3>
                <p className="text-gray-300">
                  Fotógrafa establecida con más de 500 proyectos exitosos completados
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container-max section-padding text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-6">
                ¿Listo para crear algo increíble juntos?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Cada proyecto es una nueva aventura. Me encantaría conocer tu historia 
                y ayudarte a capturarla de la manera más auténtica posible.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 btn-primary"
              >
                <span>Hablemos de tu Proyecto</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default About
