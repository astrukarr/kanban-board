declare module 'y-websocket' {
  import type * as Y from 'yjs';

  export class WebsocketProvider {
    constructor(
      serverUrl: string,
      room: string,
      doc: Y.Doc,
      opts?: Record<string, unknown>
    );
    connect(): void;
    disconnect(): void;
    destroy(): void;
    on(event: string, cb: (...args: unknown[]) => void): void;
    off(event: string, cb: (...args: unknown[]) => void): void;
  }
}
