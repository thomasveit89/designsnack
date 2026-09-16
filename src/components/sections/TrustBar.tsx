'use client'

import Marquee from 'react-fast-marquee'

const logos = [
  { name: 'Finnova', src: '/assets/clients/finnova.svg' },
  { name: '3AP', src: '/assets/clients/3ap.svg' },
  { name: 'AMBOSS', src: '/assets/clients/amboss.svg' },
  { name: 'Netlive', src: '/assets/clients/netlive.svg' },
  { name: 'AXA', src: '/assets/clients/axa.svg' },
  { name: 'Sinnhaft', src: '/assets/clients/sinnhaft.svg' },
]

export function TrustBar() {
  return (
    <section className="py-16">
      <Marquee speed={60} gradient={false} autoFill>
        {logos.map((logo) => (
          <div key={logo.name} className="mx-[25px]">
            <img src={logo.src} alt={logo.name} width={280} height={150} />
          </div>
        ))}
      </Marquee>
    </section>
  )
}
