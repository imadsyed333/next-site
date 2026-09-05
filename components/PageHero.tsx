export function PageHero() {
  return (
    <div className="page-hero" aria-hidden>
      <picture className="page-hero-media">
        <source
          media="(max-width: 700px)"
          srcSet="/gondolin-mobile.webp"
          width={853}
          height={1844}
        />
        <img
          src="/gondolin.webp"
          alt=""
          width={3840}
          height={2160}
          fetchPriority="high"
          decoding="async"
          className="page-hero-image"
        />
      </picture>
      <div className="page-hero-scrim" />
    </div>
  );
}
