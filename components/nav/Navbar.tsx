import { navItems } from "@/lib/data/nav";
import { NavLink } from "./NavLink";

export function Navbar() {
  return (
    <nav className="navbar justify-center bg-transparent shadow-none min-h-16 py-0">
      <div className="flex h-full items-center justify-center gap-6 sm:gap-10">
        {navItems.map((item) => (
          <NavLink key={item.path} href={item.path}>
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
