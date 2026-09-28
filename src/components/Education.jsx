import Section from './Section'
import Reveal from './Reveal'
import { Icon } from './Icons'
import { education } from '../data/profile'

export function Education() {
  return (
    <Section id="education" index="05 / Education" title="Education">
      <div className="grid grid-cols-1 gap-4">
        {education.map((item, index) => (
          <Reveal key={item.id} delay={index * 90}>
            <article className="panel panel-hover rounded-2xl p-6 sm:p-7 print:border-neutral-300">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-500/25 bg-accent-500/10 text-accent-400">
                    <Icon name="award" size={19} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug text-white">{item.degree}</h3>
                    <p className="mt-1 text-[14px] text-accent-300">{item.institution}</p>
                    <p className="mt-0.5 font-mono text-[12.5px] text-faint">{item.period}</p>
                  </div>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1.5 text-[12px] font-medium text-accent-300">
                  <Icon name="check" size={13} strokeWidth={2.4} />
                  {item.status}
                </span>
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-ink-700/80 pt-5">
                {item.points.map((point, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted print:text-[9.5pt]">
                    <Icon
                      name="check"
                      size={15}
                      className="mt-[3px] shrink-0 text-accent-500"
                      strokeWidth={2.2}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default Education
