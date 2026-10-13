export type CaseStudy = {
  slug: string
  title: string
  oneLiner: string
  meta: {
    role: string
    duration: string
    year: string
    type: string
  }
  heroImage?: string | null
  heroVideo?: string | null
  tools?: string[]
  url?: string
  urlLabel?: string
  nextSlug: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'joyo',
    title: 'Joyo',
    oneLiner:
      'Turn any invitation, announcement, or gift into an interactive experience. Because the reveal is part of the magic.',
    meta: {
      role: 'Design Engineer',
      duration: '6 months',
      year: '2025–26',
      type: 'Self-initiated',
    },
    heroImage: '/assets/work/joyo/joyo.webp',
    heroVideo: '/assets/work/joyo/joyo-product-video.mp4',
    tools: ['Figma', 'Next.js', 'Shadcn', 'Tailwind CSS', 'Supabase', 'Claude Code', 'Anthropic API', 'Unsplash API', 'Google OAuth', 'Vercel'],
    url: 'https://www.joyo.ch',
    urlLabel: 'Visit site',
    nextSlug: 'finnova',
  },
  {
    slug: 'finnova',
    title: 'Core Banking Platform',
    oneLiner:
      "Brought in as a UX designer to work on a large-scale project for one of Switzerland's leading core banking platforms.",
    meta: {
      role: 'UX Designer',
      duration: '1 year & counting',
      year: '2025–present',
      type: 'Client work',
    },
    heroImage: '/assets/work/finnova/finnova.webp',
    tools: ['Figma', 'Design System', 'Jira', 'Confluence'],
    nextSlug: 'laws-and-patterns',
  },
  {
    slug: 'laws-and-patterns',
    title: 'Laws & Patterns',
    oneLiner:
      'A reference tool for 100+ UX laws, cognitive biases, and design heuristics – iOS app and web.',
    meta: {
      role: 'Designer + Developer',
      duration: '4 months',
      year: '2025',
      type: 'Self-initiated',
    },
    heroImage: '/assets/work/laws-and-patterns/laws-and-patterns.webp',
    tools: ['Figma', 'React Native', 'Nativewind', 'Custom CLI', 'Supabase', 'Vercel'],
    url: 'https://apps.apple.com/ch/app/designsnack-laws-patterns/id6754067995',
    urlLabel: 'App Store',
    nextSlug: 'amboss',
  },
  {
    slug: 'amboss',
    title: 'AMBOSS Immobilien',
    oneLiner:
      'A premium website for a Swiss real estate firm – dark, gold-accented, fully CMS-driven, and built to convert.',
    meta: {
      role: 'Design Engineer',
      duration: '1 month',
      year: '2026',
      type: 'Client work',
    },
    heroImage: '/assets/work/amboss/amboss-immobilien.webp',
    tools: ['Figma', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Sanity', 'Web3Forms', 'Vercel'],
    url: 'https://www.amboss-immo.ch',
    urlLabel: 'Visit site',
    nextSlug: 'joyo',
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}
