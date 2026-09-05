import Link from "next/link";

export default function HomePage() {
  return (
    <section className="page">
      <h1 className="page-title">Hi, I&apos;m Imad</h1>
      <div className="glass fade-in home-intro">
        <p className="lede">
          I build tools that help cities and small businesses use their data.
        </p>
        <p className="home-note">
          This site is named for Gondolin — a hidden city, built with care.
        </p>
        <p className="home-cta">
          <Link href="/projects">Selected work</Link>
          <Link href="#contact">Get in touch</Link>
        </p>
      </div>
    </section>
  );
}
