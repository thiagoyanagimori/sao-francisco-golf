import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERIF = "'Cormorant Garamond', Georgia, serif"
const MONO = "'DM Mono', monospace"
const GOLD = 'rgba(197, 164, 101, 0.75)'

const IMAGES = [
  { src: '1.jpg', caption: 'Tradição cercada pela natureza.' },
  { src: '2.jpg', caption: 'Greens em meio à mata preservada.' },
  { src: '3.jpg', caption: 'Precisão e exclusividade.' },
  { src: '4.jpg', caption: 'Natureza em estado puro.' },
  { src: '5.jpg', caption: 'Paisagens únicas do campo.' },
  { src: '6.jpg', caption: 'Elegância e sofisticação.' },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gal-item').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            delay: (i % 3) * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (selected === null) return
    document.body.style.overflow = 'hidden'

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowLeft')
        setSelected((s) => (s !== null ? (s - 1 + IMAGES.length) % IMAGES.length : null))
      if (e.key === 'ArrowRight')
        setSelected((s) => (s !== null ? (s + 1) % IMAGES.length : null))
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [selected])

  const prev = () => setSelected((s) => (s !== null ? (s - 1 + IMAGES.length) % IMAGES.length : null))
  const next = () => setSelected((s) => (s !== null ? (s + 1) % IMAGES.length : null))

  return (
    <section id="galeria" ref={sectionRef} className="relative py-40 overflow-hidden" style={{ background: '#060606' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="block w-12 h-px" style={{ background: GOLD }} />
          <span
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.3)' }}
          >
            Galeria
          </span>
        </div>

        <h2
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: '4rem',
          }}
        >
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>São Francisco</em>
          <br />
          Golf Club
        </h2>

        {/* Main 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          {IMAGES.slice(0, 3).map((img, i) => (
            <div
              key={i}
              className="gal-item relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: '16/10' }}
              onClick={() => setSelected(i)}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.72) saturate(0.85)',
                  transition: 'transform 0.7s ease, filter 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLImageElement
                  el.style.transform = 'scale(1.06)'
                  el.style.filter = 'brightness(0.85) saturate(0.9)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLImageElement
                  el.style.transform = 'scale(1)'
                  el.style.filter = 'brightness(0.72) saturate(0.85)'
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none flex items-end p-5"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = '0' }}
              >
                <p
                  className="uppercase"
                  style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}
                >
                  {img.caption}
                </p>
              </div>
              {/* Hover overlay via group */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 flex items-end p-5"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
                  transition: 'opacity 0.4s ease',
                }}
              >
                <p
                  className="uppercase"
                  style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}
                >
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 3-column grid (slightly shorter) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {IMAGES.slice(3).map((img, i) => (
            <div
              key={i + 3}
              className="gal-item relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: '16/10' }}
              onClick={() => setSelected(i + 3)}
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{
                  filter: 'brightness(0.72) saturate(0.85)',
                  transition: 'transform 0.7s ease, filter 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLImageElement
                  el.style.transform = 'scale(1.06)'
                  el.style.filter = 'brightness(0.85) saturate(0.9)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLImageElement
                  el.style.transform = 'scale(1)'
                  el.style.filter = 'brightness(0.72) saturate(0.85)'
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 flex items-end p-5"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
                  transition: 'opacity 0.4s ease',
                }}
              >
                <p
                  className="uppercase"
                  style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}
                >
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.94)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-5xl mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={IMAGES[selected].src}
              alt={IMAGES[selected].caption}
              className="w-full h-auto block"
              style={{ filter: 'brightness(0.92)' }}
            />

            {/* Caption */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
            >
              <p
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.45)' }}
              >
                {IMAGES[selected].caption}
              </p>
            </div>

            {/* Counter */}
            <div
              className="absolute top-4 left-4"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}
            >
              {selected + 1} / {IMAGES.length}
            </div>

            {/* Close */}
            <button
              className="absolute top-4 right-4 flex items-center justify-center"
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.55)',
                fontFamily: MONO,
                fontSize: '18px',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.55)',
                fontFamily: MONO,
                fontSize: '20px',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onClick={prev}
            >
              ‹
            </button>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.55)',
                fontFamily: MONO,
                fontSize: '20px',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onClick={next}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
