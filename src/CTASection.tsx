import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERIF = "'Cormorant Garamond', Georgia, serif"
const MONO = "'DM Mono', monospace"
const GOLD = 'rgba(197, 164, 101, 0.75)'
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '90vh' }}
    >
      {/* Background frame */}
      <div className="absolute inset-0">
        <img
          src="/frames/frame_0060.jpg"
          alt="São Francisco Golf Club"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.32) saturate(0.65)' }}
        />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.72) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRAIN, backgroundSize: '128px 128px', opacity: 0.035 }}
      />

      {/* Content */}
      <div className="cta-content relative z-10 text-center px-8 max-w-5xl mx-auto">
        {/* Label */}
        <div
          className="flex items-center justify-center gap-4 mb-10"
          style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.5em', color: 'rgba(255,255,255,0.28)' }}
        >
          <span className="block w-10 h-px" style={{ background: GOLD }} />
          <span className="uppercase">São Francisco Golf Club — Desde 1935</span>
          <span className="block w-10 h-px" style={{ background: GOLD }} />
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2.8rem, 7vw, 7.5rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.96)',
            lineHeight: 0.98,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
          }}
        >
          Descubra o
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>São Francisco</em>
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: MONO,
            fontSize: '12px',
            letterSpacing: '0.07em',
            color: 'rgba(255,255,255,0.32)',
            lineHeight: 1.95,
            maxWidth: '420px',
            margin: '0 auto 3.5rem',
          }}
        >
          Venha conhecer o clube, o campo e quase um século de tradição golfística paulistana. Uma experiência que poucos têm o privilégio de vivenciar.
        </p>

        {/* CTA button */}
        <button
          className="group relative overflow-hidden"
          style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.35em',
            border: '1px solid rgba(255,255,255,0.28)',
            padding: '1rem 2.5rem',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <span
            className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"
            style={{ ease: 'cubic-bezier(0.4,0,0.2,1)' } as React.CSSProperties}
          />
          <span
            className="relative uppercase text-white/90 group-hover:text-black transition-colors duration-300"
          >
            Agende sua Visita
          </span>
        </button>
      </div>
    </section>
  )
}
