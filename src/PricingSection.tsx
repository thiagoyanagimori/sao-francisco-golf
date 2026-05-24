import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERIF = "'Cormorant Garamond', Georgia, serif"
const MONO = "'DM Mono', monospace"
const GOLD = 'rgba(197, 164, 101, 0.75)'
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`

const WEEKDAY_ROWS = [
  { label: 'Normal', cols: ['200', '170', '130', '100', '250', '280'] },
  { label: 'Profissional c/Aluno', cols: ['200', '80', '—', '—', '—', '—'] },
  { label: 'Senhoras às Quartas-Feira', cols: ['100', '80', '—', '—', '—', '—'] },
  { label: 'Golf Free Card', cols: ['160', '136', '—', '—', '—', '—'] },
  { label: 'Acompanhante', cols: ['100', '100', '—', '—', '—', '—'] },
]

const WEEKEND_ROWS = [
  { label: 'Normal', cols: ['320', '200', '—', '—', '380', '420'] },
  { label: 'Profissional c/Aluno', cols: ['320', '170', '—', '—', '38', '420'] },
  { label: 'Senhoras às Quartas-Feira', cols: ['400', '150', '—', '—', '—', '—'] },
  { label: 'Golf Free Card', cols: ['320', '200', '—', '—', '—', '—'] },
  { label: 'Acompanhante', cols: ['Não Permitido', '100', '—', '—', '—', '—'] },
]

const thStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '9px',
  letterSpacing: '0.2em',
  color: 'rgba(255,255,255,0.35)',
  fontWeight: 400,
  textTransform: 'uppercase',
  padding: '12px 10px',
  textAlign: 'center',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
}

const tdStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '11px',
  color: 'rgba(255,255,255,0.55)',
  padding: '13px 10px',
  textAlign: 'center',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  letterSpacing: '0.02em',
}

const tdLabelStyle: React.CSSProperties = {
  ...tdStyle,
  textAlign: 'left',
  color: 'rgba(255,255,255,0.38)',
  paddingLeft: '0',
}

const sectionHeaderStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: '9px',
  letterSpacing: '0.3em',
  color: GOLD,
  textTransform: 'uppercase',
  padding: '14px 0',
  textAlign: 'left',
  borderTop: '1px solid rgba(255,255,255,0.08)',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.pr-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="precos" ref={sectionRef} className="relative overflow-hidden" style={{ background: '#050505' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: GRAIN, backgroundSize: '128px 128px', opacity: 0.025 }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16 py-36">
        {/* Label */}
        <div className="pr-reveal flex items-center gap-4 mb-20">
          <span className="block w-12 h-px" style={{ background: GOLD }} />
          <span
            className="uppercase"
            style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.45em', color: 'rgba(255,255,255,0.3)' }}
          >
            Preços
          </span>
        </div>

        {/* Title */}
        <h2
          className="pr-reveal"
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: '3rem',
          }}
        >
          Green Fee
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Tabela de preços</em>
        </h2>

        {/* Table wrapper — horizontal scroll on mobile */}
        <div className="pr-reveal overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, textAlign: 'left', paddingLeft: 0, width: '28%' }} />
                <th style={thStyle}>Manhã</th>
                <th style={thStyle}>Tarde</th>
                <th style={thStyle}>Manhã</th>
                <th style={thStyle}>Tarde</th>
                <th style={{ ...thStyle, lineHeight: 1.4 }}>Manhã ou Tarde<br />no mesmo dia</th>
                <th style={{ ...thStyle, lineHeight: 1.4 }}>Manhã ou Tarde<br />no mesmo dia</th>
              </tr>
              <tr>
                <td style={{ ...tdStyle, textAlign: 'left', paddingLeft: 0, color: 'rgba(255,255,255,0.2)', fontSize: '9px', letterSpacing: '0.1em' }} />
                <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.2)', fontSize: '9px' }}>18</td>
                <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.2)', fontSize: '9px' }}>18</td>
                <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.2)', fontSize: '9px' }}>9</td>
                <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.2)', fontSize: '9px' }}>9</td>
                <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.2)', fontSize: '9px' }}>27</td>
                <td style={{ ...tdStyle, color: 'rgba(255,255,255,0.2)', fontSize: '9px' }}>36</td>
              </tr>
            </thead>
            <tbody>
              {/* Weekday section */}
              <tr>
                <td colSpan={7} style={sectionHeaderStyle}>Terça à Sexta</td>
              </tr>
              {WEEKDAY_ROWS.map((row) => (
                <tr key={row.label}>
                  <td style={tdLabelStyle}>{row.label}</td>
                  {row.cols.map((val, i) => (
                    <td key={i} style={{ ...tdStyle, color: val === '—' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.65)' }}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Weekend section */}
              <tr>
                <td colSpan={7} style={{ ...sectionHeaderStyle, marginTop: '8px' }}>Sábados, Domingos e Feriados</td>
              </tr>
              {WEEKEND_ROWS.map((row) => (
                <tr key={row.label}>
                  <td style={tdLabelStyle}>{row.label}</td>
                  {row.cols.map((val, i) => (
                    <td key={i} style={{ ...tdStyle, color: val === '—' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.65)' }}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <p
          className="pr-reveal"
          style={{
            fontFamily: MONO,
            fontSize: '10px',
            lineHeight: 1.9,
            color: GOLD,
            letterSpacing: '0.03em',
            marginTop: '2.5rem',
            opacity: 0.8,
          }}
        >
          NOTA: Para o Green Fee, consulte antes a disponibilidade através do telefone (11) 3681-8752 / 3681-0329.
        </p>
      </div>
    </section>
  )
}
