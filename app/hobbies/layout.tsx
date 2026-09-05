import type { Metadata } from "next";
import { HobbyTabs } from "@/components/HobbyTabs";

export const metadata: Metadata = {
  description: "A whole lot more about me.",
};

export default function HobbiesLayout({ children }: LayoutProps<"/hobbies">) {
  return (
    <section className="page">
      <h1 className="page-title">Hobbies</h1>
      <p className="lede">A whole lot more about me.</p>
      <HobbyTabs />
      {children}
    </section>
  );
}
