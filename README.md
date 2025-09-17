# Kanban Board

A modern, responsive Kanban board built with Next.js 15, TypeScript, and Tailwind CSS. Features drag-and-drop task management, real-time collaboration, PWA offline support, and comprehensive testing.

## Features

- **Drag & Drop Tasks** - Intuitive task management with @dnd-kit
- **Real-time Collaboration** - Yjs + y-websocket for live updates
- **PWA Support** - Offline functionality with service worker
- **Responsive Design** - Mobile-first approach
- **TypeScript** - Full type safety
- **Testing** - Jest + React Testing Library + Playwright E2E

## Quick Start

### Prerequisites

- Node.js 18.18+ or 20+
- npm or yarn

### Installation

1. **Clone and install**

   ```bash
   git clone https://github.com/astrukarr/kanban-board.git
   cd kanban-board
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
npm run test:coverage # Run tests with coverage
npm run e2e          # Run E2E tests (Playwright)
npm run lint         # Run ESLint
npm run analyze      # Analyze bundle size
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                  # API and data layer
├── types/                # TypeScript definitions
├── utils/                # Utility functions
└── constants/            # App constants
```

## Pages

- `/` - Landing page with hero and features
- `/login` - Authentication (mock auth with jose)
- `/dashboard` - Stats and recent projects
- `/project/[slug]` - Kanban board with real-time collaboration
- `/settings` - Profile and preferences (protected route - requires authentication)

## Project Docs

- The next steps roadmap and feature planning live in `docs/NEXT_STEPS.md`. Check that file for upcoming work, acceptance criteria, and implementation notes.

## Real-time Collaboration

The app uses Yjs + y-websocket for real-time updates. Open the same project in multiple tabs to see live collaboration.

**Public websocket endpoint:** `wss://demos.yjs.dev`

**Local websocket server:**

```bash
npx y-websocket --port 1234
```

**Testing real-time features:**
Add `?rt=1` to the URL in both tabs (e.g., `http://localhost:3000/project/test?rt=1`) to enable real-time mode and see live updates.

**Testing protected routes:**
Click the settings icon (⚙️) in the bottom of the sidebar to test the protected `/settings` route. You'll be redirected to login if not authenticated. Use default credentials: `john.doe@example.com` / `password123`.

## Testing

- **Unit/Integration**: Jest + React Testing Library
- **E2E**: Playwright

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Real-time**: Yjs + y-websocket
- **Testing**: Jest + RTL + Playwright
- **PWA**: Workbox service worker
