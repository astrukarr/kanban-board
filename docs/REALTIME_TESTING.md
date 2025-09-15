## Realtime testiranje (Yjs + y-websocket)

Ovaj dokument pokriva kako pokrenuti i testirati realtime sinkronizaciju na kanban ploči u dva taba bez refresha, te kako riješiti tipične probleme.

### 1) Pokretanje aplikacije

- Pokreni dev server:
  - `npm run dev`
- Otvori projekt rutu u dva taba preglednika, npr.:
  - `http://localhost:3000/project/project-planetx` (ili port koji ispiše dev server, npr. 3003)

U vrhu ploče vidjet ćeš status: “Realtime connected · tasks: X”.

### 2) Što testirati

- “+ Mock task (test)” gumb:
  - Klik u prvom tabu → nova kartica se mora pojaviti i u drugom tabu bez osvježavanja.
- Drag & drop između kolona:
  - Povuci karticu u prvom tabu → promjena se pojavljuje u drugom tabu odmah.
- Remote badge (ako je uključen u `TaskCard`):
  - Na kartici primatelju kratko se pojavi oznaka “Updated remotely”.

### 3) Endpoint za websocket

U `src/app/project/[slug]/page.tsx` `RealtimeRoom` prima `endpoint` prop:

- Development (stabilno, lokalno): `ws://localhost:1234`
- Alternativa (javna demo instanca): `wss://demos.yjs.dev`

Ako želiš prebaciti endpoint, promijeni vrijednost `endpoint` u `RealtimeRoom` pozivu i refreshaš stranicu.

### 4) Lokalni websocket server (opcionalno, preporučeno za stabilnost)

Ako demo server puca ili spam-a konzolu, koristi lokalni `y-websocket` server.

Opcije (ovisno o verziji paketa):

- `npx y-websocket --port 1234` (novije verzije)
- ili `npx y-websocket-server --port 1234` (starije verzije)

Ako nijedna ne radi, instaliraj globalno pa pokreni:

- `npm i -g y-websocket`
- `y-websocket --port 1234`

Zatim postavi `endpoint="ws://localhost:1234"` i refreshaj oba taba.

Napomena: Na nekim sustavima CLI naziv ovisi o instaliranoj verziji. Ako dobiješ poruku da je naziv pogrešan, koristi predloženi naziv iz poruke.

### 5) Uobičajeni problemi i rješenja

- “React has detected a change in the order of Hooks…” ili “Rendered more hooks…” u `BoardWrapper`:
  - Fiksirano pozivanjem svih hookova bezuvjetno i pomicanjem izvedenih vrijednosti iznad ranih `return`-ova.
  - Ako se pojavi nakon izmjena, napravi hard refresh u oba taba.
- “Yjs was already imported. This breaks constructor checks…”
  - U `next.config.ts` je dodan webpack alias koji deduplikira `yjs` paket.
  - Ako se poruka ipak pojavi nakon Fast Refresh-a, napravi hard refresh.
- “WebSocket connection … failed” na `wss://demos.yjs.dev`:
  - Javni demo ponekad zatvara veze pod opterećenjem. Prebaci na lokalni `ws://localhost:1234` server.
- Ne vidiš “Realtime connected · tasks: X”:
  - Provjeri da je `RealtimeRoom` montiran na `project/[slug]` stranici i da `endpoint` pokazuje na ispravan URL.
- Drag & drop ne propagira promjenu:
  - Provjeri da su oba taba na istom `slug` (isti room). Ako je bilo seediranja podataka, daj nekoliko trenutaka i zatim probaj ponovno.

### 6) Očekivano ponašanje bez backend-a

Realtime koristi Yjs dokument u memoriji preko websocket-a. Nema trajne pohrane (persistencije) — zatvaranjem oba taba briše se stanje. Ovo je dovoljno za demonstraciju kolaboracije (broadcast promjena i konfliktno ažuriranje s CRDT-om u pozadini).
