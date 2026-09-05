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

  const classes = className
    ? `${className}${active ? " tab-active" : ""}`
    : active
      ? "nav-link active"
      : "nav-link";

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
