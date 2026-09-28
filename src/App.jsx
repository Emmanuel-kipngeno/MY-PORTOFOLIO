import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      {/* Keyboard users can jump straight past the nav */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default App
