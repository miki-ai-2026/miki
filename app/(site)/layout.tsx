import type { ReactNode } from 'react'
import './site.css'

// Without JavaScript the scroll animations would leave content invisible.
const NO_JS_CSS =
  '.reveal,.word-bubble,.faq-slide-left,.faq-slide-right{opacity:1!important;transform:none!important}' +
  '.reveal-blur-word{filter:none!important;opacity:1!important}'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div id="top">
      <noscript>
        <style>{NO_JS_CSS}</style>
      </noscript>
      {children}
    </div>
  )
}
