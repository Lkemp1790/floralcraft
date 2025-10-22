import React from 'react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full -mt-20 overflow-hidden lg:overflow-visible">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0D383B] via-[#0D383B] to-[#142424]"
        style={{
          background: 'linear-gradient(to right, #0D383B 39%, #142424 100%)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16 sm:py-20 pt-36">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-light font-serif text-white leading-tight">
              A bouquet for every occasion.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Crafting extraordinary floral experiences that celebrate life's most precious moments with artisanal elegance and natural splendor
            </p>
          </div>

            {/* Right Side - Hero Image */}
            <div className="flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hero3.jpeg"
                    alt="Beautiful floral bouquet held by hand"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  {/* Subtle overlay for depth - only on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent lg:hidden" />
                  {/* Decorative border - only on mobile */}
                  <div className="absolute inset-0 rounded-3xl border border-white/10 lg:hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection