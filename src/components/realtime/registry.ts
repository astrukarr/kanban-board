import type * as Y from 'yjs';
import type { WebsocketProvider } from 'y-websocket';

type RoomEntry = {
  doc: Y.Doc;
  provider: WebsocketProvider;
};

const roomRegistry: Map<string, RoomEntry> = new Map();

export function setRoom(roomId: string, entry: RoomEntry) {
  roomRegistry.set(roomId, entry);
}

export function getDoc(roomId: string): Y.Doc | null {
  return roomRegistry.get(roomId)?.doc ?? null;
}

export function deleteRoom(roomId: string) {
  roomRegistry.delete(roomId);
}
