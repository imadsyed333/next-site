import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { socials } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "Imad Syed — software for cities, data tools, and the web.",
};

export default function AboutPage() {
  return (
    <section className="page">
      <h1 className="page-title">About</h1>
      <p className="lede">What I work on, and where I learned it.</p>
      <div className="about-grid mt-4 grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <article className="glass fade-in about-copy p-6 leading-relaxed">
          <p className="mb-4">
            I&apos;m a software developer who&apos;s passionate about solving
            real problems. Think that&apos;s cliche? Keep reading.
          </p>
          <p className="mb-4">
            At Entries, I helped develop agents that make it much, much easier
            to work with Quickbooks (like posting an invoice from slack using
            natural language).
          </p>
          <p className="mb-4">
            At the City of Toronto, I contributed to MOVE, an open-source
            full-stack data platform making it easier for transportation data to
            create positive impact on Toronto&apos;s streets.
          </p>
          <p className="mb-4">
            Most recently, I&apos;ve contributed to Civic Dashboard, an
            open-source full-stack web app for making Toronto&apos;s democracy
            accessible to all, especially those with no political science
            degrees.
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
