import Section from './Section'
import Reveal from './Reveal'
import { Icon } from './Icons'
import { skillGroups } from '../data/profile'

const ACCENT = {
  accent: {
    chip: 'border-accent-500/25 bg-accent-500/10 text-accent-300',
    icon: 'border-accent-500/25 bg-accent-500/10 text-accent-400',
  },
  aqua: {
    chip: 'border-aqua-400/25 bg-aqua-400/10 text-aqua-300',
    icon: 'border-aqua-400/25 bg-aqua-400/10 text-aqua-400',
  },
  signal: {
    chip: 'border-signal-400/25 bg-signal-400/10 text-signal-300',
    icon: 'border-signal-400/25 bg-signal-400/10 text-signal-400',
  },
}

export function Skills() {
  return (
    <Section
      id="skills"
      index="02 / Capabilities"
      title="Core skills"
      lead="The day-to-day toolkit: keeping infrastructure running, secure and documented — plus the development skills to build and ship the services on top of it."
      className="border-y border-ink-800/80 bg-ink-900/30"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {skillGroups.map((group, groupIndex) => {
          const theme = ACCENT[group.accent] ?? ACCENT.accent

          return (
            <Reveal key={group.id} delay={groupIndex * 90}>
              <article className="panel panel-hover h-full rounded-2xl p-6 print:border-neutral-300">
                <header className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${theme.icon}`}
                  >
                    <Icon name={group.icon} size={18} />
                  </span>
                  <h3 className="text-base font-semibold text-white">{group.label}</h3>
                </header>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className={`rounded-md border px-2.5 py-1.5 text-[12.5px] font-medium leading-none transition-transform duration-200 hover:-translate-y-0.5 print:text-[9pt] ${theme.chip}`}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export default Skills
