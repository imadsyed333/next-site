import type { Metadata } from "next";
import { HobbyTabs } from "@/components/HobbyTabs";

export const metadata: Metadata = {
  description: "Books, films, shows, and games I keep coming back to.",
};

export default function HobbiesLayout({ children }: LayoutProps<"/hobbies">) {
  return (
    <section className="page">
      <h1 className="page-title">Hobbies</h1>
      <p className="lede">What I keep coming back to.</p>
      <HobbyTabs />
      {children}
    </section>
  );
}
