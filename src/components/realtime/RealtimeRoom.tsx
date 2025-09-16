'use client';

import { useEffect, useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { setRoom, deleteRoom } from './registry';

type RealtimeRoomProps = {
  roomId: string;
  endpoint?: string;
};

/**
 * Minimal Realtime room connector.
 * - Establishes Yjs doc + y-websocket provider
 * - Exposes a shared map `doc.getMap('meta')` we can use for simple smoke tests
 */
export default function RealtimeRoom({ roomId, endpoint }: RealtimeRoomProps) {
  const providerRef = useRef<WebsocketProvider | null>(null);
  const docRef = useRef<Y.Doc | null>(null);

  useEffect(() => {
    // Hard gate: connect only when explicitly enabled via URL (?rt=1)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const enabled = params.get('rt') === '1';
      if (!enabled) return;
    }

    const doc = new Y.Doc();
    // Prefer local server for stability during dev
    const url = endpoint ?? 'ws://localhost:1234';
    const provider = new WebsocketProvider(url, roomId, doc);

    providerRef.current = provider;
    docRef.current = doc;

    // simple heartbeat write for visibility (no UI yet)
    const meta = doc.getMap('meta');
    meta.set('mountedAt', Date.now());

    setRoom(roomId, { doc, provider });

    return () => {
      provider.destroy();
      doc.destroy();
      providerRef.current = null;
      docRef.current = null;
      deleteRoom(roomId);
    };
  }, [roomId, endpoint]);

  return null;
}
