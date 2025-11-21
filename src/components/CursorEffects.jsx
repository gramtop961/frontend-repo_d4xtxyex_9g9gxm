import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'

// A lightweight, GPU-friendly cursor/"bot eye" effect
export default function CursorEffects() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [clicks, setClicks] = useState([])
  const eyeRef = useRef(null)

  // Smooth springs for trailing elements
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })
  const eyeX = useSpring(0, { stiffness: 120, damping: 18 })
  const eyeY = useSpring(0, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const onMove = (e) => {
      const nx = e.clientX
      const ny = e.clientY
      setPos({ x: nx, y: ny })
      x.set(nx)
      y.set(ny)
      eyeX.set(nx)
      eyeY.set(ny)
    }
    const onClick = (e) => {
      const id = Math.random().toString(36).slice(2)
      setClicks((curr) => [...curr, { id, x: e.clientX, y: e.clientY }])
      // Cleanup this click after animation
      setTimeout(() => {
        setClicks((curr) => curr.filter((c) => c.id !== id))
      }, 700)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    return () => {
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
    const id = setInterval(update, 50)
    return () => clearInterval(id)
  }, [pos])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {/* Primary cursor dot */}
      <motion.div
        className="hidden md:block absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-white/90 mix-blend-difference"
        style={{ x, y }}
      />

      {/* Bot eye: a floating module that watches the cursor */}
      <motion.div
        ref={eyeRef}
        className="hidden md:flex absolute w-14 h-14 -ml-7 -mt-7 items-center justify-center"
        style={{ x: eyeX, y: eyeY }}
      >
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/20 backdrop-blur border border-white/20">
          <div
            className="absolute inset-1 rounded-full border border-white/20"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/90 shadow-[0_0_12px_2px_rgba(255,255,255,0.6)]" />
          </div>
          <div className="absolute inset-0 rounded-full animate-pulse bg-white/5" />
        </div>
      </motion.div>

      {/* Click ripples */}
      <AnimatePresence>
        {clicks.map((c) => (
          <motion.span
            key={c.id}
            className="absolute block rounded-full border border-cyan-300/70"
            style={{ left: c.x, top: c.y, width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
            initial={{ opacity: 0.9, scale: 0 }}
            animate={{ opacity: 0, scale: 12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
