const SERIF = "'Cormorant Garamond', Georgia, serif"
const MONO = "'DM Mono', monospace"
const GOLD = 'rgba(197, 164, 101, 0.6)'

const NAV_LINKS = [
  { label: 'História', href: '#historia' },
  { label: 'O Campo', href: '#campo' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Preços', href: '#precos' },
]

const linkStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '11px',
  lineHeight: 2,
  color: 'rgba(255,255,255,0.32)',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  display: 'block',
  transition: 'color 0.3s',
}

function ContactLine({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.4rem' }}>
      <div
        className="uppercase"
        style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.18)', marginBottom: '5px' }}
      >
        {label}
      </div>
      <div style={{ fontFamily: MONO, fontSize: '11px', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>
        {children}
      </div>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contato"
      className="relative bg-black overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-24">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <span className="block w-12 h-px" style={{ background: GOLD }} />
          <span
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.3)' }}
          >
            Contato
          </span>
        </div>

        {/* Main grid: info left, map right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-start">

          {/* Left: brand + contact + nav */}
          <div>
            <img
              src="/logo.png"
              alt="São Francisco Golf Club"
              style={{
                height: '52px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: 0.55,
                display: 'block',
                marginBottom: '2rem',
              }}
            />

            <p
              style={{
                fontFamily: MONO,
                fontSize: '11px',
                lineHeight: 1.9,
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.03em',
                maxWidth: '340px',
                marginBottom: '2.5rem',
              }}
            >
              Tradição, natureza e golfe de excelência desde 1935. Um clube único entre São Paulo e Osasco, preservado para aqueles que valorizam o extraordinário.
            </p>

            <div style={{ width: '40px', height: '1px', background: GOLD, marginBottom: '2.5rem' }} />

            {/* Contact details */}
            <ContactLine label="Telefones">
              (11) 3681-8752 / 3681-0329
            </ContactLine>

            <ContactLine label="Email">
              <a
                href="mailto:saofranciscogolf@uol.com.br"
                style={{ ...linkStyle, display: 'inline' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(197,164,101,0.75)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)' }}
              >
                saofranciscogolf@uol.com.br
              </a>
            </ContactLine>

            <ContactLine label="Endereço">
              Av. Dr. Martin Luther King, 1527
              <br />
              Adalgisa, Osasco — SP
              <br />
              CEP 05352-020
            </ContactLine>

            {/* Facebook */}
            <div style={{ marginTop: '2rem' }}>
              <div
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.18)', marginBottom: '10px' }}
              >
                Redes Sociais
              </div>
              <a
                href="https://www.facebook.com/saofranciscogolfclub"
                target="_blank"
                rel="noopener noreferrer"
                className="uppercase"
                style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  letterSpacing: '0.25em',
                  color: 'rgba(197,164,101,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(197,164,101,0.55)' }}
              >
                Facebook
              </a>
            </div>

            {/* Nav */}
            <div style={{ marginTop: '3rem' }}>
              <div
                className="uppercase mb-5"
                style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.18)' }}
              >
                Navegação
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="uppercase"
                    style={{
                      fontFamily: MONO,
                      fontSize: '9px',
                      letterSpacing: '0.18em',
                      color: 'rgba(255,255,255,0.28)',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.28)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: map */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              height: '420px',
            }}
          >
            <iframe
              title="Localização São Francisco Golf Club"
              src="https://maps.google.com/maps?q=Av.+Dr.+Martin+Luther+King,+1527,+Adalgisa,+Osasco,+SP,+05352-020&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Corner label */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '12px 16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            >
              <p
                className="uppercase"
                style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)' }}
              >
                Av. Dr. Martin Luther King, 1527 — Osasco, SP
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: '9px',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.15)',
            }}
          >
            © {year} São Francisco Golf Club. Todos os direitos reservados.
          </p>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: '0.85rem',
              fontStyle: 'italic',
              letterSpacing: '0.05em',
              color: 'rgba(255,255,255,0.1)',
            }}
          >
            Desde 1935
          </p>
        </div>
      </div>
    </footer>
  )
}
