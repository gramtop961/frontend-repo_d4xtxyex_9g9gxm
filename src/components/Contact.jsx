export default function Contact() {
  return (
    <section id="contact" className="relative py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Get in touch</h2>
          <p className="text-slate-300 mt-2">I'm open to freelance opportunities and collaborations.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="mailto:you@example.com" className="rounded-lg bg-white text-slate-900 px-5 py-3 text-sm font-medium hover:bg-blue-50 transition-colors">Email me</a>
            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="rounded-lg border border-white/30 text-white px-5 py-3 text-sm font-medium hover:bg-white/10 transition-colors">LinkedIn</a>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-6">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </div>
    </section>
  )
}
