import { Icon } from './Icons'
import useEnter from '../hooks/useEnter'
import { heroIntro, heroStats, site, socials } from '../data/profile'

const TERMINAL_LINES = [
  { prompt: 'whoami', output: 'emmanuel-kipngeno' },
  {
    prompt: 'cat /etc/profile',
    output: null,
    lines: [
      { key: 'role', value: 'System Administrator' },
      { key: 'focus', value: 'Cloud · Security · Full-Stack' },
      { key: 'location', value: 'Kenya' },
      { key: 'experience', value: '3+ years' },
    ],
  },
  { prompt: 'systemctl status career', output: 'active (running) — open to opportunities' },
]

const PROMPT_DELAY = 900
const LINE_DELAY = 260

/** Fades in on mount with a stagger, rather than waiting for scroll. */
function Fade({ delay = 0, as: Tag = 'div', className = '', children, ...rest }) {
  const entered = useEnter(delay)

  return (
    <Tag
      data-reveal=""
      data-visible={entered ? 'true' : 'false'}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 print:min-h-0 print:overflow-visible print:pb-0 print:pt-0 sm:pt-32"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 print:hidden">
        <div className="grid-bg absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent-500/12 blur-[130px]" />
        <div className="absolute right-[-10rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-aqua-500/10 blur-[130px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 print:block print:px-0 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        {/* ── Copy ─────────────────────────────────────────── */}
        <div>
          <Fade
            className="inline-flex items-center gap-2.5 rounded-full border border-accent-500/30 bg-accent-500/8 py-1.5 pl-1.5 pr-4 print:hidden"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            <span className="text-[12.5px] font-medium tracking-wide text-accent-200">
              Open to opportunities
            </span>
          </Fade>

          <Fade
            as="h1"
            delay={80}
            className="mt-7 text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl print:mt-0 print:text-[22pt] lg:text-[3.75rem]"
          >
            <span className="block">Emmanuel</span>
            <span className="text-gradient block">Kipngeno</span>
          </Fade>

          <Fade
            delay={160}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-accent-300 print:mt-1.5 sm:text-[15px]"
          >
            <span className="flex items-center gap-2">
              <Icon name="terminal" size={16} />
              {site.role}
            </span>
            <span className="text-ink-600">/</span>
            <span className="text-muted">{site.secondaryRole}</span>
          </Fade>

          <Fade
            delay={240}
            className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted print:mt-2 print:text-[10pt] sm:text-[17px]"
          >
            {heroIntro}
          </Fade>

          <Fade
            delay={300}
            className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-body/90 print:hidden"
          >
            {site.tagline}
          </Fade>

          {/* CTAs */}
          <Fade
            delay={360}
            className="mt-9 flex flex-wrap items-center gap-3 print:hidden"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-accent-500/20 transition-all duration-200 hover:bg-accent-400 hover:shadow-accent-400/30"
            >
              Get in touch
              <Icon
                name="arrow-right"
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={site.cvFile}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-800/60 px-5 py-3 text-sm font-semibold text-body transition-all duration-200 hover:border-accent-500/50 hover:text-white"
            >
              <Icon name="download" size={16} />
              Download CV
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted transition-colors duration-200 hover:text-white"
            >
              View projects
            </a>
          </Fade>

          {/* Socials */}
          <Fade
            as="ul"
            delay={420}
            className="mt-9 flex flex-wrap items-center gap-2.5 print:hidden"
          >
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={social.label}
                  title={social.handle}
                  className="group flex items-center gap-2.5 rounded-lg border border-ink-700 bg-ink-850/60 px-3 py-2 text-[13px] text-muted transition-colors duration-200 hover:border-accent-500/40 hover:text-accent-300"
                >
                  <Icon name={social.icon} size={15} />
                  <span className="hidden font-mono sm:inline">{social.handle}</span>
                </a>
              </li>
            ))}
          </Fade>
        </div>

        {/* ── Terminal + stats ─────────────────────────────── */}
        <div className="print:hidden lg:justify-self-end">
          <Fade
            delay={200}
            className="glow-accent overflow-hidden rounded-2xl border border-ink-700 bg-ink-900/80 backdrop-blur-xl"
          >
            {/* Chrome */}
            <div className="flex items-center gap-2 border-b border-ink-700/80 bg-ink-850/80 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11.5px] text-faint">bash — profile</span>
            </div>

            {/* Body */}
            <div className="space-y-3.5 p-5 font-mono text-[13px] leading-relaxed sm:p-6 sm:text-[13.5px]">
              {TERMINAL_LINES.map((entry, entryIndex) => {
                const base = PROMPT_DELAY + entryIndex * (PROMPT_DELAY + LINE_DELAY)

                return (
                  <div key={entry.prompt}>
                    <Fade
                      delay={base}
                      className="flex flex-wrap items-baseline gap-x-2"
                    >
                      <span className="select-none text-accent-400">$</span>
                      <span className="text-body">{entry.prompt}</span>
                    </Fade>

                    {entry.lines ? (
                      <Fade
                        as="dl"
                        delay={base + LINE_DELAY}
                        className="mt-2 space-y-1 border-l-2 border-ink-700 pl-4"
                      >
                        {entry.lines.map((row) => (
                          <div key={row.key} className="flex flex-wrap items-baseline gap-x-3">
                            <dt className="w-24 shrink-0 text-faint">{row.key}</dt>
                            <dd className="text-accent-300">{row.value}</dd>
                          </div>
                        ))}
                      </Fade>
                    ) : (
                      <Fade delay={base + LINE_DELAY} className="mt-1 pl-4 text-accent-300">
                        {entry.output}
                        {entryIndex === TERMINAL_LINES.length - 1 && (
                          <span className="ml-1 inline-block h-[1em] w-[7px] translate-y-[2px] bg-accent-400 align-middle motion-safe:animate-blink" />
                        )}
                      </Fade>
                    )}
                  </div>
                )
              })}
            </div>
          </Fade>

          {/* Stats */}
          <Fade
            as="dl"
            delay={300}
            className="mt-6 grid grid-cols-3 gap-3"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-ink-700 bg-ink-850/60 px-3 py-4 text-center backdrop-blur-sm transition-colors duration-300 hover:border-accent-500/30"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold tracking-tight text-accent-300 sm:text-[28px]">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-[11.5px] leading-snug text-faint">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </Fade>
        </div>
      </div>
    </section>
  )
}

export default Hero
