import { Camera, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: Instagram,
      label: 'Síguenos en Instagram'
    },
    {
      name: 'Email',
      href: 'mailto:hola@lulufotografia.com',
      icon: Mail,
      label: 'Envíanos un email'
    },
    {
      name: 'Teléfono',
      href: 'tel:+34600123456',
      icon: Phone,
      label: 'Llámanos'
    }
  ]

  const quickLinks = [
    { name: 'Inicio', sectionId: 'inicio' },
    { name: 'Sobre mí', sectionId: 'sobre-mi' },
    { name: 'Galería', sectionId: 'galeria' },
    { name: 'Contacto', sectionId: 'contacto' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80
      const elementPosition = element.offsetTop - navHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="bg-primary text-white">
      <div className="container-max section-padding">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="inline-flex items-center space-x-2 group focus-visible mb-4"
              aria-label="Ir al inicio"
            >
              <Camera className="h-8 w-8 text-accent group-hover:scale-110 transition-transform duration-200" />
              <span className="font-display text-2xl font-semibold">
                Lulu
              </span>
            </button>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Capturando momentos únicos y emociones auténticas a través de mi lente. 
              Especializada en fotografía deportiva, paisajes, retratos y eventos corporativos.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm">Madrid, España</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Navegación
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.sectionId}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-gray-300 hover:text-accent transition-colors duration-200 focus-visible"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">
              Conecta conmigo
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-300 hover:text-accent transition-colors duration-200 focus-visible group"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm">{social.name}</span>
                  </a>
                )
              })}
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <p className="text-gray-300 text-sm">
                <strong>Email:</strong> hola@lulufotografia.com
              </p>
              <p className="text-gray-300 text-sm">
                <strong>Teléfono:</strong> +34 600 123 456
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Lulu Fotografía. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a 
                href="#" 
                className="hover:text-accent transition-colors duration-200 focus-visible"
              >
                Política de Privacidad
              </a>
              <a 
                href="#" 
                className="hover:text-accent transition-colors duration-200 focus-visible"
              >
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
