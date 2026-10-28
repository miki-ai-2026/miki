import type { ReactNode } from 'react'
import '../globals.css' // Tailwind loads only for the sign-in and console area

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
