'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

interface CarouselImage {
  src: string
  alt: string
}

interface CarouselProps {
  images: CarouselImage[]
  autoPlay?: boolean
  intervalMs?: number
  className?: string
}

const Carousel = ({ images, autoPlay = true, intervalMs = 3500, className = '' }: CarouselProps) => {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const safeImages = useMemo(() => images.filter(Boolean), [images])

  const next = () => setIndex((i) => (i + 1) % safeImages.length)
  const prev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length)

  useEffect(() => {
    if (!autoPlay || paused || safeImages.length <= 1) return
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(next, intervalMs)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [index, autoPlay, paused, intervalMs, safeImages.length])

  if (safeImages.length === 0) return null

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl shadow-2xl border border-white/10 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides - crossfade */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/3]">
        {safeImages.map((img, i) => (
          <div
            key={img.src + i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== index}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 960px"
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
      </div>

      {/* Controls */}
      {safeImages.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 rounded-full p-2 transition-all duration-200"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 rounded-full p-2 transition-all duration-200"
          >
            ›
          </button>
        </>
      )}

      {/* Indicators */}
      {safeImages.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {safeImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-white' : 'w-2.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel


