import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle, Send } from 'lucide-react'
import ContactForm from './ContactForm'

const Contact = () => {
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
            Hablemos de tu Proyecto
          </h2>
        </motion.div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary">
                  Envíame un Mensaje
                </h3>
              </div>
              <ContactForm />
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-primary mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={info.title}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group focus-visible"
                    >
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">
                          {info.title}
                        </h4>
                        <p className="text-primary font-medium mb-1 text-sm">
                          {info.content}
                        </p>
                        <p className="text-xs text-gray-600">
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
              <h4 className="font-display text-lg font-bold text-primary mb-4">
                Redes Sociales
              </h4>
              <div className="space-y-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group focus-visible"
                    >
                      <div className={`w-8 h-8 ${social.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-primary text-sm">
                          {social.name}
                        </h5>
                        <p className="text-xs text-gray-600">
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

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-primary mb-4">
              Preguntas Frecuentes
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Respuestas a las dudas más comunes sobre mis servicios y proceso de trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <h4 className="font-semibold text-lg text-primary mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary rounded-2xl p-8 lg:p-12 text-white text-center"
        >
          <h3 className="font-display text-2xl lg:text-3xl font-bold mb-4">
            ¿Listo para crear algo increíble juntos?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Cada proyecto es una nueva aventura. Me encantaría conocer tu historia 
            y ayudarte a capturarla de la manera más auténtica posible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:hola@lulufotografia.com"
              className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors duration-200"
            >
              <Mail className="h-5 w-5" />
              <span>Enviar Email</span>
            </a>
            <a
              href="tel:+34600123456"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-200"
            >
              <Phone className="h-5 w-5" />
              <span>Llamar Ahora</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
