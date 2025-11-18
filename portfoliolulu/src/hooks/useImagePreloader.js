import { useState, useEffect } from 'react'
import { gallery } from '../data/gallery'

// También incluir imágenes del Hero y About (deben coincidir con las constantes en los componentes)
const HERO_IMAGE = 'https://res.cloudinary.com/dum0alaoe/image/upload/v1763044138/lulu_wekilz.jpg'
const ABOUT_IMAGE = 'https://res.cloudinary.com/dum0alaoe/image/upload/v1763044138/luluabout_oqnxwh.jpg'
const ABOUT_PAGE_IMAGE = 'https://res.cloudinary.com/dum0alaoe/image/upload/v1763044138/luluabout_oqnxwh.jpg'

const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Obtener todas las URLs de imágenes
    const allImageUrls = [
      HERO_IMAGE,
      ABOUT_IMAGE,
      ABOUT_PAGE_IMAGE,
      ...Object.values(gallery).flat()
    ].filter(Boolean) // Filtrar URLs vacías

    let loadedCount = 0
    const totalImages = allImageUrls.length

    if (totalImages === 0) {
      setImagesLoaded(true)
      return
    }

    const imagePromises = allImageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        
        img.onload = () => {
          loadedCount++
          const progress = Math.round((loadedCount / totalImages) * 100)
          setLoadingProgress(progress)
          resolve()
        }
        
        img.onerror = () => {
          loadedCount++
          const progress = Math.round((loadedCount / totalImages) * 100)
          setLoadingProgress(progress)
          // Resolver incluso si hay error para no bloquear el sitio
          resolve()
        }
        
        img.src = url
      })
    })

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true)
    })
  }, [])

  return { imagesLoaded, loadingProgress }
}

export default useImagePreloader

