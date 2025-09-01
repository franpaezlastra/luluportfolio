import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'
import { Play } from 'lucide-react'

const VideoGrid = ({ videos, loading = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-video bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <Play className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">
          No se encontraron videos
        </h3>
        <p className="text-gray-600">
          Intenta cambiar los filtros para ver más contenido
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {videos.map((video) => (
          <motion.div
            key={video.id}
            variants={itemVariants}
            layout
            className="group"
          >
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Video Player */}
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <ReactPlayer
                  url={video.src}
                  width="100%"
                  height="100%"
                  light={video.poster || true}
                  playIcon={
                    <div className="flex items-center justify-center w-16 h-16 bg-accent/90 rounded-full group-hover:bg-accent transition-colors duration-200">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  }
                  controls
                  playing={false}
                  config={{
                    file: {
                      attributes: {
                        poster: video.poster
                      }
                    }
                  }}
                />
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {video.caption}
                </p>
                
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                    {video.category}
                  </span>
                  
                  {/* Duration or additional info could go here */}
                  <div className="text-xs text-gray-500">
                    Video
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default VideoGrid
