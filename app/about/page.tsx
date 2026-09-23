import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { socials } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "About",
  description: "Imad Syed — software for cities, data tools, and the web.",
};

export default function AboutPage() {
  return (
    <section className="page">
      <h1 className="page-title">About</h1>
      <p className="lede">What I work on, and where I learned it.</p>
      <div className="about-grid mt-4 grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <article className="glass fade-in about-copy p-6 leading-relaxed">
          <p className="mb-4">
            I build software to make people&apos;s lives easier.
          </p>
          <p className="mb-4">
            At Entries, I developed agentic workflows to simplify accounting
            work with Quickbooks. Imagine posting an invoice to Quickbooks just
            by typing in Slack, or having all your bank transactions reviewed +
            categorized by an AI accountant.
          </p>
          <p className="mb-4">
            At the City of Toronto, I worked on MOVE, an open-source
            transportation data platform. I've made radical changes to UI/UX to
            help analysts make better sense of complex data, driving better
            policy decisions for Toronto's streets.
          </p>
          <p className="mb-4">
            Most recently, I&apos;ve contributed to Civic Dashboard, an
            open-source civic engagement platform helping Torontonians
            understand their city&apos;s democracy leading up to the 2026
            municipal election.
          </p>
          <p>
            If any of this sounds interesting to you, feel free to reach out!
            Happy to talk about it.
          </p>
          <nav
            className="about-links mt-6 flex flex-wrap gap-6"
            aria-label="Profiles"
          >
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
        </article>
        <ExperienceTimeline />
      </div>
    </section>
  );
}
