#!/usr/bin/env node
import { WebSocketServer } from 'ws';
// y-websocket >= v2 exposes setupWSConnection under bin/utils
import { setupWSConnection } from 'y-websocket/bin/utils.js';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 1234;
const host = process.env.HOST || '0.0.0.0';

const wss = new WebSocketServer({ port, host });

wss.on('connection', (conn, req) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  const room = url.pathname.replace(/^\//, '') || 'default';
  setupWSConnection(conn, req, { docName: room });
});

console.log(`[yws] y-websocket server listening on ws://localhost:${port}`);
