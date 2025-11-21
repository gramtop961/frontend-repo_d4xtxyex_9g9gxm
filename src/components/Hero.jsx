import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { isLowPerfDevice, prefersReducedMotion } from '../utils/perf'

export default function Hero() {
  const reduce = prefersReducedMotion() || isLowPerfDevice()

  return (
    <section id="home" className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        {!reduce ? (
          <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-950" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/80 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end pb-14">
        <motion.div
          className="max-w-2xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p className="text-blue-300/80 text-sm uppercase tracking-[0.2em] mb-3"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >Portfolio</motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.55 }}
          >
            Student Developer crafting playful, performant experiences
          </motion.h1>
          <motion.p
            className="mt-4 text-slate-200/90 max-w-xl"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
          >
            I’m a college student exploring web, UI motion, and creative tech.
          </motion.p>
          <motion.div
            className="mt-8 flex items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? false : { opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.55 }}
          >
            <a href="#projects" className="rounded-full bg-white text-slate-900 px-5 py-2.5 text-sm font-medium hover:bg-blue-50 transition-colors">See Projects</a>
            <a href="#contact" className="rounded-full border border-white/30 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors">Say Hello</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
