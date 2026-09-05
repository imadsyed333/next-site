export function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li key={tech}>
          <span className="badge badge-neutral badge-sm font-normal">{tech}</span>
        </li>
      ))}
    </ul>
  );
}
