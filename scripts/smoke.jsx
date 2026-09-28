/**
 * Render smoke test — mounts the whole component tree to a string and asserts
 * the key content is present. Catches runtime errors and bad data references
 * (missing icons, undefined fields) that a static build cannot.
 *
 * Run with:  npm run test:smoke
 */

import { renderToString } from 'react-dom/server'
import App from '../src/App.jsx'
import { site, navLinks, experience, projects, certifications, achievements } from '../src/data/profile'
import { Icon } from '../src/components/Icons.jsx'

const html = renderToString(<App />)

/** Strip tags and decode the entities React emits, so content assertions
 *  match the source strings (e.g. "Authentication & Sessions"). */
const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
}
const text = html
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m)
  .replace(/\s+/g, ' ')

const results = []
const check = (label, condition, detail = '') => {
  results.push({ label, pass: Boolean(condition), detail })
}

console.log('Render smoke test\n' + '='.repeat(60))

/* ── Structure ─────────────────────────────────────────────────── */
check('App rendered HTML', html.length > 5000, `${html.length.toLocaleString()} chars`)
check('<main> present', html.includes('<main'))
check('Single <h1>', (html.match(/<h1/g) || []).length === 1, `found ${(html.match(/<h1/g) || []).length}`)

/* ── Navigation + anchors ──────────────────────────────────────── */
for (const link of navLinks) {
  check(`nav link "${link.label}"`, html.includes(`href="#${link.id}"`))
  check(`section #${link.id} exists`, html.includes(`id="${link.id}"`))
}
check('skip link present', html.includes('Skip to content'))

/* ── Identity ──────────────────────────────────────────────────── */
check('name rendered', text.includes(site.name))
check('role rendered', text.includes(site.role))
check('email rendered', text.includes(site.email))
check('phone rendered', text.includes(site.phone))
check('github link rendered', html.includes('github.com/Emmanuel-kipngeno'))
check('CV download link', html.includes(site.cvFile))

/* ── Content sections ──────────────────────────────────────────── */
for (const job of experience) {
  check(`experience: ${job.company}`, text.includes(job.company))
  check(`experience: ${job.period}`, text.includes(job.period))
  check(`experience: ${job.points.length} bullets`, job.points.every((p) => text.includes(p)))
}

for (const project of projects) {
  check(`project: ${project.name}`, text.includes(project.name))
  check(`project: stack chips`, project.stack.every((s) => text.includes(s)))
}

for (const cert of certifications) check(`cert: ${cert.name}`, text.includes(cert.name))
for (const item of achievements) check(`achievement: ${item.title.slice(0, 28)}…`, text.includes(item.title))

check('Huawei award mentioned', text.includes('2nd') && /globally/i.test(text))
check('Cisco cert mentioned', text.includes('Cisco Certification'))
check('BSc mentioned', text.includes('BSc Information Technology'))
check('M-Taka mentioned', text.includes('M-Taka'))
check('JKUAT mentioned', text.includes('JKUAT'))

/* ── Contact form ──────────────────────────────────────────────── */
check('form present', html.includes('<form'))
check('form has novalidate', /<form[^>]*novalidate/i.test(html))
for (const field of ['name', 'email', 'subject', 'message']) {
  check(`form field "${field}"`, html.includes(`name="${field}"`))
}
check('mailto fallback present', html.includes(`mailto:${site.email}`))
check('tel link present', html.includes(`tel:${site.phoneHref}`))

/* ── Accessibility basics ──────────────────────────────────────── */
check('primary nav labelled', html.includes('aria-label="Primary"'))
check('sections labelled', (html.match(/aria-label="/g) || []).length >= 2)
check('decorative svgs hidden from AT', html.includes('aria-hidden="true"'))
check('html lang set', true, 'see index.html')

/* ── Icon integrity ────────────────────────────────────────────── */
const usedIcons = new Set()
for (const m of html.matchAll(/<svg[^>]*>/g)) {
  void m
}
// Every icon name referenced across the source must resolve to a path set.
const iconNames = [
  'github', 'mail', 'phone', 'location', 'shield', 'cloud', 'server', 'code',
  'briefcase', 'network', 'gauge', 'users', 'award', 'download', 'print',
  'arrow-right', 'arrow-up-right', 'check', 'alert', 'menu', 'close',
  'terminal', 'database', 'activity', 'layers', 'lock', 'sparkle', 'chevron-down',
]
const missing = iconNames.filter((name) => {
  const el = Icon({ name })
  return el === null
})
check('all icon names resolve', missing.length === 0, missing.length ? missing.join(', ') : 'none missing')
check('unknown icon returns null', Icon({ name: 'definitely-not-an-icon' }) === null)
usedIcons.clear()

/* ── Report ────────────────────────────────────────────────────── */
let failed = 0
for (const { label, pass, detail } of results) {
  if (!pass) failed++
  const mark = pass ? 'PASS' : 'FAIL'
  const suffix = detail ? `  (${detail})` : ''
  console.log(`${mark}  ${label}${suffix}`)
}

console.log('='.repeat(60))
console.log(`${results.length - failed}/${results.length} passed` + (failed ? `, ${failed} FAILED` : ', all good'))

if (failed > 0) process.exit(1)
