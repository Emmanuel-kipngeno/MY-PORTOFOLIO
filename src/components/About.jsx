import Section from './Section'
import Reveal from './Reveal'
import { Icon } from './Icons'
import { about } from '../data/profile'

export function About() {
  return (
    <Section
      id="about"
      index="01 / Profile"
      title="Professional summary"
      lead="A security-minded systems engineer who treats availability, access control and clear documentation as job-one."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        {/* Narrative */}
        <div className="space-y-5">
          {about.paragraphs.map((text, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="text-[15.5px] leading-[1.75] text-muted print:text-[10pt] print:leading-snug">
                {text}
              </p>
            </Reveal>
          ))}

          <Reveal delay={about.paragraphs.length * 80}>
            <div className="rounded-xl border border-accent-500/25 bg-accent-500/[0.06] p-5">
              <p className="flex gap-3 text-[14.5px] leading-relaxed text-body">
                <Icon name="sparkle" size={18} className="mt-0.5 shrink-0 text-accent-400" />
                <span>
                  <strong className="font-semibold text-white">Currently seeking:</strong> a role on a
                  security-focused engineering team where reliability, protection of client systems and
                  continuous improvement are genuinely valued.
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Pillars */}
        <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-1">
          {about.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              as="li"
              delay={i * 80}
              className="panel panel-hover group rounded-xl p-5 print:border-neutral-300"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent-500/25 bg-accent-500/10 text-accent-400 transition-colors duration-300 group-hover:border-accent-500/50 group-hover:bg-accent-500/20">
                <Icon name={pillar.icon} size={17} />
              </span>
              <h3 className="mt-3.5 text-[15px] font-semibold text-white">{pillar.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-faint">{pillar.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default About
