import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm'

const Contact = () => {
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

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+34 600 123 456',
      href: 'tel:+34600123456',
      description: 'Llámame para consultas rápidas'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hola@lulufotografia.com',
      href: 'mailto:hola@lulufotografia.com',
      description: 'La mejor forma de contactarme'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      content: 'Madrid, España',
      href: '#',
      description: 'Disponible para sesiones en toda España'
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lun - Vie: 9:00 - 19:00',
      href: '#',
      description: 'Fines de semana con cita previa'
    }
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: Instagram,
      color: 'bg-pink-500',
      description: 'Sígueme para ver mi trabajo diario'
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/34600123456',
      icon: MessageCircle,
      color: 'bg-green-500',
      description: 'Mensaje directo para consultas rápidas'
    }
  ]

  const faqs = [
    {
      question: '¿Cuál es tu estilo fotográfico?',
      answer: 'Mi estilo se caracteriza por capturar emociones auténticas con una estética natural y elegante. Me adapto al estilo que mejor represente a cada cliente.'
    },
    {
      question: '¿Viajas para sesiones?',
      answer: 'Sí, estoy disponible para sesiones en toda España. Para destinos internacionales, consulta condiciones especiales.'
    },
    {
      question: '¿Cuánto tiempo tarda la entrega?',
      answer: 'Normalmente entrego las fotos editadas en 2-3 semanas. Para eventos urgentes, ofrezco servicio express con un coste adicional.'
    },
    {
      question: '¿Incluyes la edición?',
      answer: 'Sí, todas mis sesiones incluyen edición profesional. Cada imagen es cuidadosamente retocada para obtener el mejor resultado.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contacto | Lulu - Fotógrafa Profesional</title>
        <meta 
          name="description" 
          content="¿Tienes un proyecto en mente? Contáctame para hablar sobre tu sesión de fotos. Disponible en Madrid y toda España para capturar tus momentos especiales." 
        />
        <meta 
          name="keywords" 
          content="contacto fotógrafa, sesión fotos Madrid, contratar fotógrafa, presupuesto fotografía" 
        />
        <meta property="og:title" content="Contacto | Lulu - Fotógrafa Profesional" />
        <meta property="og:description" content="¿Tienes un proyecto en mente? Contáctame para hablar sobre tu sesión de fotos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/contact" />
      </Helmet>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen pt-20 lg:pt-24"
      >
        {/* Header */}
        <section className="py-16 lg:py-24">
          <div className="container-max section-padding">
            <div className="text-center mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl lg:text-5xl font-bold text-primary mb-4"
              >
                Hablemos de tu Proyecto
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Cada proyecto es único y me emociona conocer tu historia. 
                Cuéntame tu idea y hagamos realidad esas imágenes que tienes en mente.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="font-display text-2xl font-bold text-primary mb-6">
                    Envíame un Mensaje
                  </h2>
                  <ContactForm />
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-display text-2xl font-bold text-primary mb-6">
                    Información de Contacto
                  </h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon
                      return (
                        <motion.a
                          key={info.title}
                          href={info.href}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group focus-visible"
                        >
                          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                            <Icon className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary mb-1">
                              {info.title}
                            </h3>
                            <p className="text-primary font-medium mb-1">
                              {info.content}
                            </p>
                            <p className="text-sm text-gray-600">
                              {info.description}
                            </p>
                          </div>
                        </motion.a>
                      )
                    })}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-display text-xl font-bold text-primary mb-4">
                    Redes Sociales
                  </h3>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon
                      return (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group focus-visible"
                        >
                          <div className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-primary">
                              {social.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {social.description}
                            </p>
                          </div>
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Respuestas a las dudas más comunes sobre mis servicios y proceso de trabajo.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <h3 className="font-semibold text-lg text-primary mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Placeholder Section */}
        <section className="py-16 lg:py-24">
          <div className="container-max section-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary mb-4">
                Mi Ubicación
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Basada en Madrid, pero disponible para sesiones en toda España y destinos especiales.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center"
            >
              <div className="text-center text-gray-500">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold mb-2">Madrid, España</h3>
                <p>Mapa interactivo próximamente</p>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  )
}

export default Contact
