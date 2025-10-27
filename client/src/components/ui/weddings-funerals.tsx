'use client'
import React from 'react'
import Carousel from './carousel'

const WeddingsFunerals = () => {
  const weddingImages = [
    { src: '/category1.jpg', alt: 'Elegant wedding bouquet with white roses' },
    { src: '/category3.jpg', alt: 'Reception florals with greenery' },
    { src: '/hero2.png', alt: 'Bridal florals detail' },
  ]

  const funeralImages = [
    { src: '/category2.jpg', alt: 'Sympathy arrangement with lilies' },
    { src: '/category4.jpg', alt: 'Wreath with seasonal flowers' },
    { src: '/hero.png', alt: 'Serene floral arrangement' },
  ]

  return (
    <section className="w-full">
      {/* Gradient background consistent with site */}
      <div className="relative w-full">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0D383B] via-[#0D383B] to-[#142424]"
          style={{ background: 'linear-gradient(to right, #0D383B 39%, #142424 100%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-serif font-semibold text-white">Weddings & Funerals</h2>
            <p className="mt-3 text-teal-100 max-w-2xl mx-auto">
              From joyful vows to heartfelt farewells, our florals honor every moment with care and artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Weddings */}
            <div className="group">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <Carousel images={weddingImages} />
              </div>
              <div className="mt-6 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-200 group-hover:bg-white/10">
                <h3 className="text-white font-serif text-3xl mb-3">Weddings</h3>
                <p className="text-teal-100">
                  Bespoke bridal bouquets, ceremony installations, and reception florals crafted to your palette and style.
                </p>

              </div>
            </div>

            {/* Funerals */}
            <div className="group">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <Carousel images={funeralImages} />
              </div>
              <div className="mt-6 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors duration-200 group-hover:bg-white/10">
                <h3 className="text-white font-serif text-3xl mb-3">Funerals</h3>
                <p className="text-teal-100">
                  Thoughtful tributes including wreaths, sprays, and bespoke arrangements handled with compassion.
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeddingsFunerals


