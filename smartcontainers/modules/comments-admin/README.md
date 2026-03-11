# comments-admin — przenośny moduł komentarzy z trybem admina

Samowystarczalny katalog do wrzucenia w dowolny projekt **Vite + React + Redis** (np. Vercel serverless).

## Struktura

```
modules/comments-admin/
├── index.ts                      ← punkt wejścia (barrel)
├── types.ts                      ← interfejs CommentData
├── hooks/
│   ├── useAdminMode.ts           ← detekcja trybu admina (klawiatura)
│   └── useComments.ts            ← pobieranie / dodawanie / usuwanie komentarzy
├── components/
│   └── CommentsOverlay.tsx       ← gotowy komponent React
└── api/
    └── comments.ts               ← handler API (Vercel serverless / Express)
```

## Szybki start (nowy projekt)

### 1. Skopiuj ten katalog

```
cp -r modules/comments-admin  <nowy-projekt>/modules/comments-admin
```

### 2. Zainstaluj zależności (jeśli brakuje)

```bash
npm install lucide-react ioredis
# lub: yarn add lucide-react ioredis
```

### 3. Skonfiguruj API

Skopiuj `api/comments.ts` do katalogu `api/` w swoim projekcie Vercel:

```
cp modules/comments-admin/api/comments.ts  api/comments.ts
```

Dodaj zmienną środowiskową w `.env` / Vercel Dashboard:

```
REDIS_URL=redis://:haslo@host:6379
```

> Plik `api/comments.ts` obsługuje też starą nazwę `redisvw_REDIS_URL` dla kompatybilności.

### 4. Użyj komponentu w React

```tsx
import { CommentsOverlay } from './modules/comments-admin';

// W komponencie:
<div style={{ position: 'relative' }}>
  {/* Twoja treść */}
  <CommentsOverlay
    currentView="nazwa-widoku"   // unikalna nazwa strony/widoku
    isMobile={false}             // opcjonalnie — zmienia pozycję przycisku
    apiUrl="/api/comments"       // opcjonalnie — domyślnie /api/comments
  />
</div>
```

> `<div>` rodzica musi mieć `position: relative` (lub `absolute`/`fixed`),  
> bo nakładka używa `position: absolute; inset: 0`.

### 5. Aktywacja trybu admina

Wpisz **`tom123woz`** na klawiaturze (poza polami input/textarea).  
Pojawi się alert z potwierdzeniem. Stan persystowany w `localStorage`.

Powtórz kod aby wyłączyć.

---

## API REST

| Metoda   | Endpoint            | Opis                           |
|----------|---------------------|--------------------------------|
| `GET`    | `/api/comments`     | Pobierz wszystkie komentarze   |
| `POST`   | `/api/comments`     | Dodaj nowy komentarz (body JSON) |
| `DELETE` | `/api/comments?id=` | Usuń komentarz po ID           |

### Schemat komentarza

```ts
{
  id: string;           // UUID (generowany przez API)
  x: number;            // % 0–100 od lewej
  y: number;            // % 0–100 od góry
  view: string;         // identyfikator widoku
  text: string;
  author: string;
  createdAt: string;    // ISO 8601
  isAdminComment?: boolean;
}
```

## Fallback (offline)

Gdy API nie odpowiada, komentarze zapisywane są lokalnie w `localStorage` pod kluczem `comments_admin_mock`. Synchronizacja po powrocie sieci.

## Wymagania

- React ≥ 17
- TypeScript ≥ 4.5
- `lucide-react` — ikony
- `ioredis` — połączenie z Redis (wymagane po stronie API / serwera)
