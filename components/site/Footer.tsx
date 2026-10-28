import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-note">MiKi is in active development. Visuals on this page are concept.</div>
        <div className="footer-main-row">
          <div className="footer-logo">
            <img src="/assets/miki-logo-7414a10a.jpg" alt="MiKi Logo" width="96" height="64" />
          </div>
          <SocialLinks className="footer-socials" label="Footer social links" />
          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <span>miki.si</span>
            <span>© 2026 MiKi</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
