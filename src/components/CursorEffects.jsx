import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { isLowPerfDevice, prefersReducedMotion } from '../utils/perf'

// A lightweight, GPU-friendly cursor/"bot eye" effect
export default function CursorEffects() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [clicks, setClicks] = useState([])
  const eyeRef = useRef(null)

  const reduce = prefersReducedMotion() || isLowPerfDevice()
  if (reduce) return null

  // Smooth springs for trailing elements
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })
  const eyeX = useSpring(0, { stiffness: 120, damping: 18 })
  const eyeY = useSpring(0, { stiffness: 120, damping: 18 })

  useEffect(() => {
    let raf = 0
    let last = { x: 0, y: 0 }

    const onMove = (e) => {
      const nx = e.clientX
      const ny = e.clientY
      last = { x: nx, y: ny }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setPos(last)
        x.set(last.x)
        y.set(last.y)
        eyeX.set(last.x)
        eyeY.set(last.y)
      })
    }
    const onClick = (e) => {
      const id = Math.random().toString(36).slice(2)
      setClicks((curr) => [...curr, { id, x: e.clientX, y: e.clientY }])
      // Cleanup this click after animation
      setTimeout(() => {
        setClicks((curr) => curr.filter((c) => c.id !== id))
      }, 600)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [x, y, eyeX, eyeY])

  // Compute an eye rotation that "looks at" the cursor
  const [angle, setAngle] = useState(0)
  useEffect(() => {
    const update = () => {
      const eye = eyeRef.current
      if (!eye) return
      const rect = eye.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = pos.x - cx
      const dy = pos.y - cy
      const a = Math.atan2(dy, dx)
      setAngle((a * 180) / Math.PI)
    }
    const id = setInterval(update, 80)
    return () => clearInterval(id)
  }, [pos])

  return (
    <div className="pointer-events-none fixed inset-0 z-[40]">
      {/* Primary cursor dot */}
      <motion.div
        className="hidden md:block absolute w-2.5 h-2.5 -ml-1.5 -mt-1.5 rounded-full bg-white/80 mix-blend-difference will-change-transform"
        style={{ x, y }}
      />

      {/* Bot eye: a floating module that watches the cursor */}
      <motion.div
        ref={eyeRef}
        className="hidden md:flex absolute w-12 h-12 -ml-6 -mt-6 items-center justify-center will-change-transform"
        style={{ x: eyeX, y: eyeY }}
      >
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/10 backdrop-blur-sm border border-white/10">
          <div
            className="absolute inset-1 rounded-full border border-white/10"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80" />
          </div>
        </div>
      </motion.div>

      {/* Click ripples */}
      <AnimatePresence>
        {clicks.map((c) => (
          <motion.span
            key={c.id}
            className="absolute block rounded-full border border-cyan-300/60"
            style={{ left: c.x, top: c.y, width: 6, height: 6, marginLeft: -3, marginTop: -3 }}
            initial={{ opacity: 0.7, scale: 0 }}
            animate={{ opacity: 0, scale: 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
