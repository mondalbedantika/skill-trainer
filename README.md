# ✨ Skill Trainer

<p align="center">
  <a href="#getting-started"><img src="https://img.shields.io/badge/Start_learning-8B5CF6?style=for-the-badge&labelColor=312E81" alt="Start learning"></a>
  <img src="https://img.shields.io/badge/React-19-38BDF8?style=for-the-badge&labelColor=0F172A" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-Ready-2563EB?style=for-the-badge&labelColor=172554" alt="TypeScript ready">
  <img src="https://img.shields.io/badge/Build-Vite_8-F59E0B?style=for-the-badge&labelColor=451A03" alt="Vite 8">
</p>

<p align="center"><strong>🌈 A focused learning companion that turns a skill goal into a practical, one-hour session.</strong></p>

![Skill Trainer interface](src/assets/hero.png)

Skill Trainer is a polished front-end experience for discovering technical-learning resources and converting them into action. Search a topic, compare courses across YouTube, Coursera, and Udemy, then launch a structured session that mixes learning, practice, a quiz, a mini-project, and reflection.

Built as a high-fidelity product prototype, it includes an in-browser curation engine and realistic seed data—no account, API key, or backend is required to run it locally.

## 🌟 Why it exists

Learning platforms usually optimize for catalog size. Skill Trainer optimizes for momentum: what should someone do *in the next hour* to make meaningful progress?

It brings discovery, resource evaluation, deliberate practice, and progress-oriented views into one calm interface—so a learner can move from “I want to learn this” to “I completed a useful session.”

## 🎨 Highlights

- **🔎 Search any skill** — Explore the built-in learning catalog or enter a new topic. New topics receive generated, normalized resource cards and a four-stage path.
- **⏱️ One-hour learning sessions** — Build a session around a target skill and goal, sequenced as Learn → Understand → Practice → Quiz → Build → Reflect.
- **🧭 Cross-platform resource discovery** — Browse comparable resources from YouTube, Coursera, and Udemy, including price type, duration, level, rating, learner count, projects, certificates, and topical coverage.
- **💯 Learning-fit scoring** — Each resource displays a 0–100 score and the reasons behind its recommendation, helping learners make an informed choice quickly.
- **🗺️ Skill paths** — Follow beginner-to-advanced paths with goal match, difficulty progression, and hands-on coverage signals.
- **💻 Practice that is not passive** — Work through exercises with requirements, hints, starter code, solution code, and expected output.
- **🧠 Knowledge checks** — Answer topic-tagged quizzes and use their explanations to reinforce the concept.
- **🛠️ Mini-project challenges** — Apply a lesson through a scoped build checklist and key takeaways.
- **📈 Saved resources and progress views** — Bookmark useful material and review mastery, activity, active learning, completed work, and areas to revisit.
- **🎯 Interview preparation** — Practice conceptual, coding, debugging, system-design, and behavioral questions with hints and sample answers.
- **📱 Responsive product UI** — Includes global search, onboarding preferences, resource detail views, an AI-assistant drawer, generation feedback, loading states, and empty/error states.

## 🪄 Product walkthrough

| Area | What you can do |
| --- | --- |
| **🌍 Explore** | Search for a technical skill, browse featured resources, inspect learning scores, or start a one-hour session. |
| **📚 Resources** | Filter through normalized learning content and open a detailed view before committing time. |
| **🧩 Skill path** | See an ordered route from fundamentals through advanced material, plus why the path suits the learner’s goal. |
| **⚡ One-hour session** | Follow an intentional sequence of a video segment, AI-style concept summary, coding practice, quiz, mini-project, and reflection. |
| **📊 Dashboard & progress** | Continue an active session and review learning totals, mastery estimates, activity, and weak areas. |
| **🔖 Saved** | Return to resources marked for later. |
| **🎤 Interview prep** | Review realistic question prompts, hints, key points, and model answers. |

## 🧠 Built-in learning content

The prototype ships with curated sample content and learning paths for several technical domains, including React Hooks, Python, SQL, machine learning, and Docker & containers. The in-browser engine also supports arbitrary search terms: if a query does not match the starter catalog, it creates a sensible resource set and learning path so the experience remains useful for exploration.

### 🧱 How a session is composed

Each generated session targets **60 minutes** and uses the same deliberate-practice rhythm:

1. **🟣 Learn** — Watch a focused source segment instead of a long, unstructured course.
2. **🔵 Understand** — Review concise key concepts and contextual explanation.
3. **🟢 Practice** — Complete a guided coding or problem-solving exercise.
4. **🟠 Quiz** — Check retention with multiple-choice questions and explanations.
5. **🔴 Build** — Apply the concept in a compact, real-world mini-project.
6. **🟡 Reflect** — Capture takeaways and identify the next skills to unlock.

## ⚙️ Tech stack

| Layer | Tools |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS + custom CSS |
| Icons | Lucide React |
| UI utilities | `clsx`, `tailwind-merge` |
| Interaction polish | `canvas-confetti` |
| Linting | Oxlint |

## 🚀 Getting started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ recommended for the Vite 8 toolchain
- npm (included with Node.js)

### 🏃 Install and run

```bash
git clone https://github.com/mondalbedantika/skill-trainer.git
cd skill-trainer
npm install
npm run dev
```

Open the local address printed by Vite (normally `http://localhost:5173`) in your browser.

### 🧰 Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server with hot reload. |
| `npm run build` | Type-check the project and create an optimized production build in `dist/`. |
| `npm run preview` | Serve the production build locally after `npm run build`. |
| `npm run lint` | Run Oxlint across the project. |

## 🗂️ Project structure

```text
src/
├── assets/                 # Static visual assets
├── components/
│   ├── common/             # Reusable cards, badges, loading, empty, and error UI
│   ├── AiAssistantDrawer.tsx
│   ├── DashboardView.tsx
│   ├── InterviewPrepView.tsx
│   ├── OneHourSessionView.tsx
│   ├── ResourceDiscovery.tsx
│   ├── ResourceDetailModal.tsx
│   └── SkillPage.tsx       # Feature-level product surfaces
├── services/
│   ├── aiEngine.ts         # Search, ranking, and one-hour-session generation logic
│   ├── mockData.ts         # Seed resources, paths, exercises, quizzes, and questions
│   └── providers.ts        # Provider adapter contracts for future API integrations
├── types/index.ts          # Shared domain models
├── App.tsx                 # App state and view composition
└── main.tsx                # Application entry point
```

## 🏗️ Architecture and data model

This is currently a **client-side prototype**. State is held in React at the app level and passed to feature components as props. The product models resources, learning scores, timestamped video segments, learning paths, sessions, practice exercises, quizzes, mini-projects, user goals, user progress, and interview questions in `src/types/index.ts`.

`AiEngine` is a deterministic, local stand-in for a future recommendation service. It searches the seed catalog first and generates plausible normalized content when a query is new. The provider classes expose a shared interface for YouTube, Coursera, and Udemy, but intentionally return no live results yet—there are no external API calls or credentials in this repository.

That separation makes the intended evolution clear:

```text
Provider APIs / recommendation service
                ↓
      normalized Resource records
                ↓
      ranking + session generation
                ↓
 React learning experience and progress views
```

## 🌱 Extending the prototype

### 🔌 Connect real course providers

Implement `searchResources` and `getResourceById` in `src/services/providers.ts`, then normalize external responses into the shared `Resource` model. Keep API keys on a server or serverless function; never expose secret provider credentials in this front-end codebase.

### 💾 Add persistent user data

The current saved items, onboarding goals, and progress are demo state. Add authentication and a database to persist them between browsers and devices. A future backend can store user profiles, sessions, results, bookmarks, and learning analytics.

### ✨ Replace the local curation engine

`src/services/aiEngine.ts` is deliberately self-contained. It can be swapped for an API client that requests recommendations or content summaries while retaining the same typed output shapes.

### 🧪 Add testing

There is no test runner configured yet. A sensible next step is Vitest + React Testing Library for component and engine behavior, followed by Playwright for end-to-end session flows.

## 🚧 Current scope and limitations

- Resource data, provider ratings, prices, learner counts, session content, and progress are **demo data**; they are not live marketplace data.
- The AI-themed experience uses a local deterministic engine, not a connected generative-AI model.
- The app does not yet persist state, authenticate users, process payments, or issue certificates.
- Provider adapter classes are contracts ready for integration, not completed data connectors.

These are intentional prototype boundaries, not hidden behavior.

## 🤝 Contributing

Contributions and ideas are welcome. For a focused change:

1. Fork the repository and create a descriptive branch.
2. Make the change in small, readable commits.
3. Run `npm run lint` and `npm run build` before opening a pull request.
4. Explain the user impact and include screenshots for visual changes when useful.

## 📄 License

No license has been added yet. Until one is included, the repository is not offered under an open-source license by default.

---

<p align="center"><strong>🌈 Built for learners who want less browsing and more progress.</strong></p>
