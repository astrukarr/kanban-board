## Next Steps Roadmap

This document outlines the major improvements to bring the Kanban Board to the next level. Each item includes scope, acceptance criteria, and implementation notes. Where useful, related files/components are referenced.

### 1) Clickable Sidebar with Pages

- **Goal**: Each sidebar item navigates to its dedicated page (Dashboard, Project list, individual Project, Settings, etc.).
- **Acceptance criteria**:
  - Sidebar items are keyboard-accessible and reflect active route state.
  - Navigation does not cause layout shift; content skeletons appear while loading.
  - Current page is visually highlighted (ARIA + data-state attributes).
- **Implementation notes**:
  - Use Next.js App Router links with `prefetch` for top-level pages.
  - Centralize routes in a routes map; keep labels and icons in one place.
  - Add unit tests for active state and navigation.

### 2) Functional Invite Button

- **Goal**: Clicking Invite opens a modal to enter one or more emails; client-side validate; mock success path for now.
- **Acceptance criteria**:
  - Invite modal with email input, chips for multiple invitees, and validation feedback.
  - Submit triggers toast on success; graceful error states shown on failure.
  - Close on ESC/outside click; focus trap inside modal.
- **Implementation notes**:
  - Component: `src/components/buttons/InviteButton.tsx` + new `InviteModal`.
  - Validation: simple RFC 5322-ish regex + dedupe.
  - Hook up to future backend endpoint `POST /projects/:id/invites` (see Backend section).

### 3) Functional Export Data Button

- **Goal**: Export project tasks to CSV and JSON.
- **Acceptance criteria**:
  - Button offers CSV and JSON options.
  - File includes all task fields and respects current project scope.
  - Large exports stream or chunk without blocking UI; show toast on completion.
- **Implementation notes**:
  - Client-only to start; use a small utility to serialize columns.
  - Consider Web Worker for very large datasets later.

### 4) View Switcher (List, Grid, Column)

- **Goal**: Switch between multiple task views; persist preference per project.
- **Acceptance criteria**:
  - Toggling views updates layout without losing selection/scroll.
  - View preference persists in `localStorage` or user profile when auth arrives.
  - DnD remains enabled in Column (kanban) mode; List/Grid use selection actions.
- **Implementation notes**:
  - Source of truth: a `view` state in `BoardWrapper` (or page-level), synced to storage.
  - Split presentational components: `ListView`, `GridView`, `ColumnView`.

### 5) Remove Task

- **Goal**: Ability to delete a task locally and in realtime when active.
- **Acceptance criteria**:
  - Delete action in card kebab menu with confirm dialog.
  - Updates state immediately (optimistic); mirrored to Yjs when RT is on.
  - Local storage updated; undo option (simple 5–10s snackbar).
- **Implementation notes**:
  - Extend reducer with `REMOVE_TASK`; add Yjs path to remove from array.
  - Tests: reducer, hook, and UI.

### 6) Edit Task

- **Goal**: Edit title, description, assignees, labels, and status.
- **Acceptance criteria**:
  - Edit modal prefilled with current data; Save updates local/RT state.
  - Validation for required fields (title) and max lengths.
  - Keyboard: Enter to save, ESC to cancel.
- **Implementation notes**:
  - Reuse `NewTaskModal` form with mode=edit; controlled inputs.
  - Yjs: upsert task in array (existing pattern in `useRealtimeTasks`).

### 7) Virtualization for Large Lists

- **Goal**: Smooth rendering with thousands of tasks.
- **Acceptance criteria**:
  - Column/List views remain 60fps while scrolling long lists.
  - DnD continues to work with virtualized rows.
- **Implementation notes**:
  - Introduce `@tanstack/react-virtual` or `react-virtualized`.
  - Wrap task lists in virtualization; integrate DnD sensors with measured containers.
  - Consider windowed measurement + sticky headers per column.

### 8) Realtime Activation: Current vs Desired

- **Current (for testing today)**:
  - Realtime is enabled explicitly via the `?rt=1` query flag on the project URL (e.g., `http://localhost:3000/project/test?rt=1`).
  - The flag is read in `useRealtimeSetup` and `RealtimeRoom` to decide whether to initialize the Yjs doc and open the websocket.
  - We do this to avoid opening a websocket when only one tab is open, keeping single‑tab use fast and predictable during development.

- **Goal (next)**: Connect to websocket only when at least two tabs of the same project are open.
- **Acceptance criteria**:
  - Single tab: no websocket connection; app uses local storage and API fallback.
  - Multi-tab (same project): websocket connects; Yjs state seeds from local once; UI switches to RT when ready and non-empty.
  - No localStorage wipe with empty arrays.
- **Implementation notes**:
  - `useMultiTabDetection(roomKey)` based on `BroadcastChannel` with per-room channel name.
  - Keep original switching rule: use RT only when `roomActive && rtReady && rtTasks.length > 0`.
  - Seed once from `kanban-tasks` → Yjs if Yjs is empty; mirror Yjs → `rt:tasks:<room>` and → `kanban-tasks`.
  - Prefer local `ws://localhost:1234` for dev; make endpoint configurable.

### 9) Backend Service (Own API)

- **Goal**: Replace mock data with a real backend.
- **Data model** (Task):
  - `id: string`
  - `title: string`
  - `description?: string`
  - `assignee?: { id: string; name: string; avatarUrl?: string }`
  - `status: 'todo' | 'in_progress' | 'completed'`
  - `labels?: Array<'high' | 'medium' | 'low' | string>`
  - `createdAt: string` (ISO)
  - `updatedAt: string` (ISO)
- **Endpoints (v1)**:
  - `GET /projects/:id/tasks` → Task[]
  - `POST /projects/:id/tasks` → Task (create)
  - `PATCH /projects/:id/tasks/:taskId` → Task (update)
  - `DELETE /projects/:id/tasks/:taskId` → { ok: true }
  - `POST /projects/:id/invites` → { ok: true }
- **Notes**:
  - Start with a simple Node/Express service, or Next.js Route Handlers.
  - Add server-side validation (zod) and request logging.
  - Consider WebSocket/Yjs server co-location or separate service.

### 10) QA, Perf, and DX

- **Goal**: Ensure stability, performance, and developer ergonomics.
- **Acceptance criteria**:
  - Unit tests for reducers/hooks/components; E2E for DnD and RT flows.
  - Lighthouse keeps good scores; no layout shifts on view switch.
  - Bundle size checked; code-splitting for modals and heavy components.
- **Implementation notes**:
  - Add tests for: create, edit, move, delete (local and RT).
  - Add Storybook (optional) for UI states and visual tests.

## Phased Plan

1. View switcher + sidebar nav (low risk, fast wins).
2. Remove/edit task flows with tests.
3. Export/Invite functionality.
4. Realtime activation via multi-tab detection (replace rt=1) with strict switching rules.
5. Virtualization for large lists.
6. Backend MVP and wire the UI.

## Risks & Mitigations

- Realtime race conditions: keep strict switching rule and seed-once semantics.
- Virtualization + DnD integration: guard with feature flag and test thoroughly.
- Backend evolution: version endpoints; validate payloads strictly.

## Tracking

Create one ticket per section above with checklists mapping to acceptance criteria. Prioritize per the phased plan.
