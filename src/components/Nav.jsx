import { useEffect, useState } from 'react'
import { Icon } from './Icons'
import { navLinks, site, socials } from '../data/profile'
import useScrollSpy from '../hooks/useScrollSpy'

// Module scope keeps the array referentially stable so the scroll-spy
// effect does not re-subscribe on every render.
const SECTION_IDS = navLinks.map((link) => link.id)

const github = socials.find((s) => s.icon === 'github')

export function Nav() {
  const activeId = useScrollSpy(SECTION_IDS)
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 24)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on resize up to desktop, and lock body scroll while open.
  useEffect(() => {
    if (!menuOpen) return

    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  // Escape closes the menu.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="print-hide fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled || menuOpen
            ? 'border-b border-ink-700/80 bg-ink-950/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
        >
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${site.name} — back to top`}
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-accent-500/40 bg-accent-500/10 font-mono text-sm font-bold text-accent-300">
              {site.initials}
              <span className="absolute inset-0 rounded-lg bg-accent-400/0 transition-colors duration-300 group-hover:bg-accent-400/10" />
            </span>
            <span className="hidden text-[15px] font-semibold tracking-tight text-white sm:block">
              {site.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors duration-200 ${
                      isActive ? 'text-accent-300' : 'text-muted hover:text-white'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent-400 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="grid h-9 w-9 place-items-center rounded-lg border border-ink-700 text-muted transition-colors duration-200 hover:border-accent-500/40 hover:text-accent-300"
              >
                <Icon name="github" size={17} />
              </a>
            )}
            <a
              href={site.cvFile}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-accent-500/40 bg-accent-500/10 px-3.5 py-2 text-[13.5px] font-medium text-accent-300 transition-colors duration-200 hover:border-accent-400 hover:bg-accent-500/20"
            >
              <Icon name="download" size={15} />
              CV
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-lg border border-ink-700 text-muted transition-colors duration-200 hover:text-accent-300 lg:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={18} />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-b border-ink-700/80 bg-ink-950/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between border-b border-ink-800 py-3 text-sm font-medium transition-colors ${
                  activeId === link.id ? 'text-accent-300' : 'text-muted hover:text-white'
                }`}
              >
                {link.label}
                <Icon name="arrow-right" size={15} />
              </a>
            </li>
          ))}
          <li className="mt-4 flex gap-2">
            <a
              href={site.cvFile}
              download
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-accent-500/40 bg-accent-500/10 px-3 py-2.5 text-sm font-medium text-accent-300"
            >
              <Icon name="download" size={15} />
              Download CV
            </a>
            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-700 px-3 py-2.5 text-sm font-medium text-muted"
              >
                <Icon name="github" size={16} />
                GitHub
              </a>
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Nav
