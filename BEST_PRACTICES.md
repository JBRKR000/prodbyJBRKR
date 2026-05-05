# Next.js Best Practices — World Class Code Quality

## Architektura i struktura projektu

### Struktura folderów — feature-based, nie type-based

# ŹLE — grupujesz po typie pliku
src/
  components/
    Button.tsx
    Modal.tsx
    BeatCard.tsx
  hooks/
    useBeats.ts
    useAuth.ts
  utils/
    beats.ts
    auth.ts

# DOBRZE — grupujesz po funkcjonalności
src/
  features/
    beats/
      components/
        BeatCard.tsx
        BeatPlayer.tsx
      hooks/
        useBeats.ts
      actions/
        beats.actions.ts
      types/
        beats.types.ts
    auth/
      components/
        LoginForm.tsx
      hooks/
        useAuth.ts
  shared/
    components/
      Button.tsx
      Modal.tsx
    lib/
      db.ts
      stripe.ts

---

## Server Components vs Client Components

### Domyślnie używaj Server Components
Każdy komponent w Next.js App Router jest domyślnie serwerowy.
Client Component dodajesz TYLKO gdy naprawdę potrzebujesz:
- useState / useEffect
- Event listenery (onClick, onChange)
- Browser APIs (window, localStorage)
- Zewnętrzne biblioteki które nie wspierają SSR

# ŹLE — niepotrzebny "use client"
"use client"
export default function BeatTitle({ title }: { title: string }) {
  return <h1>{title}</h1>  // zero interaktywności, nie potrzebuje client
}

# DOBRZE — zostaje Server Component
export default function BeatTitle({ title }: { title: string }) {
  return <h1>{title}</h1>
}

### Granica Server/Client jak najniżej w drzewie

# ŹLE — cały layout jest klientem przez jeden button
"use client"
export default function BeatPage({ beat }) {
  return (
    <div>
      <h1>{beat.title}</h1>           // mogło być server
      <p>{beat.description}</p>       // mogło być server
      <button onClick={playBeat}>     // jedyny powód dla "use client"
        Play
      </button>
    </div>
  )
}

# DOBRZE — izolujesz interaktywność
// BeatPage.tsx (Server Component)
export default function BeatPage({ beat }) {
  return (
    <div>
      <h1>{beat.title}</h1>
      <p>{beat.description}</p>
      <PlayButton beatId={beat.id} />  // tylko ten jest klientem
    </div>
  )
}

// PlayButton.tsx (Client Component)
"use client"
export default function PlayButton({ beatId }: { beatId: string }) {
  return <button onClick={() => play(beatId)}>Play</button>
}

---

## Data Fetching

### Fetch dane jak najbliżej miejsca użycia

# ŹLE — fetching na górze, props drilling w dół
// layout.tsx
const beats = await getBeats()
return <BeatList beats={beats} />  // przechodzi przez 3 komponenty

# DOBRZE — każdy komponent fetches własne dane
// BeatList.tsx (Server Component)
export default async function BeatList() {
  const beats = await getBeats()  // fetch tutaj gdzie używasz
  return beats.map(beat => <BeatCard beat={beat} />)
}

### Nigdy nie fetch w useEffect gdy możesz to zrobić serwerowo

# ŹLE
"use client"
export default function BeatList() {
  const [beats, setBeats] = useState([])
  useEffect(() => {
    fetch('/api/beats').then(r => r.json()).then(setBeats)
  }, [])
}

# DOBRZE
export default async function BeatList() {
  const beats = await db.beat.findMany()
  return beats.map(beat => <BeatCard key={beat.id} beat={beat} />)
}

### Parallel fetching — nie blokuj sekwencyjnie

# ŹLE — sekwencyjne, wolne
const beat = await getBeat(id)        // czeka
const artist = await getArtist(id)    // czeka na beat
const similar = await getSimilar(id)  // czeka na artist

# DOBRZE — równoległe
const [beat, artist, similar] = await Promise.all([
  getBeat(id),
  getArtist(id),
  getSimilar(id)
])

---

## Server Actions

### Używaj Server Actions zamiast API routes dla mutacji

# ŹLE — niepotrzebny endpoint
// app/api/beats/route.ts
export async function POST(req: Request) {
  const body = await req.json()
  await db.beat.create({ data: body })
}

// komponent
await fetch('/api/beats', { method: 'POST', body: JSON.stringify(data) })

# DOBRZE — Server Action
// features/beats/actions/beats.actions.ts
"use server"
export async function createBeat(formData: FormData) {
  const title = formData.get('title')
  await db.beat.create({ data: { title } })
  revalidatePath('/beats')
}

// komponent
<form action={createBeat}>
  <input name="title" />
  <button type="submit">Dodaj</button>
</form>

### Walidacja w Server Actions — zawsze

"use server"
import { z } from 'zod'

const BeatSchema = z.object({
  title: z.string().min(1).max(100),
  price: z.number().min(0).max(9999),
  bpm: z.number().min(40).max(300),
})

export async function createBeat(formData: FormData) {
  const parsed = BeatSchema.safeParse({
    title: formData.get('title'),
    price: Number(formData.get('price')),
    bpm: Number(formData.get('bpm')),
  })

  if (!parsed.success) {
    return { error: parsed.error.flatten() }
  }

  await db.beat.create({ data: parsed.data })
  revalidatePath('/beats')
}

---

## Baza danych

### Jeden klient Prisma — nigdy nie twórz nowego w każdym pliku

# ŹLE — w każdym pliku nowy klient
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()  // memory leak w dev

# DOBRZE — jeden globalny klient
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

### Nigdy nie zwracaj całego obiektu z bazy do klienta

# ŹLE — zwracasz wszystko włącznie z hasłem
const user = await db.user.findUnique({ where: { id } })
return user  // hasło, tokeny, prywatne dane lecą do klienta

# DOBRZE — select tylko to co potrzebujesz
const user = await db.user.findUnique({
  where: { id },
  select: { id: true, name: true, email: true }
})

---

## Obsługa błędów

### Error Boundaries dla każdej sekcji

// beats/error.tsx
"use client"
export default function BeatsError({ error, reset }) {
  return (
    <div>
      <p>Nie udało się załadować beatów</p>
      <button onClick={reset}>Spróbuj ponownie</button>
    </div>
  )
}

### Zawsze obsługuj loading state

// beats/loading.tsx
export default function BeatsLoading() {
  return <BeatCardSkeleton count={6} />
}

### Nigdy nie pokazuj użytkownikowi błędów z serwera

# ŹLE
catch (error) {
  return { error: error.message }  // może zawierać stack trace, dane DB
}

# DOBRZE
catch (error) {
  console.error(error)  // logujesz serwerowo
  return { error: 'Coś poszło nie tak. Spróbuj ponownie.' }
}

---

## Typowanie

### Inferuj typy z Prisma zamiast pisać ręcznie

# ŹLE — ręczny typ który może się rozjechać ze schematem
type Beat = {
  id: string
  title: string
  price: number
}

# DOBRZE — typ prosto z Prisma
import type { Beat } from '@prisma/client'

// Lub z select:
import { Prisma } from '@prisma/client'
type BeatWithArtist = Prisma.BeatGetPayload<{
  include: { artist: true }
}>

### Typuj response z API routes

import type { NextResponse } from 'next/server'

type BeatsResponse = {
  beats: Beat[]
  total: number
}

export async function GET(): Promise<NextResponse<BeatsResponse>> {
  const beats = await db.beat.findMany()
  return NextResponse.json({ beats, total: beats.length })
}

---

## Bezpieczeństwo

### Sprawdzaj autentykację w Server Actions i API routes

"use server"
import { auth } from '@/lib/auth'

export async function deleteBeat(beatId: string) {
  const session = await auth()

  if (!session) {
    throw new Error('Unauthorized')  // nigdy nie ufaj klientowi
  }

  // sprawdź czy beat należy do tego usera
  const beat = await db.beat.findUnique({ where: { id: beatId } })
  if (beat?.userId !== session.user.id) {
    throw new Error('Forbidden')
  }

  await db.beat.delete({ where: { id: beatId } })
}

### Zmienne środowiskowe — nigdy nie wrzucaj do klienta

# .env
DATABASE_URL="..."          # tylko serwer
STRIPE_SECRET_KEY="..."     # tylko serwer
NEXT_PUBLIC_STRIPE_KEY="..."  # NEXT_PUBLIC_ = idzie do klienta, uwaga!

### Waliduj i sanityzuj każdy input z zewnątrz

import { z } from 'zod'  // Zod to standard

---

## Wydajność

### Optymalizuj obrazki przez next/image — zawsze

# ŹLE
<img src={beat.coverUrl} alt={beat.title} />

# DOBRZE
import Image from 'next/image'
<Image
  src={beat.coverUrl}
  alt={beat.title}
  width={300}
  height={300}
  placeholder="blur"
/>

### Lazy loading dla ciężkich komponentów

import dynamic from 'next/dynamic'

// WaveSurfer jest ciężki — ładuj tylko gdy potrzebny
const BeatPlayer = dynamic(() => import('./BeatPlayer'), {
  loading: () => <PlayerSkeleton />,
  ssr: false  // Web Audio API nie działa na serwerze
})

### Cache agresywnie ale świadomie

// cache na poziomie funkcji
import { cache } from 'react'

export const getBeat = cache(async (id: string) => {
  return db.beat.findUnique({ where: { id } })
})

// revalidacja po mutacji
export async function updateBeat(id: string, data: BeatData) {
  await db.beat.update({ where: { id }, data })
  revalidatePath(`/beats/${id}`)
  revalidateTag('beats')
}

---

## Czego absolutnie unikać

- `useEffect` do fetchowania danych — używaj Server Components
- `any` w TypeScript — zawsze typuj
- Logika biznesowa w komponentach — wydzielaj do actions/services
- Sekrety z prefiksem `NEXT_PUBLIC_` — idą do przeglądarki
- `console.log` w produkcji — używaj loggera (pino, winston)
- Nowy `PrismaClient()` poza `lib/db.ts`
- Fetch bez obsługi błędów
- Brak walidacji inputów użytkownika
- Props drilling głębszy niż 2 poziomy — używaj Server Components lub Zustand/Context
- `export default` z anonimowych funkcji — utrudnia debugowanie

---

## Golden Rules

1. Server Component dopóki nie musisz być klientem
2. Fetch blisko użycia, nie na górze
3. Waliduj wszystko co przychodzi z zewnątrz (Zod)
4. Nigdy nie ufaj klientowi — sprawdzaj auth po stronie serwera
5. Typuj wszystko — `any` to czerwona flaga na code review
6. Jeden plik = jedna odpowiedzialność
7. Błędy loguj serwerowo, użytkownikowi pokazuj ogólny komunikat
8. Revaliduj cache po każdej mutacji