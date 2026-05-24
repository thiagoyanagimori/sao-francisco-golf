import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ScrollIndicator() {
  const lineRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      wrapRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1, delay: 2, ease: 'power2.out' }
    )

    gsap.to(lineRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: false,
      delay: 2.5,
      onRepeat: () => {
        gsap.set(lineRef.current, { scaleY: 1 })
      },
    })
  }, [])

  return (
    <div
      ref={wrapRef}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 z-20"
    >
      <span
        className="text-white/40 text-[9px] tracking-[0.2em] uppercase"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        Role para baixo
      </span>
      <div className="w-px h-12 bg-white/20 overflow-hidden relative">
        <div
          ref={lineRef}
          className="absolute top-0 left-0 w-full h-full bg-white/70"
        />
      </div>
    </div>
  )
}
