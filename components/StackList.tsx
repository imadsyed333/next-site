export function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li key={tech}>
          <span className="badge badge-sm font-normal border-0 bg-white/15 text-white/90">
            {tech}
          </span>
        </li>
      ))}
    </ul>
  );
}
