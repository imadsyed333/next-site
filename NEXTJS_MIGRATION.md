# Migrating Gondolin to Next.js

This is a step-by-step plan for moving this site from Create React App + React Router to the Next.js App Router. The current app is a small static portfolio. That is the best possible Next.js candidate: almost every page can be a Server Component, most of the client machinery can be deleted, and the remaining interactivity is two tiny islands.

Do the simplifications in this guide as you migrate. Do not port `App.tsx`, `FadeWrapper`, or the four hobby-list wrappers as-is.

---

## 1. What you have today

| Area | Current state |
| --- | --- |
| Framework | Create React App (`react-scripts` 5) + TypeScript |
| UI | React 19, MUI 7, Emotion, `@mui/lab` Timeline |
| Routing | `react-router` 7, route table in `src/constants.ts` |
| Data | Hardcoded arrays in `src/constants.ts` and the hobby list files |
| Backend / auth / env | None |
| State libraries | None. Local `useState` / `useEffect` only |
| Tests | Default CRA smoke test (`learn react`) — unused |
| Deploy shape | Client-only SPA (`public/index.html` + `#root`) |

### Routes

| Path | Page | What it actually does |
| --- | --- | --- |
| `/` | `HomePage` | Two headings. No state, no data. |
| `/about` | `AboutPage` | Static bio + `experiences` timeline. |
| `/projects` | `ProjectsPage` | Maps `projects` to cards. |
| `/hobbies` | `HobbiesPage` | Client tab state (`0..3`) swapping four lists. |
| `/contact` | commented out | Not implemented. |

### Client-only code that exists today

Only four files use hooks or browser APIs:

1. **`src/App.tsx`** — fade-out / fade-in between routes (`useLocation` + `useState` + `useEffect` + MUI `Fade`).
2. **`src/ui/components/nav/NavButton.tsx`** — `useNavigate` + `useLocation` + redundant selected state.
3. **`src/ui/pages/HobbiesPage.tsx`** — `useState` for the active tab.
4. **`src/ui/components/FadeWrapper.tsx`** — mount delay + fade. Used as decoration on About and Projects.

Everything else is presentational markup over static data. It is already a Server Component in all but name.

### Dead or redundant code (do not migrate)

| File / export | Why it can go |
| --- | --- |
| `src/ui/components/experience/IntroContent.tsx` | Placeholder (`<div>IntroContent</div>`), never imported. |
| `src/ui/components/DevIcon.tsx` | Never imported. |
| `stack` and `Tech` in `constants.ts` / `types.ts` | Defined, never rendered. |
| `src/App.css` | Never imported. `.App` styles are unused. |
| `src/reportWebVitals.ts` | Called with no callback. |
| `src/App.test.tsx`, `src/setupTests.ts` | CRA boilerplate, assertion does not match the app. |
| `src/react-app-env.d.ts` | CRA types. |
| `PageRoute` type + `element` on each route | File-based routing replaces this. |
| `FadeWrapper` | Forces a client boundary for a 200ms fade. Use CSS instead, or drop it. |
| `public/gondolin-mobile.webp` | Present, never referenced. Wire it up as the narrow-viewport background (see step 5). |
| Route-transition state in `App.tsx` | Replaced by the App Router layout. Optional CSS is enough. |
| Four hobby `*List` components | Identical wrappers around `HobbyGrid`. Collapse into data. |
| `Suspense` in `HobbyGrid` | Nothing is lazy-loaded. The fallback never runs. |
| `NavButton` selected `useState` + `useEffect` | Derive `pathname === href` during render. |

### Bugs worth fixing during the move

- Font URL in `src/index.css` is `/public/fonts/...`. CRA serves `public/` at `/`, so this should have been `/fonts/...`. Use `next/font` instead.
- `StackList` maps chips without a `key`.
- `Project.stack` and `StackList` use `String[]` (object wrapper). Use `string[]`.
- `HobbyItemCard` never renders `name`.
- LinkedIn project image in `constants.ts` has an expiry query (`e=1763168400`). Prefer a local asset under `public/`.

---

## 2. Target architecture (simplified)

Use the **App Router**. Default rendering is a Server Component. Static data means every page can be statically generated at build time with no `useEffect` fetches and no API routes.

```
app/
  layout.tsx                 # html/body, font, background, navbar (Server)
  page.tsx                   # Home
  about/page.tsx
  projects/page.tsx
  hobbies/
    layout.tsx               # title + tab links
    page.tsx                 # redirect to /hobbies/books
    books/page.tsx
    movies/page.tsx
    shows/page.tsx
    games/page.tsx
  globals.css
components/
  nav/
    Navbar.tsx               # Server
    NavLink.tsx              # Client (active path only)
  ProjectCard.tsx            # Server
  StackList.tsx              # Server
  ExperienceTimeline.tsx     # Server
  HobbyGrid.tsx              # Server
  HobbyItemCard.tsx          # Server
lib/
  data/
    nav.ts
    projects.ts
    experiences.ts
    hobbies.ts
  types.ts
public/
  gondolin.webp
  gondolin-mobile.webp       # unused today — use it
  fonts/                     # only if not using next/font/google
```

### Why this is simpler than a 1:1 port

| Current | Next.js replacement | Why |
| --- | --- | --- |
| `index.tsx` + `BrowserRouter` + `App.tsx` + `Routes` | `app/layout.tsx` + file routes | Routing is the filesystem. |
| `routes` array with `element: HomePage` | `app/page.tsx`, `app/about/page.tsx`, … | No registry, no `PageRoute` type. |
| MUI `Fade` page transitions | Nothing, or a CSS animation on `main` | Deletes the hardest client state in the app. |
| `FadeWrapper` around every card | CSS `@keyframes` on the card class | Server-safe, no `useEffect`. |
| `HobbiesPage` tab index | `/hobbies/books` etc. | Lists are Server Components. Tabs are `<Link>`s. Deep-linkable. |
| `useNavigate()` in nav | `<Link href>` | Prefetch + no JS click handler. |
| `ThemeProvider` + MUI `Box`/`Typography`/`Grid` | Semantic HTML + CSS | See section 3. |
| `public/index.html` title/meta | `metadata` export | Per-page SEO. |
| `<img>` and MUI `CardMedia` | `next/image` | Sizing, lazy load, remote patterns. |
| `@font-face` by hand | `next/font` | No layout shift, correct path. |

---

## 3. Drop MUI (recommended)

MUI is the main thing standing between this codebase and real Server Components.

Almost every import is a layout primitive:

- `Box`, `Typography`, `Grid`, `Toolbar` → `<div>`, `<h1>`, `<p>`, CSS grid
- `Card`, `CardContent`, `CardMedia`, `CardActionArea` → `<article>` + `<a>` + CSS
- `AppBar` → `<header>`
- `Chip` → `<span class="chip">`
- `Tabs` / `Tab` → `<nav>` + `<Link>`
- `Timeline` / `TimelineItem` / … (`@mui/lab`) → a short CSS timeline

The custom theme in `src/themes.ts` only sets Inter, heading weights, and white tab text. `next/font` plus a few CSS rules replace it.

**What you gain by dropping MUI**

- Pages stay Server Components and ship almost no component JS.
- You can delete `@mui/material`, `@mui/lab`, `@emotion/react`, `@emotion/styled`, and later `@mui/material-nextjs`.
- No `ThemeProvider`, no Emotion cache, no SSR style-flicker issues.
- The visual design (frosted glass cards, white type on `gondolin.webp`) is already in `sx` / CSS. Copy those values into classes.

**If you keep MUI** (faster visual port, worse bundle): skip to [Appendix A](#appendix-a-keeping-mui). The rest of this guide assumes you drop it.

---

## 4. Server vs client: file-by-file

In the App Router, a file is a Server Component unless it starts with `"use client"`. Server Components can import client components. Client components cannot import Server Components.

A component needs `"use client"` only if it uses hooks, event handlers, or browser APIs.

| Current file | After migration | Server? | Notes |
| --- | --- | --- | --- |
| `App.tsx` | deleted | — | Layout + routes replace it. |
| `index.tsx` | deleted | — | Next.js entry is `app/layout.tsx`. |
| `HomePage.tsx` | `app/page.tsx` | **Server** | Static headings. |
| `AboutPage.tsx` | `app/about/page.tsx` | **Server** | Static copy + timeline. |
| `ProjectsPage.tsx` | `app/projects/page.tsx` | **Server** | Maps imported data. |
| `HobbiesPage.tsx` | `app/hobbies/layout.tsx` + segment pages | **Server** | Tabs become links. No `useState`. |
| `BookList` / `MovieList` / `ShowList` / `GameList` | data in `lib/data/hobbies.ts` | **Server** | One grid, four data arrays. |
| `HobbyGrid.tsx` | keep, drop `Suspense` | **Server** | |
| `HobbyItemCard.tsx` | keep | **Server** | Use `next/image`. |
| `ProjectCard.tsx` | keep | **Server** | `<Link>` or `<a href>` instead of `CardActionArea`. |
| `StackList.tsx` | keep | **Server** | Add `key`. |
| `ExperienceGraph.tsx` + `ExperienceItem.tsx` | one `ExperienceTimeline.tsx` | **Server** | CSS timeline, no `@mui/lab`. |
| `Navbar.tsx` | keep | **Server** | Renders `NavLink` children. |
| `NavButton.tsx` | `NavLink.tsx` | **Client** | Only file that needs `usePathname`. |
| `FadeWrapper.tsx` | deleted | — | CSS animation optional. |
| `themes.ts` | deleted | — | Font + a few CSS variables. |
| `constants.ts` | split under `lib/data/` | Server-safe | No page components in the data module. |

**The only required client component is `NavLink`.**

That is the whole interactive surface of the site: underline the current route. Hobbies no longer need a client tab controller because the URL is the state.

If you later want a mobile menu, put `"use client"` on a `MobileNav` only. Do not mark the root layout as a client component.

### What Server Components buy you here

There is no database. The win is not “fetch on the server.” The win is:

- The page HTML (bio, project text, hobby blurbs) is in the first response. Crawlers and `noscript` users see the site.
- MUI / Emotion / router / fade state never download.
- `metadata` per route (title, description) without `react-helmet`.
- `next/image` and `next/font` work naturally from Server Components.

---

## 5. Step-by-step migration

Work in a new git branch. Keep the CRA app runnable until the Next.js app renders all four pages.

### Step 0 — Snapshot the current UI

Run `npm start` and screenshot Home, About, Projects, and each Hobbies tab (desktop + a narrow viewport). You will use these as a visual checklist.

### Step 1 — Scaffold Next.js beside the old app

From the repo root (or a sibling folder, then move files):

```bash
npx create-next-app@latest . --typescript --app --eslint --no-tailwind --src-dir --import-alias "@/*"
```

If the directory is not empty, scaffold in a temp folder and copy `app/`, `next.config.ts`, and the updated `package.json` / `tsconfig.json` in by hand.

You want:

- App Router (`app/`)
- TypeScript
- `@/*` → `src/*` (or project root — pick one and stick to it)
- **No Tailwind unless you want it.** This site does not need it. Plain CSS is enough.

Remove CRA-only packages once Next.js runs:

```bash
npm uninstall react-scripts react-router web-vitals
npm uninstall @mui/material @mui/lab @emotion/react @emotion/styled
```

`package.json` scripts should become:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

Delete after the scaffold is working:

- `src/index.tsx`
- `src/App.tsx`
- `src/App.css`
- `src/App.test.tsx`
- `src/setupTests.ts`
- `src/reportWebVitals.ts`
- `src/react-app-env.d.ts`
- `public/index.html` (Next.js does not use it)

Keep `public/gondolin.webp`, `public/gondolin-mobile.webp`, `public/favicon.ico`, fonts, and `robots.txt`.

### Step 2 — TypeScript

`tsconfig.json` should extend the Next.js defaults (`create-next-app` writes this). Important fields:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Drop `"ignoreDeprecations": "6.0"` from the CRA config.

### Step 3 — Move data out of components

Create `src/lib/types.ts` (cleaned up):

```ts
export type Project = {
  name: string;
  description: string;
  imageLink: string;
  url: string;
  stack: string[];
};

export type Experience = {
  title: string;
  subtitle: string;
  period: string;
  description: string;
};

export type HobbyItem = {
  name: string;
  imageLink: string;
  description: string;
};

export type NavItem = {
  name: string;
  path: string;
};
```

Split `src/constants.ts`:

- `src/lib/data/projects.ts` — `projects`
- `src/lib/data/experiences.ts` — `experiences`
- `src/lib/data/hobbies.ts` — `books`, `movies`, `shows`, `games` (move the arrays out of the four list files)
- `src/lib/data/nav.ts` — names and paths only, no components:

```ts
import type { NavItem } from "../types";

export const navItems: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Hobbies", path: "/hobbies" },
];
```

**Do not import pages from the data layer.** That circular pattern (`constants` → pages → `constants`) is why CRA needed `PageRoute.element`.

### Step 4 — Global CSS and font

Replace `src/index.css` with `src/app/globals.css` (or `app/globals.css`).

Use Inter from Google, or local files via `next/font/local` if you already have the variable TTF:

```tsx
// src/app/layout.tsx (excerpt)
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});
```

Apply `inter.className` on `<body>`. Delete the broken `@font-face` rule.

Port the background as real CSS (this already lives in `index.css`):

```css
html,
body {
  margin: 0;
  min-height: 100%;
}

body {
  color: white;
  font-weight: 300;
}

h1 {
  font-weight: 200;
  font-size: 6rem;
  margin: 0.25rem 0 0;
  text-align: center;
}

h2,
.lede {
  font-weight: 200;
  font-size: 1.5rem;
  text-align: center;
  margin: 0.5rem 0 1rem;
}

.background {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.background img {
  width: 100%;
  height: 100dvh;
  object-fit: cover;
  object-position: 50% 70%;
}

.background .bg-mobile {
  display: none;
}

@media (max-width: 700px) {
  .background .bg-desktop {
    display: none;
  }

  .background .bg-mobile {
    display: block;
  }
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  color: #111;
  border-radius: 4px;
}

/* optional replacement for FadeWrapper */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fade-in 200ms ease-out;
}
```

Add card, grid, nav, chip, and timeline rules as you port each page. Copy values from the existing `sx` props — they are the design system.

### Step 5 — Root layout (Server Component)

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/nav/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gondolin",
    template: "%s · Gondolin",
  },
  description: "Imad's personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="background">
          <img className="bg-desktop" src="/gondolin.webp" alt="" />
          <img className="bg-mobile" src="/gondolin-mobile.webp" alt="" />
        </div>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

The background stays decorative (`alt=""`). Do not put it behind `next/image` unless you also set `fill` + a sized parent; a CSS-covered `img` is fine for a full-viewport wallpaper.

This layout replaces `ThemeProvider`, `Toolbar`, `BrowserRouter`, and the fade state machine.

### Step 6 — Navbar: one client island

**Server** parent:

```tsx
// src/components/nav/Navbar.tsx
import { navItems } from "@/lib/data/nav";
import { NavLink } from "./NavLink";

export function Navbar() {
  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <NavLink key={item.path} href={item.path}>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
```

**Client** child — the only `"use client"` file you need:

```tsx
// src/components/nav/NavLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} className={active ? "nav-link active" : "nav-link"}>
      {children}
    </Link>
  );
}
```

`startsWith` so `/hobbies/books` still highlights **Hobbies**.

Delete `useNavigate`, `CardActionArea`, and the selected `useEffect`. A `<Link>` is enough.

### Step 7 — Pages as Server Components

Each `page.tsx` is a default-export Server Component. No `"use client"`. No `useEffect`. Import data and render.

**Home** (`src/app/page.tsx`):

```tsx
export default function HomePage() {
  return (
    <section className="page">
      <h1>Hi.</h1>
      <p className="lede">Welcome to my website.</p>
    </section>
  );
}
```

**About** (`src/app/about/page.tsx`):

```tsx
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export const metadata = {
  title: "About",
  description: "A little bit about me.",
};

export default function AboutPage() {
  return (
    <section className="page">
      <h1>About</h1>
      <p className="lede">A little bit about me.</p>
      <div className="about-grid">
        <article className="glass fade-in about-copy">
          <p>My name is Imad. …</p>
          <p>My most recent experience was …</p>
          <p>When I'm not coding, …</p>
        </article>
        <ExperienceTimeline />
      </div>
    </section>
  );
}
```

Move the three bio paragraphs as-is from `AboutPage.tsx`. Drop the empty `<b></b>` tags; they do nothing.

**Projects** (`src/app/projects/page.tsx`):

```tsx
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";

export const metadata = {
  title: "Projects",
  description: "Selected projects. Click to view on GitHub.",
};

export default function ProjectsPage() {
  return (
    <section className="page">
      <h1>Projects</h1>
      <p className="lede">Click to view on GitHub.</p>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
```

### Step 8 — Hobbies as nested routes (not tabs)

This is the largest simplification.

**Current:** one client page, `tabValue` in state, four components mounted by index. `/hobbies` cannot link to “Games.”

**Next:** a server layout plus four server pages.

```tsx
// src/app/hobbies/layout.tsx
import { HobbyTabs } from "@/components/HobbyTabs";

export const metadata = {
  title: "Hobbies",
  description: "A whole lot more about me.",
};

export default function HobbiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="page">
      <h1>Hobbies</h1>
      <p className="lede">A whole lot more about me.</p>
      <HobbyTabs />
      {children}
    </section>
  );
}
```

`HobbyTabs` can stay a **Server Component** if it uses the same `NavLink` (already a client island) or a second tiny client link group:

```tsx
// src/components/HobbyTabs.tsx
import { NavLink } from "@/components/nav/NavLink";

const tabs = [
  { name: "Books", path: "/hobbies/books" },
  { name: "Movies", path: "/hobbies/movies" },
  { name: "Shows", path: "/hobbies/shows" },
  { name: "Games", path: "/hobbies/games" },
] as const;

export function HobbyTabs() {
  return (
    <nav className="hobby-tabs">
      {tabs.map((tab) => (
        <NavLink key={tab.path} href={tab.path}>
          {tab.name}
        </NavLink>
      ))}
    </nav>
  );
}
```

Redirect the index:

```tsx
// src/app/hobbies/page.tsx
import { redirect } from "next/navigation";

export default function HobbiesIndex() {
  redirect("/hobbies/books");
}
```

Each category page is a few lines:

```tsx
// src/app/hobbies/books/page.tsx
import { HobbyGrid } from "@/components/HobbyGrid";
import { books } from "@/lib/data/hobbies";

export const metadata = { title: "Books" };

export default function BooksPage() {
  return <HobbyGrid items={books} />;
}
```

Repeat for movies, shows, games.

`HobbyGrid` / `HobbyItemCard` stay server components. Remove `Suspense` and `CircularProgress`.

**Alternative if you dislike extra URLs:** one server page that reads `searchParams`:

```tsx
export default async function HobbiesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "books" } = await searchParams;
  // pick the array, render HobbyGrid
}
```

Nested routes are clearer and give each tab its own `<title>`. Prefer those.

### Step 9 — Images

Install nothing extra. Use `next/image` in `ProjectCard` and `HobbyItemCard`.

Allow the remote hosts you already use, in `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.toronto.ca" },
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "imadsyed333.github.io" },
      { protocol: "https", hostname: "dynamic.indigoimages.ca" },
      { protocol: "https", hostname: "m.media-amazon.com" },
    ],
  },
};

export default nextConfig;
```

Better long-term: download cover art and logos into `public/images/` and drop remote patterns. Local files do not expire (unlike the LinkedIn treasury URL).

For cards:

```tsx
import Image from "next/image";

<Image
  src={imageLink}
  alt={name}
  width={400}
  height={240}
  sizes="(max-width: 600px) 100vw, 25vw"
/>
```

Always pass a meaningful `alt` (`name` is the right string). Empty `imageLink` values (CrashLog) need a local placeholder, not `src=""`.

### Step 10 — Project cards and the timeline (still Server Components)

`ProjectCard` becomes an article whose whole surface is a link:

```tsx
import Image from "next/image";
import { StackList } from "@/components/StackList";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass fade-in project-card">
      <a href={project.url} target="_blank" rel="noreferrer">
        {project.imageLink ? (
          <Image
            src={project.imageLink}
            alt={project.name}
            width={480}
            height={160}
          />
        ) : (
          <div className="project-card-placeholder" />
        )}
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <StackList stack={project.stack} />
      </a>
    </article>
  );
}
```

External GitHub URLs can stay `<a>`. Use `next/link` only for internal routes.

Rebuild the timeline as HTML. You do not need `@mui/lab` for three items:

```tsx
import { experiences } from "@/lib/data/experiences";

export function ExperienceTimeline() {
  return (
    <ol className="timeline">
      {experiences.map((item) => (
        <li key={item.title} className="timeline-item">
          <article className="glass fade-in">
            <header>
              <h3>{item.title}</h3>
              <time>{item.period}</time>
            </header>
            <p className="timeline-org">{item.subtitle}</p>
            <p>{item.description}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}
```

Style `.timeline` with a left border / dots to match the current MUI Timeline. Merge `ExperienceGraph` and `ExperienceItem` into this one file.

### Step 11 — Metadata and robots

Per-page `metadata` is shown in the examples above.

Keep `public/robots.txt` or switch to `src/app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
```

Update `public/manifest.json` (`short_name` is still “React App”). Or add `src/app/manifest.ts`.

### Step 12 — Config leftovers

- `.gitignore`: add `.next/` and `out/`. You can keep `/build` or remove it.
- `eslintConfig` in `package.json` (`react-app`) goes away; use the Next ESLint config from `create-next-app`.
- No `.env` files exist. You do not need `NEXT_PUBLIC_*` for this site.

---

## 6. What not to add

This site does not need:

| Feature | Why skip it |
| --- | --- |
| Route handlers / `app/api` | No backend. Data is TypeScript modules. |
| `useEffect` data loading | Nothing is remote except `<img>` URLs. |
| React Query / SWR / Redux | No client cache to manage. |
| `loading.tsx` / `error.tsx` everywhere | Pages are static and tiny. Add later if a page grows. |
| `"use client"` on layouts or pages | Pushes the whole tree to the client. |
| `ThemeProvider` | You dropped MUI. |
| View Transitions API / shared-element animations | Optional polish after the port works. |
| MDX / CMS | Four pages of copy. Keep TS objects until the content volume changes. |

---

## 7. Rendering model

Leave the default. Do not add `export const dynamic = "force-dynamic"`.

With only local imports, `next build` statically generates:

- `/`
- `/about`
- `/projects`
- `/hobbies` (redirect)
- `/hobbies/books`
- `/hobbies/movies`
- `/hobbies/shows`
- `/hobbies/games`

If you host on GitHub Pages (or any static host), set:

```ts
// next.config.ts
const nextConfig = {
  output: "export",
  images: { unoptimized: true }, // or a custom loader
};
```

`redirect()` in `app/hobbies/page.tsx` becomes a `meta` refresh or a `next.config` redirect when using `output: "export"`. Simpler export-friendly option: make `app/hobbies/page.tsx` render the books grid instead of redirecting.

Vercel / Node hosting: keep the default (no `output: "export"`). Image optimization stays on.

---

## 8. Suggested CSS structure (keep it boring)

One `globals.css` is enough at this size. If it grows past ~200 lines, split:

```
src/app/globals.css
src/components/nav/navbar.css
src/components/project-card.css
src/components/timeline.css
```

Import the component CSS from the component file. Server Components can import CSS.

Do not introduce CSS-in-JS. You just left Emotion.

---

## 9. Verification checklist

After `npm run dev`:

- [ ] `/` shows “Hi.” / “Welcome to my website.”
- [ ] `/about` shows bio + three experience items
- [ ] `/projects` shows four cards; each opens the GitHub URL
- [ ] `/hobbies` lands on books (redirect or index content)
- [ ] `/hobbies/movies`, `/shows`, `/games` render the right items
- [ ] Navbar underline follows the route, including hobby subroutes
- [ ] Background image covers the viewport; text stays readable
- [ ] Inter loads (no fallback flash of Times / system UI)
- [ ] Images have `alt` text; empty CrashLog image has a placeholder
- [ ] View source on `/about` contains the bio text (proves SSR / static HTML)
- [ ] `npm run build` succeeds and lists the routes as static
- [ ] Narrow viewport: grids stack, nav still usable

Then `npm run build && npm start` and click through the same paths. A single screenshot of Home is not enough.

---

## 10. Order of work (shortest path)

1. Scaffold Next.js, delete CRA entry files, get a blank `app/page.tsx` rendering.
2. Port `globals.css`, font, background, root layout.
3. Move data modules. Delete `constants.ts` page imports.
4. Add `NavLink` (client) + `Navbar` (server).
5. Port Home, About, Projects as server pages + HTML/CSS components.
6. Split Hobbies into nested server routes.
7. Swap images to `next/image` (or local files).
8. Add per-page `metadata`.
9. Delete unused files listed in section 1.
10. Visual pass against the screenshots from step 0.

---

## Appendix A — Keeping MUI

Use this only if you want a mechanical port and will accept a large client bundle.

1. Keep `@mui/material`, `@emotion/react`, `@emotion/styled`.
2. Add the official Next adapter:

   ```bash
   npm install @mui/material-nextjs @emotion/cache
   ```

3. Root layout (Server Component) wraps children:

   ```tsx
   import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
   import { ThemeRegistry } from "@/components/ThemeRegistry";

   // inside <body>
   <AppRouterCacheProvider>
     <ThemeRegistry>{children}</ThemeRegistry>
   </AppRouterCacheProvider>
   ```

4. `ThemeRegistry` is a client file that owns `createTheme` + `ThemeProvider`. Do not pass a `theme` object from a Server Component into a client component — `createTheme()` contains functions and Next will refuse to serialize it.

   ```tsx
   "use client";

   import { ThemeProvider } from "@mui/material/styles";
   import { theme } from "@/theme";

   export function ThemeRegistry({ children }: { children: React.ReactNode }) {
     return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
   }
   ```

5. MUI components are client components. A Server `page.tsx` may still **render** them (import `Typography` and return `<Typography>…</Typography>`). The page file stays a Server Component; the MUI leaves hydrate on the client. You still ship MUI JS.

6. Never pass a function prop (including `component={Link}` from `next/link`) from a Server Component into MUI. If you need `Button` + Next `Link`, wrap that pair in a small `"use client"` file.

7. Still do the simplifications that do not depend on dropping MUI:

   - File-based routes
   - Data modules without page components
   - Nested hobby URLs (or `searchParams`) instead of `useState`
   - `NavLink` + `usePathname` instead of `useNavigate`
   - Delete `FadeWrapper` / route-fade state
   - Delete unused files
   - `next/font`, `next/image`, `metadata`

You can drop MUI later by replacing `sx` layout with CSS, one component at a time, then removing `ThemeRegistry`.

---

## Appendix B — Current → Next file map

| Delete | Becomes |
| --- | --- |
| `src/index.tsx` | `src/app/layout.tsx` |
| `src/App.tsx` | `src/app/layout.tsx` + `src/app/**/page.tsx` |
| `src/ui/pages/HomePage.tsx` | `src/app/page.tsx` |
| `src/ui/pages/AboutPage.tsx` | `src/app/about/page.tsx` |
| `src/ui/pages/ProjectsPage.tsx` | `src/app/projects/page.tsx` |
| `src/ui/pages/HobbiesPage.tsx` | `src/app/hobbies/layout.tsx` + segment pages |
| `src/ui/components/hobby/*List.tsx` | `src/lib/data/hobbies.ts` |
| `src/ui/components/nav/NavButton.tsx` | `src/components/nav/NavLink.tsx` (`"use client"`) |
| `src/ui/components/experience/*` | `src/components/ExperienceTimeline.tsx` |
| `src/constants.ts` | `src/lib/data/*.ts` |
| `src/themes.ts` | `src/app/globals.css` + `next/font` |
| `src/index.css` | `src/app/globals.css` |
| `public/index.html` | `metadata` in layouts/pages |
| `FadeWrapper`, `IntroContent`, `DevIcon`, `App.css`, vitals, CRA tests | nothing |

---

## Appendix C — Mental model

```
Request  →  Server Components run (layout, pages, cards, grids, data)
         →  HTML + a tiny JS payload for NavLink
         →  Browser paints the full page
         →  NavLink hydrates so the active underline stays in sync
```

If you add `"use client"` to `layout.tsx` or a `page.tsx`, that entire subtree hydrates. Keep the directive on leaves (`NavLink` only). Pass data down as props from server parents. Do not fetch in `useEffect`.
