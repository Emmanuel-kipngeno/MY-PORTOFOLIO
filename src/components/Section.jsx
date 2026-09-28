import Reveal from './Reveal'

/**
 * Standard section chrome: anchor id, numbered mono eyebrow, heading and an
 * optional lead paragraph. The counter gives the page a consistent, scannable
 * rhythm as you scroll; the eyebrow is hidden in print so the page prints as
 * a clean CV.
 */
export function Section({
  id,
  index,
  title,
  lead,
  children,
  className = '',
  headingId,
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 print:py-0 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 print:mb-4 sm:mb-16">
          {index && (
            <div className="flex items-center gap-3 print:hidden">
              <span className="eyebrow">{index}</span>
              <span className="h-px flex-1 bg-gradient-to-r from-accent-500/50 via-accent-500/15 to-transparent" />
            </div>
          )}

          <h2
            id={headingId}
            className={`text-3xl font-semibold text-white sm:text-4xl print:text-[12pt] ${
              index ? 'mt-4 print:mt-0' : ''
            }`}
          >
            {title}
          </h2>

          {lead && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-[17px] print:mt-1 print:text-[9.5pt]">
              {lead}
            </p>
          )}
        </Reveal>

        {children}
      </div>
    </section>
  )
}

export default Section
