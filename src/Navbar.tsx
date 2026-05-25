import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 opacity-0"
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        background: scrolled
          ? 'rgba(8, 8, 8, 0.82)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid transparent',
        boxShadow: scrolled
          ? '0 4px 32px rgba(0,0,0,0.55)'
          : 'none',
        transition:
          'background 0.6s cubic-bezier(0.25,0.1,0.25,1), backdrop-filter 0.6s cubic-bezier(0.25,0.1,0.25,1), -webkit-backdrop-filter 0.6s cubic-bezier(0.25,0.1,0.25,1), border-color 0.6s ease, box-shadow 0.6s ease',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <img
          src="/logo.png"
          alt="São Francisco Golf Club"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            height: '72px',
            width: 'auto',
            maxHeight: '72px',
            maxWidth: '220px',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            display: 'block',
            cursor: 'pointer',
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-10">
        {[
          { label: 'História', target: '#historia' },
          { label: 'O Campo',  target: '#campo'    },
          { label: 'Galeria',  target: '#galeria'  },
          { label: 'Preços',   target: '#precos'   },
          { label: 'Contato',  target: '#contato'  },
        ].map(({ label, target }) => (
          <a
            key={label}
            href={target}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              fontFamily: "'DM Mono', monospace",
              color: 'rgba(255,255,255,0.72)',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: scrolled ? '#000' : '#fff',
          background: scrolled
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(255,255,255,0.12)',
          border: scrolled
            ? '1px solid transparent'
            : '1px solid rgba(255,255,255,0.45)',
          padding: '10px 22px',
          cursor: 'pointer',
          transition:
            'color 0.5s ease, background 0.5s ease, border-color 0.5s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = scrolled
            ? 'rgba(255,255,255,1)'
            : 'rgba(255,255,255,0.22)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = scrolled
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(255,255,255,0.12)'
        }}
        onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
        className="hidden md:block"
      >
        Agende sua Visita
      </button>

      {/* Mobile hamburger */}
      <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
        <span className="block w-6 h-px bg-white/70" />
        <span className="block w-4 h-px bg-white/70" />
      </div>
    </nav>
  )
}
