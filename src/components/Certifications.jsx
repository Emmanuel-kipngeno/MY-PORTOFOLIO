import Section from './Section'
import Reveal from './Reveal'
import { Icon } from './Icons'
import { certifications, achievements } from '../data/profile'

function CertCard({ cert, index }) {
  return (
    <Reveal as="li" delay={index * 80}>
      <div className="panel panel-hover flex h-full flex-col rounded-2xl p-6 print:border-neutral-300">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-aqua-400/25 bg-aqua-400/10 text-aqua-400">
            <Icon name={cert.icon} size={18} />
          </span>
          <span className="rounded-md border border-ink-700 bg-ink-800/70 px-2 py-1 font-mono text-[10.5px] uppercase tracking-wider text-faint">
            {cert.period}
          </span>
        </div>

        <h3 className="mt-4 text-[15.5px] font-semibold leading-snug text-white">{cert.name}</h3>
        <p className="mt-1 text-[13px] text-accent-300/90">{cert.issuer}</p>
        <p className="mt-2.5 text-[13px] leading-relaxed text-faint">{cert.note}</p>
      </div>
    </Reveal>
  )
}

function AchievementItem({ item, index }) {
  return (
    <Reveal
      as="li"
      delay={index * 80}
      className={`flex gap-4 rounded-2xl p-6 ${
        item.highlight
          ? 'border border-signal-400/25 bg-signal-400/[0.07]'
          : 'border border-ink-700 bg-ink-850/50'
      } print:border-neutral-300 print:bg-white`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${
          item.highlight
            ? 'border-signal-400/40 bg-signal-400/15 text-signal-300'
            : 'border-accent-500/25 bg-accent-500/10 text-accent-400'
        }`}
      >
        <Icon name="award" size={17} />
      </span>
      <div>
        <h3 className="text-[14.5px] font-semibold leading-snug text-white">{item.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-faint">{item.detail}</p>
      </div>
    </Reveal>
  )
}

export function Certifications() {
  return (
    <Section
      id="certifications"
      index="06 / Credentials"
      title="Training & certifications"
      lead="Formal training across Cisco networking, AWS, Huawei cloud and software engineering."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {certifications.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </ul>

        <div>
          <h3 className="mb-5 flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-signal-300 print:mb-2 print:text-[8pt] print:font-sans print:font-semibold print:tracking-normal print:text-black">
            <span className="h-px w-5 bg-signal-400/50 print:hidden" />
            Key achievements
          </h3>
          <ul className="space-y-3.5">
            {achievements.map((item, index) => (
              <AchievementItem key={item.id} item={item} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default Certifications
