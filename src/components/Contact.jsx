import { useId, useRef, useState } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import { Icon } from './Icons'
import { contactCopy, site, socials } from '../data/profile'

const EMPTY = { name: '', email: '', subject: '', message: '' }

const LIMITS = { name: 80, subject: 120, message: 2000 }

// Deliberately permissive: enough to catch typos, strict enough to reject garbage.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(email)) errors.email = 'That does not look like a valid email address.'

  if (subject.length > LIMITS.subject) errors.subject = `Keep the subject under ${LIMITS.subject} characters.`

  if (!message) errors.message = 'Please include a short message.'
  else if (message.length < 20) errors.message = 'A little more detail helps — at least 20 characters.'
  else if (message.length > LIMITS.message) errors.message = `Keep the message under ${LIMITS.message} characters.`

  if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`

  return errors
}

function buildMailto(values) {
  const subject = values.subject.trim() || `Portfolio enquiry from ${values.name.trim()}`
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    '',
    values.message.trim(),
  ].join('\n')

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function Field({ id, label, error, hint, children, required }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center gap-1.5 text-[13px] font-medium text-body">
        {label}
        {required ? (
          <span className="text-accent-400" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-faint">(optional)</span>
        )}
      </label>

      {children}

      <div className="mt-1.5 min-h-[1.25rem]">
        {error ? (
          <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-[12px] text-red-400">
            <Icon name="alert" size={12} strokeWidth={2} />
            {error}
          </p>
        ) : (
          hint && <p className="text-[12px] text-faint">{hint}</p>
        )}
      </div>
    </div>
  )
}

const inputBase =
  'w-full rounded-xl border bg-ink-900/70 px-4 py-3 text-[14.5px] text-body placeholder:text-faint/70 transition-colors duration-200 focus:outline-none focus:ring-0'

function inputTone(hasError) {
  return hasError
    ? 'border-red-500/50 focus:border-red-400'
    : 'border-ink-700 focus:border-accent-500/60 hover:border-ink-600'
}

export function Contact() {
  const uid = useId()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sent
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(null)

  const id = (name) => `${uid}-${name}`

  const setField = (name) => (event) => {
    const { value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))

    // Only re-validate a field once it has been blurred, so the user is not
    // shouted at while they are still typing their first character.
    if (touched[name]) {
      setErrors(validate({ ...values, [name]: value }))
    }
  }

  const blurField = (name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validate(values))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid control for keyboard/AT users.
      const firstInvalid = ['name', 'email', 'subject', 'message'].find((key) => nextErrors[key])
      document.getElementById(id(firstInvalid))?.focus()
      return
    }

    window.location.href = buildMailto(values)
    setStatus('sent')
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard blocked (insecure context or denied permission) — the
         address is visible on screen either way, so this can fail silently. */
    }
  }

  const github = socials.find((s) => s.icon === 'github')

  return (
    <Section
      id="contact"
      index="07 / Contact"
      title="Get in touch"
      lead={contactCopy.subheading}
      className="border-t border-ink-800/80 bg-ink-900/30"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        {/* Direct channels */}
        <div className="space-y-4">
          <Reveal>
            <div className="panel rounded-2xl p-6 print:border-neutral-300">
              <h3 className="text-base font-semibold text-white">Direct channels</h3>
              <p className="mt-1.5 text-[13.5px] text-faint">
                Prefer to skip the form? These reach me straight away.
              </p>

              <ul className="mt-5 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-center gap-3.5 rounded-xl border border-ink-700 bg-ink-850/60 p-3.5 transition-colors duration-200 hover:border-accent-500/40"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent-500/25 bg-accent-500/10 text-accent-400">
                      <Icon name="mail" size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10.5px] uppercase tracking-wider text-faint">
                        Email
                      </span>
                      <span className="block truncate text-[13.5px] text-body group-hover:text-accent-300">
                        {site.email}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="shrink-0 rounded-md p-1.5 text-faint transition-colors duration-200 hover:bg-ink-700 hover:text-accent-300"
                    >
                      <Icon name={copied ? 'check' : 'layers'} size={15} />
                    </button>
                  </a>
                </li>

                <li>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="group flex items-center gap-3.5 rounded-xl border border-ink-700 bg-ink-850/60 p-3.5 transition-colors duration-200 hover:border-accent-500/40"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-aqua-400/25 bg-aqua-400/10 text-aqua-400">
                      <Icon name="phone" size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10.5px] uppercase tracking-wider text-faint">
                        Phone
                      </span>
                      <span className="block text-[13.5px] text-body group-hover:text-accent-300">
                        {site.phone}
                      </span>
                    </span>
                  </a>
                </li>

                {github && (
                  <li>
                    <a
                      href={github.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center gap-3.5 rounded-xl border border-ink-700 bg-ink-850/60 p-3.5 transition-colors duration-200 hover:border-accent-500/40"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-ink-600 bg-ink-800 text-muted">
                        <Icon name="github" size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10.5px] uppercase tracking-wider text-faint">
                          GitHub
                        </span>
                        <span className="block truncate text-[13.5px] text-body group-hover:text-accent-300">
                          {github.handle}
                        </span>
                      </span>
                      <Icon
                        name="arrow-up-right"
                        size={15}
                        className="shrink-0 text-faint transition-colors group-hover:text-accent-300"
                      />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex items-center gap-2.5 rounded-xl border border-ink-700 bg-ink-850/40 px-5 py-4">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              <p className="text-[13px] text-muted">
                <span className="font-medium text-accent-300">{contactCopy.availability}</span>
                <span className="text-faint"> · {contactCopy.responseTime}</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={60}>
          <form
            onSubmit={onSubmit}
            noValidate
            aria-labelledby={`${uid}-form-title`}
            className="panel rounded-2xl p-6 print:hidden sm:p-7"
          >
            <h3 id={`${uid}-form-title`} className="text-base font-semibold text-white">
              Send a message
            </h3>
            <p className="mt-1.5 text-[13px] text-faint">
              Validated in your browser, then handed to your email client — nothing is stored or sent
              through a third party.
            </p>

            <div className="mt-6 space-y-1">
              <Field id={id('name')} label="Name" error={errors.name} required>
                <input
                  id={id('name')}
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={LIMITS.name}
                  value={values.name}
                  onChange={setField('name')}
                  onBlur={blurField('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${id('name')}-error` : undefined}
                  placeholder="Jane Doe"
                  className={`${inputBase} ${inputTone(errors.name)}`}
                />
              </Field>

              <Field id={id('email')} label="Email" error={errors.email} required>
                <input
                  id={id('email')}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={120}
                  value={values.email}
                  onChange={setField('email')}
                  onBlur={blurField('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${id('email')}-error` : undefined}
                  placeholder="jane@company.com"
                  className={`${inputBase} ${inputTone(errors.email)}`}
                />
              </Field>

              <Field
                id={id('subject')}
                label="Subject"
                error={errors.subject}
                hint="Tell me the role or area you have in mind."
              >
                <input
                  id={id('subject')}
                  name="subject"
                  type="text"
                  maxLength={LIMITS.subject}
                  value={values.subject}
                  onChange={setField('subject')}
                  onBlur={blurField('subject')}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? `${id('subject')}-error` : undefined}
                  placeholder="System Administrator role at …"
                  className={`${inputBase} ${inputTone(errors.subject)}`}
                />
              </Field>

              <Field
                id={id('message')}
                label="Message"
                error={errors.message}
                hint={`${values.message.trim().length} / ${LIMITS.message} characters`}
                required
              >
                <textarea
                  id={id('message')}
                  name="message"
                  rows={5}
                  maxLength={LIMITS.message}
                  value={values.message}
                  onChange={setField('message')}
                  onBlur={blurField('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? `${id('message')}-error` : undefined}
                  placeholder="A few lines about the role, the team and what you are looking for."
                  className={`${inputBase} resize-y ${inputTone(errors.message)}`}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3.5 text-sm font-semibold text-ink-950 shadow-lg shadow-accent-500/20 transition-all duration-200 hover:bg-accent-400 hover:shadow-accent-400/30"
            >
              Open in my email app
              <Icon
                name="arrow-right"
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            {status === 'sent' && (
              <p
                role="status"
                className="mt-4 flex items-start gap-2.5 rounded-xl border border-accent-500/25 bg-accent-500/[0.07] p-4 text-[13px] leading-relaxed text-accent-200"
              >
                <Icon name="check" size={16} className="mt-0.5 shrink-0" strokeWidth={2.2} />
                <span>
                  Your email app should now be open with the message ready to send. If nothing happened,
                  email me directly at{' '}
                  <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-2">
                    {site.email}
                  </a>
                  .
                </span>
              </p>
            )}

            <p className="mt-4 text-center text-[11.5px] leading-relaxed text-faint">
              Referees are available on request. Your details are used only to reply to this enquiry.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

export default Contact
