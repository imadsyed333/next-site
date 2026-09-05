import Image from "next/image";

export default function HomePage() {
  return (
    <section className="home-hero">
      <div className="home-hero-media">
        <Image
          src="/gondolin.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="home-hero-image"
        />
      </div>
      <div className="home-hero-scrim" aria-hidden />
      <div className="home-hero-copy">
        <h1 className="page-title">Hi.</h1>
        <p className="lede">Welcome to Gondolin</p>
      </div>
    </section>
  );
}
