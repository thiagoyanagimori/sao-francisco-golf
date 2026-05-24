import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERIF = "'Cormorant Garamond', Georgia, serif"
const MONO = "'DM Mono', monospace"
const GOLD = 'rgba(197, 164, 101, 0.75)'
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`

const STATS = [
  { label: 'Buracos', value: 9, suffix: '' },
  { label: 'Tees', value: 18, suffix: '' },
  { label: 'Par', value: 71, suffix: '' },
  { label: 'Anos de Tradição', value: 90, suffix: '+' },
]

const FEATURES: { title: string; desc?: string; items?: string[] }[] = [
  {
    title: 'Lagoas naturais',
    desc: 'Integradas ao percurso, criando obstáculos de água em múltiplos buracos — beleza e estratégia juntas.',
  },
  {
    title: 'Fauna nativa',
    desc: 'Jacarés, garças e vida silvestre convivem com os golfistas. Uma experiência única na América do Sul.',
  },
  {
    title: 'Serviços do clube',
    items: [
      'Caddies disponíveis',
      'Casa de tacos e bolas',
      'Aluguel de tacos, bolas e sapatos',
      'Driving range aberto das 7:00 às 18:00',
      'Vestiários e chuveiros',
    ],
  },
]

const CAROUSEL_IMAGES = [
  { src: '/images/campo.jpg', alt: 'Mapa do campo — São Francisco Golf Club' },
  { src: '/images/tabela.png', alt: 'Tabela do campo — São Francisco Golf Club' },
]

export default function CourseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [carouselIdx, setCarouselIdx] = useState(0)
  const touchStartX = useRef(0)

  const carouselPrev = () => setCarouselIdx((i) => (i - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)
  const carouselNext = () => setCarouselIdx((i) => (i + 1) % CAROUSEL_IMAGES.length)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.cs-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      counterRefs.current.forEach((el, i) => {
        if (!el) return
        const target = STATS[i].value
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString()
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="campo" ref={sectionRef} className="relative overflow-hidden" style={{ background: '#050505' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRAIN, backgroundSize: '128px 128px', opacity: 0.025 }}
      />

      {/* Stats bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="cs-reveal py-16 text-center px-6">
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.6rem',
                  }}
                >
                  <span ref={(el) => { counterRefs.current[i] = el }}>0</span>
                  <span style={{ color: GOLD }}>{stat.suffix}</span>
                </div>
                <div
                  className="uppercase"
                  style={{
                    fontFamily: MONO,
                    fontSize: '9px',
                    letterSpacing: '0.35em',
                    color: 'rgba(255,255,255,0.28)',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main course content */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-36">
        {/* Label */}
        <div className="cs-reveal flex items-center gap-4 mb-20">
          <span className="block w-12 h-px" style={{ background: GOLD }} />
          <span
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.3)' }}
          >
            O Campo
          </span>
        </div>

        {/* Text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-28">
          <div>
            <h2
              className="cs-reveal"
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
              }}
            >
              Um campo vivo,
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>entre lagoas e verde</em>
            </h2>
            <p
              className="cs-reveal"
              style={{
                fontFamily: MONO,
                fontSize: '12px',
                lineHeight: 1.95,
                color: 'rgba(255,255,255,0.34)',
                letterSpacing: '0.03em',
                maxWidth: '420px',
                marginBottom: '1.5rem',
              }}
            >
              Situado entre São Paulo e Osasco, o campo do São Francisco Golf Club oferece
              a experiência de um percurso maduro, rodeado por lagoas naturais, vegetação
              densa e uma fauna surpreendente.
            </p>
            <p
              className="cs-reveal"
              style={{
                fontFamily: MONO,
                fontSize: '12px',
                lineHeight: 1.95,
                color: 'rgba(255,255,255,0.34)',
                letterSpacing: '0.03em',
                maxWidth: '420px',
              }}
            >
              Com 9 buracos e 18 tees distintos, cada visita ao campo oferece uma
              configuração diferente — o percurso que se renova a cada rodada.
            </p>
          </div>

          {/* Carousel */}
          <div
            className="cs-reveal relative overflow-hidden"
            style={{ aspectRatio: '4/3' }}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={(e) => {
              const delta = touchStartX.current - e.changedTouches[0].clientX
              if (Math.abs(delta) > 50) delta > 0 ? carouselNext() : carouselPrev()
            }}
          >
            {/* Slides track */}
            <div
              className="flex h-full"
              style={{
                width: `${CAROUSEL_IMAGES.length * 100}%`,
                transform: `translateX(-${(carouselIdx * 100) / CAROUSEL_IMAGES.length}%)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {CAROUSEL_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="relative h-full flex-shrink-0"
                  style={{ width: `${100 / CAROUSEL_IMAGES.length}%` }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-contain"
                    style={{ filter: 'brightness(0.85) saturate(0.85)' }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.55) 0%, transparent 60%)' }}
            />

            {/* Prev arrow */}
            {carouselIdx > 0 && (
              <button
                onClick={carouselPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
                style={{
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(0,0,0,0.35)',
                  cursor: 'pointer',
                  fontFamily: MONO,
                  fontSize: '18px',
                }}
              >
                ‹
              </button>
            )}

            {/* Next arrow */}
            {carouselIdx < CAROUSEL_IMAGES.length - 1 && (
              <button
                onClick={carouselNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center"
                style={{
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.8)',
                  background: 'rgba(0,0,0,0.35)',
                  cursor: 'pointer',
                  fontFamily: MONO,
                  fontSize: '18px',
                }}
              >
                ›
              </button>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {CAROUSEL_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIdx(i)}
                  style={{
                    height: '6px',
                    width: i === carouselIdx ? '18px' : '6px',
                    borderRadius: '3px',
                    background: i === carouselIdx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="cs-reveal p-10" style={{ background: '#050505' }}>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: '1.5rem',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '0.8rem',
                  lineHeight: 1.2,
                }}
              >
                {f.title}
              </div>
              {f.desc && (
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: '11px',
                    lineHeight: 1.85,
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.025em',
                  }}
                >
                  {f.desc}
                </p>
              )}
              {f.items && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {f.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: MONO,
                        fontSize: '11px',
                        lineHeight: 1.85,
                        color: 'rgba(255,255,255,0.28)',
                        letterSpacing: '0.025em',
                        paddingLeft: '0.9rem',
                        position: 'relative',
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: GOLD }}>–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
