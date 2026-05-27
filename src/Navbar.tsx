import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const LINKS = [
  { label: 'História', target: '#historia' },
  { label: 'O Campo',  target: '#campo'    },
  { label: 'Galeria',  target: '#galeria'  },
  { label: 'Preços',   target: '#precos'   },
  { label: 'Contato',  target: '#contato'  },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (target: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 opacity-0"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          background: scrolled || menuOpen
            ? 'rgba(8, 8, 8, 0.96)'
            : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(18px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(18px) saturate(160%)' : 'none',
          borderBottom: scrolled || menuOpen
            ? '1px solid rgba(255,255,255,0.07)'
            : '1px solid transparent',
          boxShadow: scrolled || menuOpen
            ? '0 4px 32px rgba(0,0,0,0.55)'
            : 'none',
          transition:
            'background 0.5s cubic-bezier(0.25,0.1,0.25,1), backdrop-filter 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <img
            src="/logo.png"
            alt="São Francisco Golf Club"
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
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

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {LINKS.map(({ label, target }) => (
            <a
              key={label}
              href={target}
              onClick={(e) => { e.preventDefault(); handleNavClick(target) }}
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

        {/* Desktop CTA */}
        <button
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: scrolled ? '#000' : '#fff',
            background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.12)',
            border: scrolled ? '1px solid transparent' : '1px solid rgba(255,255,255,0.45)',
            padding: '10px 22px',
            cursor: 'pointer',
            transition: 'color 0.5s ease, background 0.5s ease, border-color 0.5s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = scrolled ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.22)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.12)'
          }}
          onClick={() => handleNavClick('#contato')}
          className="hidden md:block"
        >
          Agende sua Visita
        </button>

        {/* Mobile hamburger / close */}
        <button
          className="md:hidden flex flex-col justify-center items-end gap-[7px] cursor-pointer p-2"
          style={{ background: 'transparent', border: 'none', width: '44px', height: '44px' }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <span
            style={{
              display: 'block',
              width: menuOpen ? '28px' : '28px',
              height: '1.5px',
              background: 'rgba(255,255,255,0.85)',
              transform: menuOpen ? 'translateY(4.25px) rotate(45deg)' : 'none',
              transition: 'transform 0.35s cubic-bezier(0.25,0.1,0.25,1), opacity 0.3s ease',
            }}
          />
          <span
            style={{
              display: 'block',
              width: menuOpen ? '28px' : '20px',
              height: '1.5px',
              background: 'rgba(255,255,255,0.85)',
              transform: menuOpen ? 'translateY(-4.25px) rotate(-45deg)' : 'none',
              transition: 'transform 0.35s cubic-bezier(0.25,0.1,0.25,1), width 0.3s ease',
            }}
          />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-10"
        style={{
          background: 'rgba(6,6,6,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s cubic-bezier(0.25,0.1,0.25,1)',
        }}
      >
        <nav className="flex flex-col gap-0">
          {LINKS.map(({ label, target }, i) => (
            <a
              key={label}
              href={target}
              onClick={(e) => { e.preventDefault(); handleNavClick(target) }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.2rem, 9vw, 3.5rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.82)',
                textDecoration: 'none',
                lineHeight: 1.25,
                padding: '0.6rem 0',
                borderBottom: i < LINKS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                opacity: menuOpen ? 1 : 0,
                transition: `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s, color 0.3s ease`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.82)')}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#000',
            background: 'rgba(255,255,255,0.95)',
            border: 'none',
            padding: '14px 28px',
            cursor: 'pointer',
            marginTop: '3rem',
            alignSelf: 'flex-start',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 0.45s ease ${LINKS.length * 0.06 + 0.05}s, transform 0.45s ease ${LINKS.length * 0.06 + 0.05}s`,
          }}
          onClick={() => handleNavClick('#contato')}
        >
          Agende sua Visita
        </button>

        {/* Bottom label */}
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.18)',
            textTransform: 'uppercase',
            position: 'absolute',
            bottom: '2.5rem',
            left: '2.5rem',
          }}
        >
          São Francisco Golf Club — Desde 1935
        </p>
      </div>
    </>
  )
}
