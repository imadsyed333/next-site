import { experiences } from "@/lib/data/experiences";

export function ExperienceTimeline() {
  return (
    <ol className="timeline timeline-vertical timeline-compact max-w-xl">
      {experiences.map((item, index) => (
        <li key={item.title} className="timeline-item">
          {index > 0 ? <hr className="bg-white/70" /> : null}
          <div className="timeline-middle">
            <span className="inline-block size-3 rounded-full bg-white" />
          </div>
          <article className="timeline-end timeline-box glass fade-in mb-4 border-none shadow-none">
            <header className="mb-1">
              <h3 className="text-lg font-normal">{item.title}</h3>
              <time className="text-sm opacity-80">{item.period}</time>
            </header>
            <p className="timeline-org mb-2 text-sm font-medium">{item.subtitle}</p>
            <p className="text-sm leading-relaxed">{item.description}</p>
          </article>
          {index < experiences.length - 1 ? <hr className="bg-white/70" /> : null}
        </li>
      ))}
    </ol>
  );
}
