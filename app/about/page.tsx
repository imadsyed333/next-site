import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

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
            I&apos;m Imad. I write software, mostly for the web.
          </p>
          <p className="mb-4">
            A year with Toronto&apos;s Transportation Services data team taught
            me to care about the boring parts — collection, analysis, the tools
            planners actually open. That&apos;s still the kind of work I want.
          </p>
          <p>
            When I&apos;m not coding I read and play football. The Hobbies page
            is the short list of what I keep coming back to.
          </p>
        </article>
        <ExperienceTimeline />
      </div>
    </section>
  );
}
