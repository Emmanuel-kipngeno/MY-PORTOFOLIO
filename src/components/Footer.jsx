import { Icon } from './Icons'
import { navLinks, site, socials } from '../data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-ink-800 bg-ink-950">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent-500/40 bg-accent-500/10 font-mono text-sm font-bold text-accent-300">
                {site.initials}
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-white">{site.name}</span>
            </a>
            <p className="mt-4 text-[13.5px] leading-relaxed text-faint">{site.tagline}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    aria-label={social.label}
                    title={social.handle}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-ink-700 text-faint transition-colors duration-200 hover:border-accent-500/40 hover:text-accent-300"
                  >
                    <Icon name={social.icon} size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="print-hide">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Sections</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="link-underline text-[13.5px] text-muted transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="print-hide">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">Quick actions</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={site.cvFile}
                  download
                  className="inline-flex items-center gap-2 text-[13.5px] text-muted transition-colors duration-200 hover:text-accent-300"
                >
                  <Icon name="download" size={15} />
                  Download CV (PDF)
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 text-[13.5px] text-muted transition-colors duration-200 hover:text-accent-300"
                >
                  <Icon name="print" size={15} />
                  Print this page
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-[13.5px] text-muted transition-colors duration-200 hover:text-accent-300"
                >
                  <Icon name="mail" size={15} />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-ink-800 pt-6 sm:flex-row sm:justify-between">
          <p className="text-center text-[12px] text-faint sm:text-left">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-center font-mono text-[11.5px] text-faint/80 sm:text-right">
            <span className="text-accent-500/70">$</span> built with React, Vite &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
