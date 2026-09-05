"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const classes = [className || "nav-link", active ? "active" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
