import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 opacity-0 backdrop-blur-md border-b border-white/10 overflow-hidden"
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        background: 'rgba(255,255,255,0.10)',
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
          }}
        />
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-10">
        {[
          { label: 'História',     target: '#historia'   },
          { label: 'O Campo', target: '#campo'       },
          { label: 'Galeria',     target: '#galeria'     },
          { label: 'Preços',      target: '#precos'      },
          { label: 'Contato',     target: '#contato'     },
        ].map(({ label, target }) => (
          <a
            key={label}
            href={target}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-white/50 hover:text-white/90 transition-colors duration-300 text-xs tracking-[0.25em] uppercase cursor-pointer"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button
        className="hidden md:block text-xs tracking-[0.2em] uppercase text-black bg-white/90 hover:bg-white px-5 py-2.5 transition-all duration-300"
        style={{ fontFamily: "'DM Mono', monospace" }}
        onClick={() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Agende sua Visita
      </button>

      {/* Mobile menu icon */}
      <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
        <span className="block w-6 h-px bg-white/70" />
        <span className="block w-4 h-px bg-white/70" />
      </div>
    </nav>
  )
}
