import { motion } from 'framer-motion'
import { shouldReduce } from '../utils/perf'

export default function About() {
  const reduce = shouldReduce()

  return (
    <section id="about" className="relative py-16 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={reduce ? undefined : { once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-slate-300 leading-relaxed">
              I’m a college student focused on building playful, performant user interfaces. I love
              mixing code and motion to craft experiences that feel alive.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
                <p className="text-white font-semibold">Skills</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300/90">
                  <li>React, Vite</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
                <p className="text-white font-semibold">Interest</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300/90">
                  <li>UI Motion</li>
                  <li>Accessibility</li>
                  <li>Creative Tech</li>
                </ul>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-1"
            initial={reduce ? false : { opacity: 0, x: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={reduce ? undefined : { once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-slate-400">
              Your photo here
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
