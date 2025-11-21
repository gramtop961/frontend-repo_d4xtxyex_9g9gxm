import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { shouldReduce } from '../utils/perf'

// A lightweight, GPU-friendly cursor effect with opt-out on low-perf
export default function CursorEffects() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [clicks, setClicks] = useState([])
  const eyeRef = useRef(null)

  const reduce = shouldReduce()
  if (reduce) return null

  // Springs
  const x = useSpring(0, { stiffness: 260, damping: 24 })
  const y = useSpring(0, { stiffness: 260, damping: 24 })
  const eyeX = useSpring(0, { stiffness: 110, damping: 16 })
  const eyeY = useSpring(0, { stiffness: 110, damping: 16 })

  useEffect(() => {
    let raf = 0
    let last = { x: 0, y: 0 }

    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY }
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
      setTimeout(() => setClicks((curr) => curr.filter((c) => c.id !== id)), 450)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [x, y, eyeX, eyeY])

  // Simple eye angle update (throttled)
  const [angle, setAngle] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      const eye = eyeRef.current
      if (!eye) return
      const rect = eye.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = pos.x - cx
      const dy = pos.y - cy
      setAngle((Math.atan2(dy, dx) * 180) / Math.PI)
    }, 100)
    return () => clearInterval(id)
  }, [pos])

  return (
    <div className="pointer-events-none fixed inset-0 z-[40]">
      <motion.div
        className="hidden md:block absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-white/80 mix-blend-difference will-change-transform"
        style={{ x, y }}
      />

      <motion.div
        ref={eyeRef}
        className="hidden md:flex absolute w-10 h-10 -ml-5 -mt-5 items-center justify-center will-change-transform"
        style={{ x: eyeX, y: eyeY }}
      >
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/10 backdrop-blur-[1px] border border-white/10">
          <div className="absolute inset-1 rounded-full border border-white/10" style={{ transform: `rotate(${angle}deg)` }}>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {clicks.map((c) => (
          <motion.span
            key={c.id}
            className="absolute block rounded-full border border-cyan-300/60"
            style={{ left: c.x, top: c.y, width: 6, height: 6, marginLeft: -3, marginTop: -3 }}
            initial={{ opacity: 0.7, scale: 0 }}
            animate={{ opacity: 0, scale: 7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
