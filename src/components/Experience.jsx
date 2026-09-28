import Section from './Section'
import Reveal from './Reveal'
import { Icon } from './Icons'
import { experience } from '../data/profile'

const TYPE_TONE = {
  'Full-time': 'border-accent-500/30 bg-accent-500/10 text-accent-300',
  Internship: 'border-aqua-400/30 bg-aqua-400/10 text-aqua-300',
  'Training & Competition': 'border-signal-400/30 bg-signal-400/10 text-signal-300',
}

function TimelineEntry({ job, index, isLast }) {
  return (
    <Reveal as="li" delay={index * 100} className="relative grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7">
      {/* Rail */}
      <div className="relative flex flex-col items-center">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
            index === 0
              ? 'border-accent-500/50 bg-accent-500/15 text-accent-300'
              : 'border-ink-600 bg-ink-850 text-faint'
          }`}
        >
          <Icon name="briefcase" size={17} />
        </span>
        {!isLast && <span aria-hidden="true" className="mt-2 w-px flex-1 bg-gradient-to-b from-ink-600 to-ink-800" />}
      </div>

      {/* Body */}
      <div className={`pb-12 ${isLast ? 'pb-0' : ''}`}>
        <div className="panel panel-hover rounded-2xl p-6 print:border-neutral-300">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-lg font-semibold leading-snug text-white">{job.role}</h3>
            {job.type && (
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wider ${
                  TYPE_TONE[job.type] ?? TYPE_TONE['Full-time']
                }`}
              >
                {job.type}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px]">
            <span className="font-medium text-accent-300">{job.company}</span>
            <span aria-hidden="true" className="text-ink-600">
              ·
            </span>
            <span className="font-mono text-[12.5px] text-faint">{job.period}</span>
            {job.location && (
              <>
                <span aria-hidden="true" className="text-ink-600">
                  ·
                </span>
                <span className="inline-flex items-center gap-1 text-[12.5px] text-faint">
                  <Icon name="location" size={12} />
                  {job.location}
                </span>
              </>
            )}
          </div>

          <ul className="mt-5 space-y-2.5">
            {job.points.map((point, i) => (
              <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-muted print:text-[9.5pt]">
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
        </div>
      </div>
    </Reveal>
  )
}

export function Experience() {
  return (
    <Section
      id="experience"
      index="04 / Experience"
      title="Professional experience"
      lead="Three years across client-facing administration, internal platform work and international cloud competition."
      className="border-y border-ink-800/80 bg-ink-900/30"
    >
      <ol className="print-plain">
        {experience.map((job, index) => (
          <TimelineEntry
            key={job.id}
            job={job}
            index={index}
            isLast={index === experience.length - 1}
          />
        ))}
      </ol>
    </Section>
  )
}

export default Experience
