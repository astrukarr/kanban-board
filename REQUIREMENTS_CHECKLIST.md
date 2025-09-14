# Project Requirements Checklist

## 1. MVP Razina (MVP Level)

### ✅ Tri kolone (Three columns)

- **Status**: ✅ **COMPLETED**
- **Implementation**: To Do, In Progress, Done - layout, boje i tipografija identični Figmi
- **Details**:
  - Implemented with `COLUMN_CONFIG` in constants
  - Responsive grid layout (1/2/3 columns based on screen size)
  - Proper styling with Tailwind CSS

### ✅ Inicijalni podaci (Initial data)

- **Status**: ✅ **COMPLETED**
- **Implementation**: GET https://jsonplaceholder.typicode.com/todos?_limit=12 → mapiraj u Task {id, title, status}. Nasumično ih rasporedi (id % 3) u kolone
- **Details**:
  - API call implemented in `src/lib/api/todos.ts`
  - Mapping function `modToStatus(id)` uses `id % 3` for random distribution
  - Tasks loaded on component mount with error handling

### ✅ Drag & drop

- **Status**: ✅ **COMPLETED**
- **Implementation**: Pomicanje kartica između kolona (koristiti drag&drop biblioteku po izboru)
- **Details**:
  - Implemented with `@dnd-kit/core` and `@dnd-kit/sortable`
  - Custom `useDragAndDrop` hook for state management
  - Smooth drag animations and visual feedback

### ✅ Klijentski state (Client state)

- **Status**: ✅ **COMPLETED**
- **Implementation**: useReducer. Cijeli niz zadataka se persistira u localStorage kroz useEffect
- **Details**:
  - `useTasks` hook with `useReducer` pattern
  - Complete task array persisted in localStorage
  - Optimistic updates with API fallback

### ✅ Responsivnost (Responsiveness)

- **Status**: ✅ **COMPLETED**
- **Implementation**: CSS Grid ili Flex: 1 kolona (<600 px), 2 (600-960), 3 (≥ 960 px)
- **Details**:
  - Responsive grid: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`
  - Mobile-first approach with Tailwind breakpoints
  - Adaptive layouts for different screen sizes

---

## 2. Razina (Advanced Level)

### ✅ Modal "New Task"

- **Status**: ✅ **COMPLETED**
- **Implementation**: Design based on Figma. Uses `React-Hook-Form` for forms and `yup` for validation. Implements an optimistic POST request to `/todos`
- **Details**:
  - `NewTaskModal` component with proper design
  - `React-Hook-Form` integration with `yup` validation
  - Optimistic updates with API fallback
  - Toast notifications for user feedback

### ✅ Offline-first

- **Status**: ✅ **COMPLETED**
- **Implementation**: PWA (Progressive Web App) implemented with `Workbox` or `vite-plugin-pwa`. Caches static assets. Uses a "Network First" strategy for API calls. Displays a banner message: "Offline – promjene će se sinkati"
- **Details**:
  - PWA implemented with `next-pwa` and Workbox
  - Service worker with caching strategies
  - `OfflineBanner` component displays offline status
  - localStorage persistence for offline data

### ⚠️ Guardirana ruta /settings (Guarded route /settings)

- **Status**: ⚠️ **PARTIALLY COMPLETED**
- **Implementation**: Uses `React Router v6`. Employs a dummy JWT (JSON Web Token) stored in `localStorage.token`. Includes a `RequireAuth` wrapper component. Uses an `Axios` interceptor to add the `Authorization` header to requests
- **Details**:
  - ✅ `RequireAuth` component exists
  - ✅ Settings page exists
  - ❌ **MISSING**: React Router v6 (using Next.js App Router instead)
  - ❌ **MISSING**: JWT token in localStorage
  - ❌ **MISSING**: Axios interceptor (using fetch instead)
  - **Note**: Using Next.js App Router instead of React Router v6

### ✅ Unit testovi (Unit tests)

- **Status**: ✅ **COMPLETED**
- **Implementation**: Requires at least 5 tests (≥ 5 testova). Uses `React Testing Library` and `Jest`. Examples of components/logic to be tested include: reducer, drag&drop, form, guard
- **Details**:
  - ✅ **177 tests** implemented (far exceeds 5 test requirement)
  - ✅ Uses `React Testing Library` and `Jest`
  - ✅ Tests for reducer logic (`useTasks` hook)
  - ✅ Tests for drag&drop (`useDragAndDrop` hook)
  - ✅ Tests for forms (`NewTaskModal` component)
  - ✅ Tests for utility functions
  - **Coverage**: 29.29% statements (target: 80%)

---

## 3. Razina (Expert Level)

### ❌ Real-time kolaboracija (Real-time collaboration)

- **Status**: ❌ **NOT IMPLEMENTED**
- **Implementation**: Yjs + y-websocket (public echo server ili vlastiti). Promjene kartica broadcast-aj i primaj bez refresh-a
- **Details**: Not implemented - would require WebSocket integration

### ❌ UI za konflikte (UI for conflicts)

- **Status**: ❌ **NOT IMPLEMENTED**
- **Implementation**: Kad kartica stigne "remote" update, doda se badge "Updated remotely" + kratka animacija (Framer Motion)
- **Details**: Not implemented - requires real-time collaboration first

### ❌ Monorepo

- **Status**: ❌ **NOT IMPLEMENTED**
- **Implementation**: Nx 17 ili Turborepo: apps/kanban, packages/ui, packages/data-access
- **Details**: Currently single Next.js app, not monorepo structure

### ⚠️ CI pipeline

- **Status**: ⚠️ **PARTIALLY COMPLETED**
- **Implementation**: GitHub Actions: lint → jest (coverage ≥ 80%) → build → Cypress e2e (provjera DnD) → Lighthouse-CI (perf ≥ 90, JS ≤ 150 KB)
- **Details**:
  - ✅ GitHub Actions implemented
  - ✅ Lint checks
  - ✅ Jest tests (coverage implemented, currently 29.29%)
  - ✅ Build process
  - ❌ **MISSING**: Cypress e2e tests
  - ❌ **MISSING**: Lighthouse-CI integration
  - **Note**: Bundle size is 102kB (under 150KB limit)

### ⚠️ Perf budžet (Performance budget)

- **Status**: ⚠️ **PARTIALLY COMPLETED**
- **Implementation**: CLS < 0.1, LCP < 2 s (3G), bundle ≤ 150 KB (first load)
- **Details**:
  - ✅ Bundle size: 102kB (under 150KB limit)
  - ❌ **MISSING**: CLS measurement
  - ❌ **MISSING**: LCP measurement
  - ❌ **MISSING**: 3G network testing

---

## Summary

### ✅ Completed Requirements

- **MVP Level**: 5/5 (100%)
- **Advanced Level**: 3/4 (75%)
- **Expert Level**: 0/5 (0%)

### Overall Progress

- **Total**: 8/14 requirements completed (57%)
- **MVP**: Fully functional Kanban board
- **Advanced**: Most features implemented
- **Expert**: Not implemented (real-time collaboration, monorepo, advanced CI)

### Key Achievements

- ✅ Fully functional drag & drop Kanban board
- ✅ PWA with offline support
- ✅ Comprehensive testing (177 tests)
- ✅ Modern React/Next.js architecture
- ✅ TypeScript with full type safety
- ✅ Performance optimized (102kB bundle)

### Missing Critical Items

- ❌ Real-time collaboration
- ❌ Cypress e2e tests
- ❌ Lighthouse-CI integration
- ❌ Performance monitoring
- ❌ Monorepo structure
