import { motion } from 'framer-motion'

const Clientes = () => {
  const clientesImage = 'https://res.cloudinary.com/dum0alaoe/image/upload/v1763394664/todasEmpresas_y2q3pt.webp'

  return (
    <section className="pt-16 pb-6 lg:pt-24 lg:pb-2 bg-white text-black">
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
            <span className="hidden sm:block w-12 h-px bg-black/15" />
            <div className="relative inline-block">
              <h2 className="text-4xl lg:text-5xl font-montserrat font-bold">
                Clientes
              </h2>
            </div>
            <span className="hidden sm:block w-12 h-px bg-black/15" />
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex justify-center"
        >
          <img
            src={clientesImage}
            alt="Clientes de Lulu"
            className="w-full max-w-4xl h-auto object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default Clientes

