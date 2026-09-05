import { NavLink } from "@/components/nav/NavLink";

const tabs = [
  { name: "Books", path: "/hobbies/books" },
  { name: "Movies", path: "/hobbies/movies" },
  { name: "Shows", path: "/hobbies/shows" },
  { name: "Games", path: "/hobbies/games" },
] as const;

export function HobbyTabs() {
  return (
    <nav className="hobby-tabs tabs tabs-border" aria-label="Hobby categories">
      {tabs.map((tab) => (
        <NavLink key={tab.path} href={tab.path} className="tab">
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
}
