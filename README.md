# Kanban Board Monorepo (Next.js 15, TypeScript, Tailwind, Playwright, Jest)

A modern, responsive Kanban board with drag‑and‑drop, PWA offline support, and realtime collaboration (Yjs + y-websocket). Built as a **monorepo** using **Turborepo** for scalable development.

## 🏗️ Monorepo Structure

This project uses **Turborepo** to manage multiple packages in a single repository:

```
kanban-board/
├── apps/
│   └── kanban/              # Main Next.js application
│       ├── src/            # Application source code
│       ├── public/         # Static assets
│       ├── e2e/           # Playwright E2E tests
│       └── package.json   # App dependencies
├── packages/
│   └── shared-types/       # Shared TypeScript types
│       ├── index.ts       # Common types (Task, User, etc.)
│       └── package.json   # Package dependencies
├── package.json           # Root workspace configuration
├── turbo.json            # Turborepo build pipeline
└── tsconfig.json         # Root TypeScript configuration
```

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
- **Testing** - Jest + React Testing Library (unit/integration) + Playwright (E2E)
- **Monorepo** - Turborepo for scalable development and build optimization

### Why Playwright (not Cypress)

- **Multi‑browser**: Chromium, Firefox, and WebKit out of the box.
- **Parallel & fast**: tests run in parallel with stable tracing/recording.
- **Realtime collaboration**: easy multi‑context setup for 2+ clients; Cypress struggles with multi‑tab/multi‑window scenarios.
- **CI‑friendly**: official GitHub Actions examples and simple browser installation.

## Getting Started

### Prerequisites

- **Node.js** 18.18+, 20, or 22
- **npm** 10.0.0+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/astrukarr/kanban-board.git
   cd kanban-board
   ```

2. **Install dependencies** (installs for all packages)

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

Create a `.env.local` file in `apps/kanban/`:

```env
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_MAX_RETRIES=3
NEXT_PUBLIC_YWS_ENDPOINT=wss://demos.yjs.dev
```

## Available Scripts

### Development (Monorepo)

```bash
npm run dev          # Start development server (Turborepo)
npm run build        # Build all packages (Turborepo)
npm run start        # Start production server
npm run lint         # Lint all packages (Turborepo)
npm run test         # Test all packages (Turborepo)
npm run typecheck    # TypeScript check all packages (Turborepo)
npm run e2e          # Playwright E2E tests (Turborepo)
```

### Individual Package Scripts

```bash
# Run commands in specific package
cd apps/kanban && npm run dev
cd packages/shared-types && npm run build
```

### Code Quality

```bash
npm run lint         # Run ESLint on all packages
npm run lint:fix     # Fix ESLint issues (in apps/kanban)
npm run format       # Format code with Prettier (in apps/kanban)
npm run format:check # Check code formatting (in apps/kanban)
```

### Testing

```bash
npm test             # Run all tests (Turborepo)
npm run test:watch   # Run tests in watch mode (in apps/kanban)
npm run test:coverage # Run tests with coverage (in apps/kanban)

# E2E (Playwright)
npx playwright install
npm run e2e
```

### Analysis

```bash
npm run analyze      # Analyze bundle size (in apps/kanban)
npm run bundle-analysis # Generate bundle report (in apps/kanban)
```

## Testing

### Test Coverage

- **Current Coverage**: 29.29% statements
- **Target Coverage**: 50%+ statements
- **Test Framework**: Jest + React Testing Library
- **Test Types**: Unit tests, integration tests, hook tests

### Running Tests

```bash
# Run all tests (monorepo)
npm test

# Run tests with coverage (in apps/kanban)
cd apps/kanban && npm run test:coverage

# Run tests in watch mode (in apps/kanban)
cd apps/kanban && npm run test:watch
```

### Test Structure

```
apps/kanban/
├── src/
│   ├── __tests__/           # Global tests
│   ├── components/__tests__/ # Component tests
│   ├── hooks/__tests__/     # Hook tests
│   ├── lib/__tests__/       # API tests
│   └── utils/__tests__/    # Utility tests
└── e2e/                     # Playwright E2E tests
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

## Monorepo Benefits

### Turborepo Features

- **Build Caching** - Faster builds with intelligent caching
- **Parallel Execution** - Run tasks across packages in parallel
- **Dependency Graph** - Automatic task dependency resolution
- **Incremental Builds** - Only rebuild what changed

### Package Management

- **Shared Dependencies** - Common dependencies in root
- **Workspace Isolation** - Each package has its own dependencies
- **Type Sharing** - Shared types via `@kanban/shared-types`
- **Build Optimization** - Turborepo optimizes build order

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
- **Path mapping** with `@/` and `@kanban/` aliases
- **Type definitions** in `src/types/` and `packages/shared-types/`
- **No `any` types** in production code

### ESLint & Prettier

- **Next.js ESLint config** for apps/kanban
- **Basic ESLint config** for packages/shared-types
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
cd apps/kanban && npm run analyze
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
- **Tests**: 194 tests passing
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
- **Turborepo** for monorepo management

---

**Built with modern web technologies and monorepo architecture**

## Pages

- `/` (Landing): hero + features
- `/login`: login form (mock auth / `jose`)
- `/dashboard`: stats and recent projects
- `/project/[slug]`: project info + Kanban board + realtime status
- `/settings`: profile and preferences

## Realtime (Yjs + y-websocket)

- `RealtimeRoom` on `project/[slug]` connects to room `kanban-{slug}`.
- Endpoint: `NEXT_PUBLIC_YWS_ENDPOINT` or `ws://localhost:1234` (dev default).
- Open the same `slug` in two tabs and use "+ Mock task (test)" or DnD — changes propagate without refresh.

Local websocket server (more stable than the public demo):

```bash
npx y-websocket --port 1234
# If CLI is missing:
npm i -g y-websocket && y-websocket --port 1234
```

Details: see `docs/REALTIME_TESTING.md`.

## CI (GitHub Actions)

- Workflow: `.github/workflows/ci.yml`
  - Install deps + Playwright browser, build, `start`, wait for port, and run `npm run e2e`.
  - Uploads `playwright-report` as an artifact on every run.
  - **Monorepo support**: Uses Turborepo for all tasks

## Monorepo Migration

This project was migrated from a single Next.js app to a monorepo structure:

- **Before**: Single `src/` directory with all code
- **After**: `apps/kanban/` with original code + `packages/shared-types/` for shared types
- **Benefits**: Scalable architecture, shared dependencies, build optimization
- **Turborepo**: Manages build pipeline and caching across packages
