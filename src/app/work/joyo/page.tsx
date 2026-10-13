import type { Metadata } from 'next'
import { getCaseStudy } from '@/data/work'
import { CaseStudyLayout } from '@/components/work/CaseStudyLayout'
import { CaseStudyBody, Intro, Chapter, Closing } from '@/components/work/CaseStudyBody'

export const metadata: Metadata = {
  title: 'Joyo — DESIGNSNACK',
  description: 'Turn any invitation, announcement, or gift into an interactive experience. Because the reveal is part of the magic.',
  openGraph: {
    title: 'Joyo — DESIGNSNACK',
    description: 'Turn any invitation, announcement, or gift into an interactive experience. Because the reveal is part of the magic.',
    url: 'https://designsnack.ch/work/joyo',
  },
}

export default function JoyoPage() {
  const project = getCaseStudy('joyo')!
  const nextProject = getCaseStudy(project.nextSlug) ?? null

  return (
    <CaseStudyLayout
      title={project.title}
      oneLiner={project.oneLiner}
      meta={project.meta}
      heroImage={project.heroImage}
      heroVideo={project.heroVideo}
      tools={project.tools}
      url={project.url}
      urlLabel={project.urlLabel}
      nextProject={nextProject}
    >
      <CaseStudyBody>
        <Intro>
          We&apos;ve all been on both sides of an underwhelming gift moment. You put real thought and
          care into something – then you hand over an envelope, or forward a link, and none of that
          comes through. The story behind the gift gets lost. I built Joyo to fix that. Anyone can
          create an interactive gift journey – a sequence of personal screens with photos, questions,
          messages, and a reveal – and share it as a URL. The moment of giving becomes part of the
          experience.
        </Intro>

        <Chapter heading="Making creation feel effortless" image="/assets/work/joyo/joyo-create-experience.webp">
          The hardest part wasn&apos;t the player – it was making the creator side feel easy enough
          that anyone would actually use it. My answer was AI-first: you describe your gift concept
          in a chat, and Claude generates a complete sequence of typed screens tailored to what you
          described. You land in the editor with something real to work with, not a blank canvas.
        </Chapter>

        <Chapter heading="What a gift journey is made of" image="/assets/work/joyo/joyo-editor.webp">
          A journey is a sequence of typed screens: a hero screen sets the story, choice screens let
          the recipient engage, a text input lets them write something back, and a reveal screen is
          the emotional peak – full-screen, confetti, the whole thing. Themes shift the entire mood
          of the experience. The editor needed to be powerful enough for someone who wants full
          control, and simple enough for someone who just wants to send something personal.
          Drag-drop reordering, inline editing, and a live preview running alongside made that
          balance possible.
        </Chapter>

        <Chapter heading="The moment it all has to land" image="/assets/work/joyo/joyo-player.webp">
          The player is where everything has to work. Full-screen, no chrome, immersive. The
          recipient moves through each screen one at a time – making choices, answering – until the
          reveal. These animation and timing decisions only make sense when you feel them in the
          browser, not sketch them in Figma. Doing both sides meant I could close that loop fast.
        </Chapter>

        <Closing>
          Joyo is live – the full flow in production, in English and German. Designing and building
          a consumer SaaS solo, from concept through Claude API integration to deployed product, is
          what Design Engineer means in practice.
        </Closing>
      </CaseStudyBody>
    </CaseStudyLayout>
  )
}
