'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface Location {
  id: string
  name: string
  addressLines: string[]
  phone?: string
  addressQuery: string
}

const LOCATIONS: Location[] = [
  {
    id: 'loftus',
    name: 'Loftus',
    addressLines: [
      'Floralcraft Loftus',
      'Temperance Square, West Road,',
      'Loftus, Saltburn-by-the-Sea,',
      'TS13 4RG',
      '01287643633',
    ],
    addressQuery: 'Floralcraft Loftus, Temperance Square, West Road, Loftus, Saltburn-by-the-Sea, TS13 4RG',
  },
  {
    id: 'stokesley',
    name: 'Stokesley',
    addressLines: [
      'Floralcraft Stokesley',
      '5 Three Tuns Wynd,',
      'Stokesley, Middlesbrough,',
      'TS9 5DQ',
      '01642 712242',
    ],
    addressQuery: 'Floralcraft Stokesley, 5 Three Tuns Wynd, Stokesley, TS9 5DQ',
  },
]

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

// Fallback coordinates if geocoding fails (lng/lat swapped for Google object)
const FALLBACK_COORDS: Record<string, google.maps.LatLngLiteral> = {
  loftus: { lat: 54.55463, lng: -0.890912 },
}

const Locations = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const geocoderRef = useRef<google.maps.Geocoder | null>(null)
  const markersRef = useRef<Record<string, google.maps.Marker>>({})
  const markerPosRef = useRef<Record<string, google.maps.LatLngLiteral>>({})
  const [activeId, setActiveId] = useState<string>(LOCATIONS[0].id)

  const activeIndex = useMemo(() => LOCATIONS.findIndex(l => l.id === activeId), [activeId])

  // Smooth fly animation
  const flyTo = (map: google.maps.Map, target: google.maps.LatLngLiteral, targetZoom = 14, duration = 800) => {
    const start = performance.now()
    const startCenter = map.getCenter()!
    const startZoom = map.getZoom() || 12
    const from = { lat: startCenter.lat(), lng: startCenter.lng() }

    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const k = ease(t)
      const lat = from.lat + (target.lat - from.lat) * k
      const lng = from.lng + (target.lng - from.lng) * k
      const zoom = startZoom + (targetZoom - startZoom) * k
      map.setCenter({ lat, lng })
      map.setZoom(zoom)
      if (t < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  // Init Google Maps
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return
    if (!GOOGLE_MAPS_API_KEY) {
      // eslint-disable-next-line no-console
      console.warn('Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY')
      return
    }

    const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY, version: 'weekly', libraries: [] })

    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary
      const { Geocoder } = (await google.maps.importLibrary('geocoding')) as google.maps.GeocodingLibrary

      const map = new Map(mapContainerRef.current as HTMLDivElement, {
        center: { lat: 54.5582, lng: -0.8956 },
        zoom: 12,
        gestureHandling: 'greedy',
        clickableIcons: true,
        disableDefaultUI: true,
      })

      const geocoder = new Geocoder()

      mapRef.current = map
      geocoderRef.current = geocoder

      // Geocode and add markers
      for (const loc of LOCATIONS) {
        geocoder.geocode({ address: loc.addressQuery, region: 'GB' }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const position = results[0].geometry.location!
            const pos = { lat: position.lat(), lng: position.lng() }
            markerPosRef.current[loc.id] = pos
            const marker = new google.maps.Marker({ position: pos, map, title: loc.name, animation: google.maps.Animation.DROP })
            markersRef.current[loc.id] = marker
            marker.addListener('click', () => handleSelect(loc))
          } else {
            const fb = FALLBACK_COORDS[loc.id]
            if (fb) {
              markerPosRef.current[loc.id] = fb
              const marker = new google.maps.Marker({ position: fb, map, title: loc.name, animation: google.maps.Animation.DROP })
              markersRef.current[loc.id] = marker
              marker.addListener('click', () => handleSelect(loc))
            } else {
              // eslint-disable-next-line no-console
              console.warn('Geocode failed', status, loc)
            }
          }
        })
      }
    })
  }, [])

  const handleSelect = (loc: Location) => {
    setActiveId(loc.id)
    const map = mapRef.current
    const geocoder = geocoderRef.current
    if (!map) return

    // If we already have a position, fly to it. Otherwise geocode then fly.
    const cached = markerPosRef.current[loc.id]
    if (cached) {
      flyTo(map, cached, 14)
      return
    }

    if (!geocoder) return
    geocoder.geocode({ address: loc.addressQuery, region: 'GB' }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const p = results[0].geometry.location!
        const pos = { lat: p.lat(), lng: p.lng() }
        markerPosRef.current[loc.id] = pos
        flyTo(map, pos, 14)
      } else if (FALLBACK_COORDS[loc.id]) {
        flyTo(map, FALLBACK_COORDS[loc.id], 14)
      }
    })
  }

  const highlightWidth = `${100 / LOCATIONS.length}%`
  const highlightLeft = `${(activeIndex * 100) / LOCATIONS.length}%`

  return (
    <section className="w-full">
      {/* Gradient background like hero */}
      <div className="relative w-full">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0D383B] via-[#0D383B] to-[#142424]"
          style={{ background: 'linear-gradient(to right, #0D383B 39%, #142424 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center py-10">
            <h2 className="text-5xl md:text-6xl font-serif font-semibold text-white">Our Locations</h2>
            <p className="mt-3 text-teal-100">Say hello to our friendly team at one of these locations.</p>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white">
            <div ref={mapContainerRef} className="w-full h-[360px] sm:h-[440px] lg:h-[520px]" />
          </div>

          {/* Animated separator line */}
          <div className="relative mt-10">
            <div className="h-[2px] bg-white" />
            <div
              className="absolute top-0 h-[2px] bg-[#5DADAC] transition-all duration-500 ease-out"
              style={{ width: highlightWidth, left: highlightLeft }}
            />
          </div>

          {/* Locations list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className={`text-left rounded-xl p-6 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 border ${
                  activeId === loc.id ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <h3 className="text-white font-serif text-2xl mb-3">{loc.name}</h3>
                <div className="space-y-1 text-teal-100">
                  {loc.addressLines.map((line) => (
                    <p key={line} className="text-sm">{line}</p>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="h-8" />
        </div>
      </div>
    </section>
  )
}

export default Locations