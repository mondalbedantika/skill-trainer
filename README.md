# ⚡ HourForge

<p align="center">
  <strong>Forge a skill in one focused hour.</strong><br />
  Discover the right resource, follow a deliberate practice flow, and turn curiosity into momentum.
</p>

<p align="center">
  <a href="https://github.com/mondalbedantika/hourforge"><img src="https://img.shields.io/badge/GitHub-HourForge-181717?style=for-the-badge&logo=github" alt="HourForge on GitHub" /></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=0B1020" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

![HourForge interface](src/assets/hero.png)

> **🎯 The idea:** less browsing, more progress. HourForge helps learners find quality technical resources and turns them into a structured, hands-on 60-minute learning session.

## ✨ What makes it useful

| Feature | What it gives learners |
| --- | --- |
| 🔎 **Resource discovery** | Search, filter, and compare curated YouTube, Coursera, and Udemy content by level, price, duration, and recommendation score. |
| ⚡ **One-hour paths** | A focused six-step session: **Learn → Understand → Practice → Quiz → Build → Reflect**. |
| 🧠 **Learning-fit scores** | Clear recommendation signals and explanations instead of a wall of course links. |
| 🗺️ **Skill paths** | Beginner-to-advanced routes with goal match, difficulty progression, and hands-on coverage. |
| 🔖 **Saved library** | Keep the best videos and courses handy for the next learning block. |
| 🎤 **Interview prep** | Practice conceptual, coding, debugging, system-design, and behavioral questions. |
| 🌗 **Polished experience** | Responsive layouts, dark/light themes, keyboard-friendly dialogs, global search, onboarding, loading, and empty states. |

## 🧭 A learning session, intentionally designed

```text
Pick a skill
    ↓
Find the strongest resource
    ↓
Learn → Understand → Practice → Quiz → Build → Reflect
    ↓
Leave with a small, concrete win
```

Each generated session targets **60 minutes**. The built-in engine creates a practical sequence with a focused resource segment, concept summary, guided exercise, knowledge check, mini-project, and reflection prompt.

## 🛠️ Tech stack

| Layer | Tools |
| --- | --- |
| UI | React 19, TypeScript, Lucide icons |
| Styling | Tailwind CSS, custom semantic design tokens |
| Tooling | Vite 8, Oxlint |
| Tests | Vitest, Testing Library, JSDOM |
| Product logic | Typed local curation engine and provider contracts |

## 🚀 Run it locally

**Prerequisite:** Node.js `20.19+` or `22.12+`.

```bash
git clone https://github.com/mondalbedantika/hourforge.git
cd hourforge
npm install
npm run dev
```

Vite will print a local address—typically [http://localhost:5173](http://localhost:5173).

### Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload. |
| `npm run build` | Type-check and create an optimized production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Check code quality with Oxlint. |
| `npm run test` | Run the Vitest suite once. |
| `npm run test:watch` | Run tests in watch mode. |

## 🧩 Architecture

HourForge is a client-side prototype with clear boundaries between UI, shared state, and learning logic.

```text
src/
├── components/       # Product screens, dialogs, and reusable UI
├── constants/        # App identity and shared constants
├── context/          # Navigation and learning state providers
├── services/         # Curation engine, seed data, provider contracts
├── test/             # Vitest setup
├── types/            # Shared domain models
└── App.tsx           # Screen composition and application shell
```

### Shared state

- **NavigationContext** owns the active view and global overlay state.
- **LearningContext** owns resources, saved items, preferences, selected resource details, and one-hour session generation.
- Feature screens such as navigation, discovery, and saved resources consume this shared state directly—keeping `App.tsx` focused on composition.

### Resource intelligence

`AiEngine` is a deterministic local stand-in for a future recommendation service. It searches the seeded catalog first; unfamiliar skills receive normalized resources and a custom learning path, so exploration never hits a dead end.

## 🌱 Current scope

HourForge is intentionally a front-end product prototype:

- Resource metadata, prices, ratings, and progress are **demo data**.
- The AI-style experience is powered by local deterministic logic, not a hosted model.
- Saved items and preferences are not yet persisted between devices.
- Provider adapters define the integration shape but do not call external course APIs.

This makes the project easy to run, explore, and extend without credentials or a backend.

## 🔮 Natural next steps

1. Connect provider adapters through a secure backend or serverless API.
2. Add authentication and persistence for goals, bookmarks, and completed sessions.
3. Replace deterministic curation with an evaluated recommendation service.
4. Add end-to-end coverage for search, session generation, and accessibility flows.

## 🤝 Contributing

Ideas and contributions are welcome. Please keep changes focused, run `npm run lint`, `npm run test`, and `npm run build`, then include a concise explanation of the learner-facing impact.

## 📄 License

No license has been added yet. Until one is included, the repository is not offered under an open-source license by default.

---

<p align="center"><strong>🌈 Built for learners who want less searching and more shipping.</strong></p>
