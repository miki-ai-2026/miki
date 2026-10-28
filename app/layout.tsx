import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })

export const metadata: Metadata = {
  title: 'MiKi - AI team for physical retail stores',
  description:
    'MiKi is an AI team inside your store that spots what needs attention and follows through.',
  icons: { icon: '/assets/miki-logo-7414a10a.jpg' },
}

export const viewport: Viewport = { themeColor: '#F4F4F5' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  )
}
