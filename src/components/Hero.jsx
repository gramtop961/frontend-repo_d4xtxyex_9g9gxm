import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section id="home" className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/80 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-end pb-16">
        <div className="max-w-2xl">
          <p className="text-blue-300/80 text-sm uppercase tracking-[0.2em] mb-3">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Creative Developer & Photographer
          </h1>
          <p className="mt-4 text-slate-200/90 max-w-xl">
            I craft clean, modern web experiences with a focus on performance and minimalist aesthetics.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#projects" className="rounded-full bg-white text-slate-900 px-5 py-2.5 text-sm font-medium hover:bg-blue-50 transition-colors">View Work</a>
            <a href="#contact" className="rounded-full border border-white/30 text-white px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </section>
  )
}
