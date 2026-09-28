/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio — no component changes required.
 */

export const site = {
  name: 'Emmanuel Kipngeno',
  initials: 'EK',
  role: 'System Administrator',
  secondaryRole: 'Cloud & Full-Stack',
  tagline: 'I keep systems available, access controlled and users supported.',
  baseUrl: 'https://emmanuel-kipngeno.github.io/portfolio',
  email: 'immanuelkipngno7387@gmail.com',
  phone: '+254 701 050 046',
  phoneHref: '+254701050046',
  location: 'Kenya',
  cvFile: 'emmanuel-kipngeno-cv.pdf',
  cvLabel: 'Download CV (PDF)',
}

export const socials = [
  {
    label: 'GitHub',
    handle: 'github.com/Emmanuel-kipngeno',
    href: 'https://github.com/Emmanuel-kipngeno',
    icon: 'github',
  },
  {
    label: 'Email',
    handle: 'immanuelkipngno7387@gmail.com',
    href: `mailto:${site.email}`,
    icon: 'mail',
  },
  {
    label: 'Phone',
    handle: site.phone,
    href: `tel:${site.phoneHref}`,
    icon: 'phone',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

/** Short, scannable pitch for the hero. */
export const heroIntro =
  'System Administrator with three years of hands-on experience in cloud infrastructure, server administration and secure application deployment.'

export const heroStats = [
  { value: '3+', label: 'Years in production IT' },
  { value: '2nd', label: 'Globally, Huawei ICT 2024' },
  { value: 'AWS', label: 'Huawei Cloud & Cisco' },
]

export const about = {
  paragraphs: [
    'Methodical and security-minded, I have a record of keeping systems available, access controlled and users well supported. My work spans Linux and Windows server administration, cloud resource management, identity and access management, and the deployment of full-stack applications and REST APIs.',
    'I hold a BSc in Information Technology from Jomo Kenyatta University of Agriculture and Technology, earned alongside a Cisco certification, and I placed 2nd globally in the Huawei ICT cloud computing competition against international teams. That competition tested my ability to design cloud solutions with attention to availability, scalability and security.',
    'I am comfortable working independently or within a team, communicating clearly with both technical and non-technical colleagues, and learning new platforms quickly. I am now seeking to contribute to a security-focused engineering team where reliability, protection of client systems and continuous improvement are valued.',
  ],
  pillars: [
    {
      icon: 'shield',
      title: 'Security first',
      body: 'Hardening, patching, least-privilege access control and documented incident response as defaults rather than afterthoughts.',
    },
    {
      icon: 'cloud',
      title: 'Cloud fluency',
      body: 'Designing and running virtualised infrastructure on AWS and Huawei Cloud with availability and scalability in mind.',
    },
    {
      icon: 'gauge',
      title: 'Operational discipline',
      body: 'Monitoring, backups and tested recovery routines that measurably reduce downtime and data-loss risk.',
    },
    {
      icon: 'users',
      title: 'Clear communication',
      body: 'Documenting configurations and procedures, supporting users patiently, and training colleagues without jargon.',
    },
  ],
}

export const skillGroups = [
  {
    id: 'systems',
    label: 'Systems & Security',
    icon: 'server',
    accent: 'accent',
    skills: [
      'Linux & Windows server administration',
      'User & access management',
      'System hardening',
      'Patching & updates',
      'Monitoring',
      'Backup & recovery',
      'Incident response',
      'Troubleshooting',
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Networking',
    icon: 'cloud',
    accent: 'aqua',
    skills: [
      'AWS',
      'Huawei Cloud',
      'Virtual machines',
      'Cloud storage',
      'Cloud networking',
      'Identity & access management',
      'Virtualisation',
      'Cisco networking',
      'TCP/IP fundamentals',
      'Load balancing concepts',
    ],
  },
  {
    id: 'development',
    label: 'Development & Automation',
    icon: 'code',
    accent: 'accent',
    skills: [
      'Full-stack web development',
      'REST API design & integration',
      'Application deployment',
      'Git version control',
      'Scripting for administration tasks',
    ],
  },
  {
    id: 'professional',
    label: 'Professional',
    icon: 'briefcase',
    accent: 'signal',
    skills: [
      'Technical support',
      'User training',
      'Clear documentation',
      'Problem solving under pressure',
      'Teamwork',
      'Time management',
    ],
  },
]

/**
 * Projects inferred from documented professional experience.
 * NOTE: `stack` entries are the fields to verify/expand before going live —
 * they are intentionally conservative and only name tools already
 * referenced on the CV. Add repo/demo links to `links` when available.
 */
export const projects = [
  {
    id: 'm-taka-platform',
    name: 'M-Taka Internal Web Platform',
    kicker: 'Full-Stack · API',
    period: 'Feb 2026 – Jul 2026',
    role: 'System Administrator & Full-Stack Developer',
    summary:
      'Designed, built and deployed full-stack web features and REST APIs backing M-Taka’s internal operations, with authentication, session handling and input validation applied at every layer.',
    highlights: [
      'Built and deployed production web features and REST API endpoints used by the internal team.',
      'Applied sound authentication, session handling and input validation rather than relying on framework defaults.',
      'Administered the servers and cloud resources hosting the application alongside day-to-day support.',
      'Documented deployments and procedures so support stayed consistent across the team.',
    ],
    stack: ['REST APIs', 'Full-Stack Development', 'Authentication & Sessions', 'Input Validation', 'Cloud Hosting', 'Git'],
    // TODO: add repo or live demo URLs when available
    links: [],
    featured: true,
  },
  {
    id: 'huawei-cloud-solutions',
    name: 'Cloud Solutions & Virtualisation Design',
    kicker: 'Cloud · Networking',
    period: 'Sept 2023 – Jul 2024',
    role: 'Huawei ICT Academy — 2nd Place Globally',
    summary:
      'Enterprise cloud architecture designed and validated under the Huawei ICT competition, judged against international teams on availability, scalability and security.',
    highlights: [
      'Placed 2nd globally in the Huawei ICT Academy cloud computing competition.',
      'Designed cloud solutions with explicit attention to availability, scalability and security.',
      'Deployed and managed cloud services, virtual networks and virtualised environments end to end.',
      'Completed intensive training across cloud computing, networking and enterprise ICT infrastructure.',
    ],
    stack: ['Huawei Cloud', 'Virtual Networks', 'Virtualisation', 'Cloud Architecture', 'Networking'],
    links: [],
    featured: true,
  },
  {
    id: 'admin-automation',
    name: 'Administration & Hardening Routines',
    kicker: 'Automation · Security',
    period: '2024 – Present',
    role: 'System Administrator',
    summary:
      'Repeatable administration routines — monitoring, backup and recovery testing, patching and account lifecycle — scripted to reduce manual drift and keep infrastructure stable.',
    highlights: [
      'Scripted routine administration tasks to cut repetitive manual work and reduce configuration drift.',
      'Ran scheduled backups and tested recovery to genuinely verify restore, not just backup success.',
      'Maintained user accounts, roles and permissions on least-privilege principles.',
      'Diagnosed application and infrastructure faults to root cause rather than applying symptomatic fixes.',
    ],
    stack: ['Linux', 'Bash Scripting', 'Monitoring', 'Backup & Recovery', 'IAM', 'TCP/IP'],
    links: [],
    featured: false,
  },
]

export const experience = [
  {
    id: 'm-taka',
    role: 'System Administrator & Full-Stack Developer',
    company: 'M-Taka',
    period: 'Feb 2026 – Jul 2026',
    type: 'Full-time',
    location: 'Kenya',
    points: [
      'Administered servers, cloud resources and internal systems, keeping services available and responding promptly to incidents and user requests.',
      'Managed user accounts, roles and permissions on least-privilege principles to protect company and customer data.',
      'Designed, built and deployed full-stack web features and REST APIs, applying sound authentication, session handling and input validation.',
      'Monitored system health and performance, ran routine backups and tested recovery to reduce downtime and data-loss risk.',
      'Applied updates and configuration changes carefully, and diagnosed application and infrastructure faults to find root causes.',
      'Documented configurations, deployments and procedures so support remained consistent across the team.',
      'Worked closely with the team lead and colleagues to prioritise tasks and deliver within agreed timelines.',
    ],
  },
  {
    id: 'tech-savannah',
    role: 'System Administrator Intern',
    company: 'Tech Savannah Technologies',
    period: 'Apr 2025 – Sept 2025',
    type: 'Internship',
    location: 'Kenya',
    points: [
      'Supported daily administration of servers, networks and end-user systems in a client-focused technology environment.',
      'Created and maintained user accounts, network services and system updates to keep infrastructure stable and patched.',
      'Diagnosed and resolved hardware, software and connectivity issues, giving users timely and courteous support.',
      'Assisted with system monitoring, backups and security housekeeping under the guidance of senior engineers.',
      'Prepared clear documentation and handover notes, and learned enterprise administration practices and tooling on the job.',
    ],
  },
  {
    id: 'huawei',
    role: 'Cloud Computing — Global 2nd Prize Winner',
    company: 'Huawei Enterprise Technologies (Huawei ICT Academy)',
    period: 'Sept 2023 – Jul 2024',
    type: 'Training & Competition',
    location: 'International',
    points: [
      'Completed intensive training in cloud computing, networking and enterprise ICT infrastructure.',
      'Placed 2nd globally in the Huawei ICT competition against international teams, demonstrating strong cloud and problem-solving skills.',
      'Gained hands-on experience deploying and managing cloud services, virtual networks and virtualised environments.',
      'Learned to design cloud solutions with attention to availability, scalability and security.',
    ],
  },
]

export const education = [
  {
    id: 'jkuat',
    degree: 'BSc Information Technology',
    institution: 'Jomo Kenyatta University of Agriculture and Technology (JKUAT)',
    period: 'Sept 2022 – Aug 2026',
    status: 'Completed August 2026',
    points: [
      'Completed August 2026. Earned a Cisco certification as part of the degree.',
      'Coursework and projects covering networking, systems, software development and information security foundations.',
    ],
  },
]

export const certifications = [
  {
    id: 'cisco',
    name: 'Cisco Certification',
    issuer: 'JKUAT',
    period: '2022 – 2026',
    icon: 'network',
    note: 'Earned as part of the BSc in Information Technology.',
  },
  {
    id: 'aws',
    name: 'Microsoft AWS Training',
    issuer: 'Microsoft',
    period: 'Sept 2024 – Mar 2025',
    icon: 'cloud',
    note: 'Cloud fundamentals and AWS services.',
  },
  {
    id: 'moringa',
    name: 'Software Engineering',
    issuer: 'Moringa School',
    period: 'Nov 2023 – May 2024',
    icon: 'code',
    note: 'Full-time software engineering programme.',
  },
  {
    id: 'huawei',
    name: 'Cloud Computing',
    issuer: 'Huawei ICT Academy',
    period: 'Sept 2023 – Jul 2024',
    icon: 'award',
    note: 'Placed 2nd globally in the accompanying competition.',
  },
]

export const achievements = [
  {
    id: 'huawei-2nd',
    title: '2nd place globally — Huawei ICT Academy',
    detail: 'Cloud computing competition, September 2023 – July 2024.',
    icon: 'award',
    highlight: true,
  },
  {
    id: 'degree-with-experience',
    title: 'Completed a full IT degree while working professionally',
    detail: 'Gained systems administration, cloud and software development experience alongside the BSc.',
    icon: 'award',
    highlight: false,
  },
  {
    id: 'combined-training',
    title: 'Cisco, AWS and Huawei cloud training combined with real administration work by 2026',
    detail: 'Certifications backed by hands-on production experience, not coursework alone.',
    icon: 'award',
    highlight: false,
  },
]

/** Shown in the contact section. Referees are available on request. */
export const contactCopy = {
  subheading:
    'I am open to system administration, cloud infrastructure and security-focused engineering roles. The fastest way to reach me is email or phone — I reply to both.',
  availability: 'Open to opportunities',
  responseTime: 'Typically replies within 24 hours',
}
