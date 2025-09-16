# Kanban Board (Next.js 15, TypeScript, Tailwind, Playwright, Jest)

A modern, responsive Kanban board with drag‑and‑drop, PWA offline support, and realtime collaboration (Yjs + y-websocket). The test suite includes unit/integration (Jest + RTL) and end‑to‑end (Playwright).

## Features

### Core Functionality

- **Drag & Drop Tasks** - Intuitive task management with `@dnd-kit`
- **Real-time Updates** - Optimistic updates with fallback to API
- **Offline Support** - PWA with service worker and localStorage caching
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Task Management** - Create, move, and organize tasks across columns

### User Experience

- **Modern UI** - Clean, professional design with Tailwind CSS
- **Loading States** - Skeleton components and smooth transitions
- **Toast Notifications** - User feedback for actions
- **Dark/Light Mode Ready** - Prepared for theme switching
- **Accessibility** - ARIA labels and keyboard navigation support

### Technical Features

- **TypeScript** - Full type safety with strict configuration
- **Performance Optimized** - Dynamic imports, memoization, and code splitting
- **Bundle Analysis** - Built-in bundle size monitoring
- **Error Handling** - Centralized error management with retry logic
- **Testing** - Jest + React Testing Library (unit/integration) i Playwright (E2E)

### Why Playwright (not Cypress)

- **Multi‑browser**: Chromium, Firefox, and WebKit out of the box.
- **Parallel & fast**: tests run in parallel with stable tracing/recording.
- **Realtime collaboration**: easy multi‑context setup for 2+ clients; Cypress struggles with multi‑tab/multi‑window scenarios.
- **CI‑friendly**: official GitHub Actions examples and simple browser installation.

## Architecture

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Authentication page
│   ├── project/[slug]/   # Dynamic project pages
│   └── settings/         # Settings page
├── components/            # React components
│   ├── buttons/          # Reusable button components
│   ├── dashboard/        # Dashboard-specific components
│   ├── layout/           # Layout components
│   ├── modals/           # Modal components
│   ├── taskBoardSection/ # Kanban board components
│   ├── TaskCard/         # Task card components
│   └── ui/               # Generic UI components
├── hooks/                 # Custom React hooks
├── lib/                  # API and data layer
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── constants/            # Application constants
```

### Key Components

#### Core Hooks

- **`useTasks`** - Task state management with reducer pattern
- **`useDragAndDrop`** - Drag and drop functionality
- **`useTaskModal`** - Modal state management
- **`useOnlineStatus`** - Network status monitoring

#### Component Architecture

- **Modular Design** - Small, focused components
- **Custom Hooks** - Reusable business logic
- **Type Safety** - Full TypeScript coverage
- **Performance** - Memoization and lazy loading

## Getting Started

### Prerequisites

- **Node.js** 18.18+, 20, or 22
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/astrukarr/kanban-board.git
   cd kanban-board
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_MAX_RETRIES=3
```

## Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run e2e          # Playwright E2E (headless)
npm run e2e:headed   # E2E in a visible window
npm run e2e:ui       # Playwright UI mode
npm run e2e:report   # Open the Playwright report
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Testing

```bash
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# E2E (Playwright)
npx playwright install
npm run e2e
```

### Analysis

```bash
npm run analyze      # Analyze bundle size
npm run bundle-analysis # Generate bundle report
```

## Testing

### Test Coverage

- **Current Coverage**: 29.29% statements
- **Target Coverage**: 50%+ statements
- **Test Framework**: Jest + React Testing Library
- **Test Types**: Unit tests, integration tests, hook tests

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure

```
src/
├── __tests__/           # Global tests
├── components/__tests__/ # Component tests
├── hooks/__tests__/     # Hook tests
├── lib/__tests__/       # API tests
└── utils/__tests__/    # Utility tests

tests/                   # Playwright E2E tests (e.g., dnd.spec.ts)
```

### E2E Scenarios (Playwright)

- Navigation (landing, dashboard, login, settings, project/[slug])
- Drag & drop tasks between columns
- PWA offline banner and fallback behavior
- Basic auth flow (mocked where applicable)

Local run:

```bash
npx playwright install
npm run build && npm run start &
PW_BASE_URL=http://localhost:3000 npm run e2e
```

## Styling & Design

### Tailwind CSS

- **Utility-first** CSS framework
- **Custom configuration** for brand colors
- **Responsive design** with mobile-first approach
- **Dark mode ready** (prepared for implementation)

### Design System

- **Consistent spacing** with Tailwind scale
- **Brand colors** (indigo, emerald, amber)
- **Typography** with proper hierarchy
- **Component variants** for different states

## Configuration

### TypeScript

- **Strict mode** enabled
- **Path mapping** with `@/` alias
- **Type definitions** in `src/types/`
- **No `any` types** in production code

### ESLint & Prettier

- **Next.js ESLint config**
- **Prettier integration**
- **Husky pre-commit hooks**
- **Consistent code formatting**

### Bundle Optimization

- **Dynamic imports** for large components
- **Code splitting** by route
- **Tree shaking** enabled
- **Bundle analysis** with `@next/bundle-analyzer`

## PWA Features

### Service Worker

- **Offline support** with Workbox
- **Caching strategies** for static assets
- **Background sync** for failed requests
- **Update notifications** for new versions

### Manifest

- **App metadata** in `public/manifest.json`
- **Icon sets** for different screen sizes
- **Theme colors** and display modes
- **Installation prompts** on supported browsers

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Bundle Analysis

```bash
npm run analyze
# Opens bundle analyzer in browser
```

### Performance Metrics

- **First Load JS**: 102kB shared
- **Route-specific**: 19.3kB max
- **Bundle size**: Optimized with code splitting
- **Lighthouse score**: 90+ (estimated)

## Code Quality

### Metrics

- **TypeScript**: 100% coverage
- **ESLint**: 0 errors, 6 warnings
- **Prettier**: Consistent formatting
- **Tests**: 177 tests passing
- **Bundle**: 102kB shared JS

### Best Practices

- **Component composition** over inheritance
- **Custom hooks** for business logic
- **Memoization** for performance
- **Error boundaries** for resilience
- **Accessibility** considerations

## Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Add** tests for new features
5. **Run** quality checks
6. **Submit** a pull request

### Code Standards

- **TypeScript** for all new code
- **Tests** for new features
- **ESLint** compliance
- **Prettier** formatting
- **Conventional commits**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for styling utilities
- **@dnd-kit** for drag and drop functionality
- **React Testing Library** for testing utilities

---

**Built with modern web technologies**

## Pages

- `/` (Landing): hero + features
- `/login`: login form (mock auth / `jose`)
- `/dashboard`: stats and recent projects
- `/project/[slug]`: project info + Kanban board + realtime status
- `/settings`: profile and preferences

## Realtime (Yjs + y-websocket)

- `RealtimeRoom` on `project/[slug]` connects to room `kanban-{slug}`.
- Endpoint: `NEXT_PUBLIC_YWS_ENDPOINT` or `ws://localhost:1234` (dev default).
- Open the same `slug` in two tabs and use “+ Mock task (test)” or DnD — changes propagate without refresh.

Local websocket server (more stable than the public demo):

```bash
npx y-websocket --port 1234
# If CLI is missing:
npm i -g y-websocket && y-websocket --port 1234
```

Details: see `docs/REALTIME_TESTING.md`.

## CI (GitHub Actions)

- Workflow: `.github/workflows/playwright.yml`
  - Install deps + Playwright browser, build, `start`, wait for port, and run `npm run e2e`.
  - Uploads `playwright-report` as an artifact on every run.

## Notes on Structure

- This is NOT a monorepo (no `workspaces` in `package.json`). Source code lives under `src/`.
