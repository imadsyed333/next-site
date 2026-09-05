import { socials } from "@/lib/data/contact";

export function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <p className="site-footer-label">Get in touch</p>
      <nav aria-label="Social links">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            {social.name}
          </a>
        ))}
      </nav>
    </footer>
  );
}
