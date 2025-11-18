import { motion } from 'framer-motion'
import { Camera, Award, Heart, Users, MapPin } from 'lucide-react'

const ABOUT_IMAGE = 'https://res.cloudinary.com/dum0alaoe/image/upload/v1763044138/luluabout_oqnxwh.jpg'
const ABOUT_GALLERY_TOP = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763388261/About1_abogiz.webp'
]
const ABOUT_GALLERY_BOTTOM = [
  'https://res.cloudinary.com/dum0alaoe/image/upload/v1763388261/About2_2_fiinpm.webp'
]
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
    <section className="pt-16 pb-5 lg:pt-24 bg-black">
      <div className="container-max section-padding">
       

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start mb-20">
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
                  src={ABOUT_IMAGE}
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
            <h3 className="font-montserrat text-2xl text-white lg:text-3xl font-bold mb-6">
              Sobre mí
            </h3>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                Mi nombre es Lourdes (aunque todos los que me conocen me dicen Lulu). Nací en junio del 2000 en Tucumán, Argentina, y desde chica encontré un refugio en mirar el mundo en silencio.
              </p>
              <p>
                Mientras otros hablaban, yo observaba: el jardín de mi casa, las formas, las luces, los pequeños detalles que para mí siempre tuvieron algo para decir. Con el tiempo entendí que esa forma de mirar era también una forma de expresarme.
              </p>
              <div className="w-full py-2 space-y-3">
                {ABOUT_GALLERY_TOP.map((photo, index) => (
                  <div key={`${photo}-${index}`} className="w-full overflow-hidden rounded-2xl">
                    <img
                      src={photo}
                      alt={`Proyecto fotográfico ${index + 1} de Lulu`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <p>
                Soy fotógrafa y creadora audiovisual. Empecé estudiando multimedial, después hice distintos cursos de fotografía, trabajé en empresas y agencias… pero siempre volví al mismo lugar: crear. Registrar. Contar historias a través de lo que veo y siento.
              </p>
              <p>
                Algo que me define es la versatilidad. Puedo pasar de un retrato a un show, de gastronomía a arquitectura, de un proyecto íntimo a uno lleno de movimiento. Cada mundo me enseña algo diferente. A veces siento que quizás nunca tenga un “estilo propio” en el sentido tradicional, pero al mismo tiempo eso me hace feliz. Me gusta experimentar, probar, moverme. Elegir todos los caminos no es fácil, pero por ahora es el único que quiero recorrer.
              </p>
              <div className="w-full py-2 space-y-3">
                {ABOUT_GALLERY_BOTTOM.map((photo, index) => (
                  <div key={`${photo}-${index}`} className="w-full overflow-hidden rounded-2xl">
                    <img
                      src={photo}
                      alt={`Proyecto fotográfico ${ABOUT_GALLERY_TOP.length + index + 1} de Lulu`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <p>
                Desde 2021 hago sesiones y desde marzo de este año me dedico 100% a esto. Me mueve capturar lo auténtico: una emoción real, un gesto, un instante que merece quedarse un poco más.
              </p>
              <p>
                Si te gusta mi forma de mirar y contar, bienvenida/o. Me encantaría pensar con vos cómo contar tu historia.
              </p>
            </div>


            {/* Quick stats */}
          </motion.div>
        </div>



        {/* Stats */}
       
      </div>
    </section>
  )
}

export default About
