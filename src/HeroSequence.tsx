import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import ScrollIndicator from './ScrollIndicator'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 180
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(4, '0')}.jpg`

export default function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const frameIndexRef = useRef(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const scaleRef = useRef({ val: 1 })
  const rafRef = useRef<number | null>(null)

  // Draw a specific frame to canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = framesRef.current[index]
    if (!img || !img.complete) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    // object-cover logic
    const scale = Math.max(cw / iw, ch / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (cw - dw) / 2
    const dy = (ch - dh) / 2

    ctx.clearRect(0, 0, cw, ch)

    // Apply subtle zoom via transform
    const zoom = scaleRef.current.val
    ctx.save()
    ctx.translate(cw / 2, ch / 2)
    ctx.scale(zoom, zoom)
    ctx.translate(-cw / 2, -ch / 2)
    ctx.drawImage(img, dx, dy, dw, dh)
    ctx.restore()
  }

  // Resize canvas to viewport
  const resizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawFrame(frameIndexRef.current)
  }

  // Preload all frames
  useEffect(() => {
    let loaded = 0
    const images: HTMLImageElement[] = []
    framesRef.current = images

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        loaded++
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
        if (loaded === TOTAL_FRAMES) {
          setReady(true)
        }
      }
      img.onerror = () => {
        loaded++
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
        if (loaded === TOTAL_FRAMES) setReady(true)
      }
      images[i - 1] = img
    }
  }, [])

  // Setup canvas size + resize listener
  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  // GSAP ScrollTrigger setup after frames are ready
  useEffect(() => {
    if (!ready) return

    // Draw first frame immediately
    drawFrame(0)

    const ctx = { frame: 0 }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      pin: false,
      onUpdate: (self) => {
        const progress = self.progress
        const frameIndex = Math.min(
          Math.floor(progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        )

        if (frameIndex !== frameIndexRef.current) {
          frameIndexRef.current = frameIndex
          ctx.frame = frameIndex

          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => {
            drawFrame(frameIndex)
          })
        }

        // Subtle zoom 1.0 → 1.06
        scaleRef.current.val = 1 + progress * 0.06
      },
    })

    // Text fade + move on scroll
    gsap.to(textRef.current, {
      opacity: 0,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '25% top',
        scrub: true,
      },
    })

    // Initial text entrance
    const tl = gsap.timeline({ delay: 0.6 })
    tl.fromTo(
      textRef.current?.querySelectorAll('.reveal-item') ?? [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: 'power3.out' }
    )

    return () => {
      st.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [ready])

  return (
    <>
      <Navbar />

      {/* Loading screen */}
      {!ready && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6">
          <div
            className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-2"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Carregando experiência
          </div>
          <div className="w-48 h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white/70 transition-all duration-100"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div
            className="text-white/20 text-[10px] tabular-nums"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {loadProgress}%
          </div>
        </div>
      )}

      {/* Scroll section — tall to give scroll room */}
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: '250vh' }}
      >
        {/* Sticky viewport wrapper */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
          />

          {/* Cinematic dark overlay — gradient vignette */}
          <div
            ref={overlayRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%),
                linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.7) 100%)
              `,
            }}
          />

          {/* Grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
            }}
          />

          {/* Hero text */}
          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center"
          >
            {/* Headline */}
            <h1
              className="reveal-item opacity-0 text-white leading-[0.92] mb-6 max-w-4xl"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
              }}
            >
              <em className="italic" style={{ fontWeight: 400 }}>
                São Francisco
              </em>
              <br />
              <span style={{ fontStyle: 'normal', fontWeight: 300 }}>
                Golf Club
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="reveal-item opacity-0 text-white/70 max-w-sm mb-10 leading-relaxed"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '12px',
                letterSpacing: '0.08em',
              }}
            >
              Desde 1935
            </p>

            {/* CTA Button */}
            <div className="reveal-item opacity-0 flex items-center justify-center">
              <button
                className="group relative overflow-hidden px-8 py-3.5 border border-white/30 text-white/80 hover:text-white transition-all duration-500 text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
                onClick={() => document.querySelector('#historia')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative group-hover:text-black transition-colors duration-300">
                  Conheça o clube
                </span>
              </button>
            </div>

            {/* Frame counter */}
            <div
              className="reveal-item opacity-0 absolute bottom-20 right-8 text-white/20 tabular-nums"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.1em' }}
              id="frame-counter"
            >
              — / 180
            </div>
          </div>

          {/* Scroll indicator */}
          <ScrollIndicator />
        </div>
      </section>
    </>
  )
}
