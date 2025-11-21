export default function Projects() {
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
    <section id="projects" className="relative py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Selected Work</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, idx) => (
            <a key={idx} href={p.link} className="group bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 mb-4" />
              <h3 className="text-white font-semibold text-lg">{p.title}</h3>
              <p className="text-slate-300 text-sm mt-1">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs rounded-full border border-white/10 text-slate-300 px-2 py-1">{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
