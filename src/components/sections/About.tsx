'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

export function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      className="px-5 pt-16 pb-0 md:px-10 md:pt-24 lg:px-[84px] lg:pt-[120px]"
    >
      {/* Section separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease }}
        style={{ transformOrigin: 'left' }}
        className="mb-14 lg:mb-20"
      />

      {/* Two-column: text left, photo right */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
        {/* Text */}
        <motion.div
          className="flex-1 mb-14 lg:mb-0 lg:pb-16"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <h2
            className="font-black text-white mb-10"
            style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Hey, I&apos;m Tommy
          </h2>

          <div
            className="font-medium text-muted space-y-6"
            style={{ fontSize: 'clamp(18px, 1.6vw, 26px)', lineHeight: 1.6 }}
          >
            <p>
              I started as a frontend developer. Then I crossed into UX and UI design and spent the
              next 17 years working on complex digital products
              for banks, insurance companies, and healthcare organisations.
            </p>
            <p>
              I never stopped writing code. I understand how architectures fit together, what&apos;s
              expensive before
              anyone builds it, where the edge cases live. AI has made that combination sharper: I
              design at full depth and build at full speed.
            </p>
            <p>
              When I&apos;m not designing or building, I&apos;m travelling (40 countries and
              counting), coaching football, or foil surfing.
            </p>
          </div>
        </motion.div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="shrink-0 flex justify-end lg:self-end"
        >
          <img
            src="/assets/tommy.webp"
            alt="Thomas Veit — Design Engineer based in Zurich"
            className="block w-full rounded-t-[16px]"
            style={{ maxWidth: '420px' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
