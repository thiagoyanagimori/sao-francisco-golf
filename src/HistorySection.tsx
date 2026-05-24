import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERIF = "'Cormorant Garamond', Georgia, serif"
const MONO = "'DM Mono', monospace"
const GOLD = 'rgba(197, 164, 101, 0.75)'
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`

const chapters = [
  {
    num: '01',
    title: 'O Nascimento',
    subtitle: 'do Campo',
    text: 'José Maria Gonzalez traçou os primeiros fairways entre lagoas e vegetação nativa, criando um percurso que desafiaria gerações de golfistas paulistanos durante décadas.',
  },
  {
    num: '02',
    title: 'A Família',
    subtitle: 'Gonzalez',
    text: 'Mário Gonzalez, filho de José Maria, tornou-se um dos maiores golfistas do Brasil, levando o nome do São Francisco à história do esporte nacional e internacional.',
  },
  {
    num: '03',
    title: 'Os Jacarés',
    subtitle: 'do Buraco 18',
    text: 'A lagoa do buraco 18 abriga jacarés que se tornaram parte da lenda e identidade única do campo, conferindo ao São Francisco um charme absolutamente singular.',
  },
]

export default function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.hs-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
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
    <section id="historia" ref={sectionRef} className="relative bg-black py-40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRAIN, backgroundSize: '128px 128px', opacity: 0.025 }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Section label */}
        <div className="hs-reveal flex items-center gap-4 mb-28">
          <span className="block w-12 h-px" style={{ background: GOLD }} />
          <span
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.3)' }}
          >
            História do Clube
          </span>
        </div>

        {/* Intro: massive year + editorial text */}
        <div className="hs-reveal grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-40">
          <div>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(7rem, 22vw, 18rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.05)',
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
                userSelect: 'none',
              }}
            >
              1935
            </div>
          </div>
          <div className="pb-4">
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
              }}
            >
              Uma tradição
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 400 }}>centenária</em>
            </h2>
            <p
              style={{
                fontFamily: MONO,
                fontSize: '12px',
                lineHeight: 1.95,
                color: 'rgba(255,255,255,0.36)',
                letterSpacing: '0.03em',
                maxWidth: '440px',
              }}
            >
              Fundado em 1935 pelo Conde Luiz Eduardo Matarazzo, o São Francisco Golf Club
              nasceu da visão de criar um espaço de excelência esportiva às margens de São Paulo —
              tornando-se um dos clubes de golfe mais tradicionais do Brasil.
            </p>
          </div>
        </div>

        {/* Cinematic image */}
        <div className="hs-reveal relative mb-40 overflow-hidden" style={{ aspectRatio: '16 / 6' }}>
          <img
            src="casa.jpg"
            alt="Vista aérea do campo do São Francisco Golf Club"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.6) saturate(0.8)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 45%, rgba(0,0,0,0.25) 100%)',
            }}
          />
          <div className="absolute bottom-8 left-10">
            <p
              className="uppercase"
              style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.35)' }}
            >
              
            </p>
          </div>
        </div>

        {/* Three-column chapter grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
          {chapters.map((ch, i) => (
            <div
              key={ch.num}
              className={`hs-reveal py-14 ${i < 2 ? 'md:border-r border-white/10' : ''} ${i > 0 ? 'md:pl-12' : ''} ${i < 2 ? 'md:pr-12' : ''} border-b md:border-b-0 border-white/10 last:border-b-0`}
            >
              <div
                className="mb-8 uppercase"
                style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.4em', color: GOLD }}
              >
                {ch.num}
              </div>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.05,
                  marginBottom: '1.25rem',
                }}
              >
                {ch.title}
                <br />
                <em style={{ fontStyle: 'italic', fontWeight: 400 }}>{ch.subtitle}</em>
              </h3>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: '11px',
                  lineHeight: 1.9,
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.025em',
                }}
              >
                {ch.text}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="hs-reveal text-center py-24 mt-8 border-t border-white/10">
          <blockquote
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.7rem, 3.2vw, 3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.35,
              maxWidth: '860px',
              margin: '0 auto',
            }}
          >
            "Mais de nove décadas de história, tradição
            <br />e paixão pelo golfe no coração de São Paulo."
          </blockquote>
        </div>
      </div>
    </section>
  )
}
