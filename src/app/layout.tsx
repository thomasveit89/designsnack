import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import './globals.css'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-urbanist',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://designsnack.ch'),
  title: 'DESIGNSNACK',
  description:
    'Senior Design Engineer based in Switzerland. 17+ years of UX depth, frontend roots, and AI in the workflow. I embed in your team and ship what I design.',
  icons: {
    icon: { url: '/assets/favicon.png', type: 'image/png' },
    shortcut: { url: '/assets/favicon.ico', type: 'image/x-icon' },
  },
  openGraph: {
    title: 'DESIGNSNACK',
    description:
      'Senior Design Engineer based in Switzerland. I design and build – accelerated by AI.',
    url: 'https://designsnack.ch',
    siteName: 'DESIGNSNACK',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/assets/og-designsnack.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <head>
        <script
          defer
          src="https://analytics.designsnack.ch/script.js"
          data-website-id="81391019-315a-451e-9fe1-4671fc5bfda2"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
