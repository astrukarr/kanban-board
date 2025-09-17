# Realtime Testing (Yjs + y-websocket)

This document covers how to run and test realtime synchronization on the kanban board across two tabs without refresh.

## Quick Start

1. **Start the app:**

   ```bash
   npm run dev
   ```

2. **Open project in two tabs:**

   ```
   http://localhost:3000/project/test
   ```

3. **Enable realtime mode:** Add `?rt=1` to both URLs:
   ```
   http://localhost:3000/project/test?rt=1
   ```
   We currently use `rt=1` to opt-in to realtime during development to avoid opening a websocket when only a single tab is open. This keeps single‑tab usage fast and predictable while still allowing collaboration tests on demand.

You should see "Realtime connected · tasks: X" status at the top of the board.

## Testing Scenarios

- **"+ Mock task (test)" button:** Click in first tab → card appears in second tab instantly
- **Drag & drop:** Move card between columns in first tab → change appears in second tab
- **Remote updates:** Cards show "Updated remotely" badge when changed from another tab

## WebSocket Endpoints

- **Public demo:** `wss://demos.yjs.dev` (default)
- **Local server:** `ws://localhost:1234` (more stable)

## Local WebSocket Server

For more stable testing, run a local server:

```bash
npx y-websocket --port 1234
```

Then update the endpoint in `src/app/project/[slug]/page.tsx` and refresh both tabs.

## Troubleshooting

- **"React hooks order changed"** → Hard refresh both tabs
- **"Yjs was already imported"** → Hard refresh (webpack alias should prevent this)
- **"WebSocket connection failed"** → Switch to local server (`ws://localhost:1234`)
- **No "Realtime connected" status** → Check `RealtimeRoom` is mounted and endpoint is correct
- **Drag & drop not syncing** → Ensure both tabs use same project slug

## Expected Behavior

Realtime uses Yjs document in memory via websocket. No persistence - closing both tabs clears the state. This is sufficient for demonstrating collaboration (broadcast changes and conflict resolution with CRDT).

## Roadmap: Remove `rt=1` via Multi‑tab Detection

- Ideal behavior is to remove the `rt=1` flag and rely on per‑room multi‑tab detection so the websocket connects only when at least two tabs of the same project are open.
- This avoids accidental socket connections on single‑tab browsing and makes testing intuitive: open a second tab and realtime activates automatically.
- See `docs/NEXT_STEPS.md` → “Realtime Activation via Multi-Tab Detection (Replace rt=1)”.
