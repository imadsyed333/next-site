import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export const metadata: Metadata = {
  title: "About",
  description: "A little bit about me.",
};

export default function AboutPage() {
  return (
    <section className="page">
      <h1 className="page-title">About</h1>
      <p className="lede">A little bit about me.</p>
      <div className="about-grid mt-4 grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-2">
        <article className="glass fade-in about-copy p-6 leading-relaxed">
          <p className="mb-4">
            My name is Imad. I&apos;m a software developer specialized in
            building web applications using modern technologies such as React,
            Node.js, and TypeScript. I have a passion for creating clean,
            efficient, and user-friendly applications that solve real-world
            problems.
          </p>
          <p className="mb-4">
            My most recent experience was as a Software Developer Co-op with
            the City of Toronto&apos;s Transportation Services, as part of
            their Data Analytics team. There, I contributed to various
            internal tools and applications, streamlining data collection and
            analysis processes for transportation planning and operations.
          </p>
          <p>
            When I&apos;m not coding, I like to read, make stuff in Blender,
            and play football (soccer). Check out my Hobbies page to learn
            more.
          </p>
        </article>
        <ExperienceTimeline />
      </div>
    </section>
  );
}
