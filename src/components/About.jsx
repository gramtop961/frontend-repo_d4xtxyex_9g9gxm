export default function About() {
  return (
    <section id="about" className="relative py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-slate-300 leading-relaxed">
              I'm a developer who loves building fast, beautiful user interfaces with a minimalist approach. I also have a passion for cameras and visual storytelling, which influences my design choices and attention to detail.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
                <p className="text-white font-semibold">Skills</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300/90">
                  <li>React, Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
                <p className="text-white font-semibold">Focus</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300/90">
                  <li>Performance</li>
                  <li>Accessibility</li>
                  <li>Minimal design</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-1">
            <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-slate-400">
              Your photo here
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
