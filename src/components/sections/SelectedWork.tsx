'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Button } from '@/components/ui/Button'

const projects = [
  {
    id: 'joyo',
    slug: '/work/joyo',
    title: 'Joyo',
    description:
      'Designed and built an AI-powered SaaS platform for personalised gift experiences – from concept to production.',
    tag: 'Self-initiated · 2025/26',
    bg: '#fafaf9',
    dark: false,
    image: '/assets/work/joyo/joyo.webp',
  },
  {
    id: 'finnova',
    slug: '/work/finnova',
    title: 'Core Banking Platform',
    description:
      "One year embedded as senior design partner on one of Switzerland's leading core banking platforms.",
    tag: 'Embedded · 1 year & counting',
    bg: '#0e0e10',
    dark: true,
    image: '/assets/work/finnova/finnova.webp',
  },
  {
    id: 'laws-and-patterns',
    slug: '/work/laws-and-patterns',
    title: 'Laws & Patterns',
    description:
      'Designed and built a reference tool for 100+ UX laws and cognitive biases – iOS app and web.',
    tag: 'Self-initiated · 2025',
    bg: '#0d0d14',
    dark: true,
    image: '/assets/work/laws-and-patterns/laws-and-patterns.webp',
    video: '/assets/work/laws-and-patterns/laws-and-patterns.mp4',
  },
  {
    id: 'amboss',
    slug: '/work/amboss',
    title: 'AMBOSS Immobilien',
    description:
      'Designed and built a premium website for a Swiss real estate firm – CMS-driven, animated, built to convert.',
    tag: 'Client work · 2026',
    bg: '#14161a',
    dark: true,
    image: '/assets/work/amboss/amboss-immobilien.webp',
  },
]

type Project = (typeof projects)[0]

function WorkCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: Project
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const seg = 1 / total

  // Slide in from below for cards after the first
  const yInputs = index === 0 ? [0, 1] : [(index - 1) * seg, index * seg]
  const yOutputs = index === 0 ? ['0%', '0%'] : ['100%', '0%']
  const y = useTransform(scrollYProgress, yInputs, yOutputs, { clamp: true })

  // Scale down when the next card arrives (not for the last card)
  const scaleInputs =
    index < total - 1 ? [index * seg, (index + 1) * seg] : [0, 1]
  const scaleOutputs =
    index < total - 1 ? [1, 0.93 - (total - 2 - index) * 0.015] : [1, 1]
  const scale = useTransform(scrollYProgress, scaleInputs, scaleOutputs, { clamp: true })

  const textColor = project.dark ? '#ffffff' : '#111827'
  const mutedColor = project.dark ? '#e5e5e5' : '#374151'
  const tagBg = project.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const footerBg = project.dark ? '#0a0a0f' : '#f0efee'
  const btnBg = project.dark ? '#ffffff' : '#111827'
  const btnText = project.dark ? '#111827' : '#ffffff'

  return (
    <motion.div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: index + 1,
        y,
        scale,
        transformOrigin: 'top center',
      }}
      className="w-full h-screen flex items-start pt-[60px] pb-[20px] px-4 md:pt-[70px] md:px-10 lg:pt-[80px] lg:pb-[40px] lg:px-[84px]"
    >
      <div
        className="w-full rounded-[12px] overflow-hidden flex flex-col md:h-[calc(100vh-120px)]"
        style={{ background: project.bg }}
      >
        {/* Screenshot area */}
        <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto md:flex-1">
          {'video' in project && project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: project.bg }}
            >
              <span
                className="font-black opacity-10"
                style={{ fontSize: '64px', color: textColor }}
              >
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Footer bar */}
        <div
          className="flex-none flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-14 md:py-10"
          style={{ background: footerBg, minHeight: '120px' }}
        >
          <div className="flex flex-col gap-2 md:gap-3 md:max-w-[600px]">
            <span
              className="text-[11px] md:text-[13px] font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full w-fit"
              style={{ background: tagBg, color: mutedColor }}
            >
              {project.tag}
            </span>
            <p
              className="font-medium leading-snug"
              style={{ fontSize: 'clamp(17px, 1.8vw, 28px)', color: mutedColor }}
            >
              {project.description}
            </p>
          </div>

          <a
            href={project.slug}
            className={`flex-none self-start md:self-auto flex items-center gap-2 rounded-full font-bold px-5 py-3 md:px-8 md:py-5 transition-colors hover:text-steel-mist ${project.dark ? 'text-[#111827]' : 'text-white'}`}
            style={{ background: btnBg, fontSize: 'clamp(16px, 1.4vw, 24px)' }}
          >
            View project →
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="work">
      {/* Section heading */}
      <div className="px-5 py-12 md:px-10 md:py-16 lg:px-[84px] lg:py-[64px] flex justify-end">
        <h2
          className="font-black text-white text-right"
          style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '-0.03em' }}
        >
          Selected work
        </h2>
      </div>

      {/* Stacking cards container */}
      <div
        ref={containerRef}
        style={{ height: `${projects.length * 100}vh` }}
        className="relative"
      >
        {projects.map((project, i) => (
          <WorkCard
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
