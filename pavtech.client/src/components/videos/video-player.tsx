"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  videoUrl: string
  onTimeUpdate?: (currentTime: number) => void
  onDurationChange?: (duration: number) => void
  onVideoRef?: (ref: HTMLVideoElement) => void
  isPlaying?: boolean
  setIsPlaying?: (isPlaying: boolean) => void
}

export function VideoPlayer({
  videoUrl,
  onTimeUpdate,
  onDurationChange,
  onVideoRef,
  isPlaying: externalIsPlaying,
  setIsPlaying: setExternalIsPlaying,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Sincronizar estado de reproducción externo si se proporciona
  useEffect(() => {
    if (externalIsPlaying !== undefined) {
      setIsPlaying(externalIsPlaying)
    }
  }, [externalIsPlaying])

  // Proporcionar la referencia del video al componente padre si se solicita
  useEffect(() => {
    if (onVideoRef && videoRef.current) {
      onVideoRef(videoRef.current)
    }
  }, [onVideoRef])

  // Manejar la reproducción/pausa del video
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Error al reproducir el video:", error)
          setIsPlaying(false)
          if (setExternalIsPlaying) setExternalIsPlaying(false)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying, setExternalIsPlaying])

  // Manejar el volumen y silencio
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
      videoRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  // Ocultar controles después de un tiempo de inactividad
  const showControls = () => {
    setIsControlsVisible(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false)
      }
    }, 3000)
  }

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  // Formatear tiempo en formato mm:ss
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Manejar cambio en la barra de progreso
  const handleProgressChange = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  // Manejar cambio en el volumen
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  // Avanzar/retroceder 10 segundos
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration)
    }
  }

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0)
    }
  }

  return (
    <div
      className="relative w-full aspect-video bg-black"
      onMouseMove={showControls}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full"
        onClick={() => {
          const newPlayingState = !isPlaying
          setIsPlaying(newPlayingState)
          if (setExternalIsPlaying) setExternalIsPlaying(newPlayingState)
        }}
        onTimeUpdate={(e) => {
          const newTime = e.currentTarget.currentTime
          setCurrentTime(newTime)
          if (onTimeUpdate) onTimeUpdate(newTime)
        }}
        onDurationChange={(e) => {
          const newDuration = e.currentTarget.duration
          setDuration(newDuration)
          if (onDurationChange) onDurationChange(newDuration)
        }}
        onEnded={() => {
          setIsPlaying(false)
          if (setExternalIsPlaying) setExternalIsPlaying(false)
        }}
      />

      {/* Controles del reproductor */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          isControlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Barra de progreso */}
        <div className="mb-2">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleProgressChange}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Botones de control */}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={skipBackward}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-white hover:bg-white/20"
              onClick={() => {
                const newPlayingState = !isPlaying
                setIsPlaying(newPlayingState)
                if (setExternalIsPlaying) setExternalIsPlaying(newPlayingState)
              }}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={skipForward}>
              <SkipForward className="h-5 w-5" />
            </Button>

            {/* Tiempo actual / duración */}
            <div className="text-white text-sm ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Control de volumen */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
