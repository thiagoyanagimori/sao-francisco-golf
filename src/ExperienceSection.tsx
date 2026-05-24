import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERIF = "'Cormorant Garamond', Georgia, serif"
const MONO = "'DM Mono', monospace"
const GOLD = 'rgba(197, 164, 101, 0.75)'
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`

const EXPERIENCES = [
  {
    num: '01',
    title: 'Golfe',
    subtitle: 'de alto nível',
    desc: 'Um percurso maduro e desafiador com 9 buracos e 18 tees distintos que garantem sempre uma nova perspectiva no campo.',
    src: '/frames/frame_0025.jpg',
  },
  {
    num: '02',
    title: 'Gastronomia',
    subtitle: 'refinada',
    desc: 'O restaurante do clube oferece uma culinária cuidadosa, perfeita para celebrar uma boa rodada entre amigos e família.',
    src: null,
  },
  {
    num: '03',
    title: 'Natureza',
    subtitle: 'preservada',
    desc: 'Mais de oito décadas de vegetação madura criam um refúgio verde único — silêncio raro no coração da metrópole.',
    src: '/frames/frame_0110.jpg',
  },
  {
    num: '04',
    title: 'Clube',
    subtitle: 'social',
    desc: 'Décadas de encontros que transformaram o São Francisco em muito mais do que um clube — uma comunidade de pertencimento.',
    src: null,
  },
  {
    num: '05',
    title: 'Exclusividade',
    subtitle: 'e tradição',
    desc: 'Um espaço preservado para aqueles que buscam excelência, privacidade e uma convivência de verdadeiro nível.',
    src: '/frames/frame_0070.jpg',
  },
  {
    num: '06',
    title: 'Tranquilidade',
    subtitle: 'singular',
    desc: 'O ritmo ditado pela natureza e pelo jogo. Um estado de presença que só um campo como este é capaz de oferecer.',
    src: null,
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.exp-reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: (i % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experiencia" ref={sectionRef} className="relative bg-black py-40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRAIN, backgroundSize: '128px 128px', opacity: 0.025 }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="exp-reveal flex items-center gap-4 mb-8">
          <span className="block w-12 h-px" style={{ background: GOLD }} />
          <span
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.3)' }}
          >
            A Experiência
          </span>
        </div>

        <div className="exp-reveal mb-20">
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.92)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              maxWidth: '680px',
            }}
          >
            Mais do que golfe.
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Um estilo de vida.</em>
          </h2>
        </div>

        {/* Experience grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.num}
              className="exp-reveal group relative overflow-hidden bg-black"
            >
              {/* Image or gradient placeholder */}
              {exp.src ? (
                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={exp.src}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(0.5) saturate(0.8)',
                      transition: 'transform 0.7s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)' }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    height: '220px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)',
                    position: 'relative',
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: GRAIN, backgroundSize: '128px 128px', opacity: 0.04 }}
                  />
                </div>
              )}

              {/* Content */}
              <div
                className="p-10"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="mb-5 uppercase"
                  style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.4em', color: GOLD }}
                >
                  {exp.num}
                </div>
                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.0,
                    marginBottom: '0.4rem',
                  }}
                >
                  {exp.title}
                </h3>
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.35)',
                    lineHeight: 1.3,
                    marginBottom: '1.1rem',
                  }}
                >
                  {exp.subtitle}
                </p>
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: '11px',
                    lineHeight: 1.85,
                    color: 'rgba(255,255,255,0.26)',
                    letterSpacing: '0.025em',
                  }}
                >
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
