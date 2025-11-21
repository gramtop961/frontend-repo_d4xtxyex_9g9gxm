import { motion } from 'framer-motion'
import { isLowPerfDevice, prefersReducedMotion } from '../utils/perf'

export default function Projects() {
  const reduce = prefersReducedMotion() || isLowPerfDevice()

  const items = [
    {
      title: 'Minimal Photo Gallery',
      description: 'A fast, responsive gallery with lazy-loading and keyboard navigation.',
      tags: ['React', 'Tailwind', 'Accessibility'],
      link: '#'
    },
    {
      title: 'Creative Portfolio',
      description: 'A sleek, animated portfolio for a visual artist.',
      tags: ['Next.js', 'Framer Motion'],
      link: '#'
    },
    {
      title: 'Tech Blog',
      description: 'A markdown-based blog with search and code highlighting.',
      tags: ['Vite', 'MDX'],
      link: '#'
    }
  ]

  return (
    <section id="projects" className="relative py-16 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Recent Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, idx) => (
            <motion.a
              key={idx}
              href={p.link}
              className="group bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={reduce ? undefined : { once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: reduce ? 0 : idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -6 }}
            >
              <motion.div
                className="aspect-video rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 mb-4"
                layoutId={reduce ? undefined : `thumb-${idx}`}
                whileHover={reduce ? undefined : { scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              />
              <h3 className="text-white font-semibold text-lg">{p.title}</h3>
              <p className="text-slate-300 text-sm mt-1">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs rounded-full border border-white/10 text-slate-300 px-2 py-1">{t}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
