import Section from './Section'
import Reveal from './Reveal'
import { Icon } from './Icons'
import { projects } from '../data/profile'

function ProjectCard({ project, index }) {
  const { name, kicker, period, role, summary, highlights, stack, links, featured } = project

  return (
    <Reveal
      as="article"
      delay={index * 100}
      className={`panel panel-hover group relative flex h-full flex-col overflow-hidden rounded-2xl print:border-neutral-300 ${
        featured ? 'lg:col-span-1' : 'lg:col-span-1'
      }`}
    >
      {/* Accent hairline on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-md border border-accent-500/25 bg-accent-500/10 px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-accent-300">
            {kicker}
          </span>
          <span className="font-mono text-[11.5px] text-faint">{period}</span>
        </div>

        <h3 className="mt-4 text-xl font-semibold leading-snug text-white">{name}</h3>

        <p className="mt-1.5 text-[13px] text-accent-300/90">{role}</p>

        <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{summary}</p>

        <ul className="mt-5 space-y-2.5">
          {highlights.map((point, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
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

        {/* Spacer pushes the stack + links to the bottom so cards align */}
        <div className="flex-1" />

        <div className="mt-6 border-t border-ink-700/80 pt-5">
          <h4 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
            Stack &amp; focus
          </h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <li
                key={tech}
                className="rounded border border-ink-700 bg-ink-800/70 px-2 py-1 text-[11.5px] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          {links.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-1.5 text-[12.5px] font-medium text-body transition-colors duration-200 hover:border-accent-500/50 hover:text-accent-300"
                  >
                    {link.label}
                    <Icon name="arrow-up-right" size={13} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="03 / Work"
      title="Projects"
      lead="Work drawn from my professional experience — production systems administration, full-stack delivery and cloud architecture under competition."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  )
}

export default Projects
