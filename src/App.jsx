import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CursorEffects from './components/CursorEffects'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <CursorEffects />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
