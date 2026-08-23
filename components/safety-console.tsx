'use client'

import { Check, MapPin, Plus, Trash2, TriangleAlert, UserRound } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type Contact = {
  id: string
  name: string
  relation: string
  phone: string
}

const HOLD_MS = 2000

export function SafetyConsole() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 'c1', name: 'Meera Nair', relation: 'Sister', phone: '+91 98200 11223' },
    { id: 'c2', name: 'Aunty Radha', relation: 'Neighbour', phone: '+91 99870 45612' },
  ])
  const [form, setForm] = useState({ name: '', relation: '', phone: '' })
  const [progress, setProgress] = useState(0)
  const [alertSent, setAlertSent] = useState(false)
  const [location, setLocation] = useState<string | null>(null)
  const [sentAt, setSentAt] = useState<string | null>(null)

  const holdingRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(0)

  const stopHold = useCallback(() => {
    holdingRef.current = false
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    setProgress(0)
  }, [])

  useEffect(() => stopHold, [stopHold])

  function fire() {
    stopHold()
    setAlertSent(true)
    setSentAt(
      new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    )
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation(
            `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
          ),
        () => setLocation('unavailable'),
        { timeout: 8000 },
      )
    } else {
      setLocation('unavailable')
    }
  }

  function startHold() {
    if (alertSent) return
    holdingRef.current = true
    startRef.current = performance.now()
    const tick = () => {
      if (!holdingRef.current) return
      const pct = Math.min(1, (performance.now() - startRef.current) / HOLD_MS)
      setProgress(pct)
      if (pct >= 1) {
        fire()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  function addContact(event: React.FormEvent) {
    event.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setContacts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: form.name.trim(),
        relation: form.relation.trim() || 'Contact',
        phone: form.phone.trim(),
      },
    ])
    setForm({ name: '', relation: '', phone: '' })
  }

  return (
    <section id="sos" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
        {/* Signature element: press-and-hold SOS */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex size-56 items-center justify-center sm:size-64">
            {!alertSent && (
              <span
                className="sos-ring pointer-events-none absolute inset-6 rounded-full"
                aria-hidden="true"
              />
            )}
            <div
              className="absolute inset-2 rounded-full"
              style={{
                background: alertSent
                  ? 'var(--primary)'
                  : `conic-gradient(var(--destructive) ${progress * 360}deg, var(--border) 0deg)`,
              }}
              aria-hidden="true"
            />
            <button
              type="button"
              onPointerDown={startHold}
              onPointerUp={stopHold}
              onPointerLeave={stopHold}
              onPointerCancel={stopHold}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (!holdingRef.current) startHold()
                }
              }}
              onKeyUp={stopHold}
              onBlur={stopHold}
              disabled={alertSent}
              aria-label="Press and hold for two seconds to send an emergency alert"
              className="relative z-10 flex size-44 flex-col items-center justify-center gap-1 rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform select-none active:scale-95 disabled:bg-primary disabled:text-primary-foreground sm:size-52"
            >
              {alertSent ? (
                <>
                  <Check className="size-8" aria-hidden="true" />
                  <span className="text-base font-bold">Alert sent</span>
                  <span className="font-mono text-xs opacity-80">{sentAt}</span>
                </>
              ) : (
                <>
                  <TriangleAlert className="size-8" aria-hidden="true" />
                  <span className="text-3xl font-extrabold tracking-tight">SOS</span>
                  <span className="max-w-28 text-center text-xs leading-snug opacity-90">
                    hold 2 seconds
                  </span>
                </>
              )}
            </button>
          </div>

          <div aria-live="polite" className="w-full max-w-sm text-center">
            {alertSent ? (
              <div className="rounded-xl border border-primary/25 bg-secondary p-4 text-left">
                <p className="text-sm font-semibold">
                  Alert delivered to {contacts.length} contact
                  {contacts.length === 1 ? '' : 's'}
                </p>
                <ul className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="font-mono text-xs">
                      {location === null
                        ? 'fetching location...'
                        : location === 'unavailable'
                          ? 'location permission denied'
                          : location}
                    </span>
                  </li>
                  <li>Live audio note recording started</li>
                  <li>Your last known route is being shared for 60 minutes</li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href="tel:112"
                    className="rounded-lg bg-destructive px-3 py-2 text-sm font-semibold text-destructive-foreground"
                  >
                    Call 112 now
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setAlertSent(false)
                      setLocation(null)
                      setSentAt(null)
                    }}
                    className="rounded-lg border border-border px-3 py-2 text-sm font-medium"
                  >
                    I am safe, reset
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Holding sends your live location, starts an audio recording and messages
                everyone on your circle. Nothing is sent on an accidental tap.
              </p>
            )}
          </div>
        </div>

        {/* Trusted circle */}
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Your trusted circle</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Up to five people who get the alert at once. Add someone who will actually
              pick up at 3am.
            </p>
          </div>

          <ul className="flex flex-col gap-2">
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <UserRound className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">
                    {contact.name}
                  </span>
                  <span className="block truncate font-mono text-xs text-muted-foreground">
                    {contact.relation} · {contact.phone}
                  </span>
                </span>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="rounded-md px-2 py-1 text-xs font-semibold text-primary hover:bg-secondary"
                >
                  Call
                </a>
                <button
                  type="button"
                  onClick={() =>
                    setContacts((prev) => prev.filter((c) => c.id !== contact.id))
                  }
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label={`Remove ${contact.name}`}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </li>
            ))}
            {contacts.length === 0 && (
              <li className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">
                No contacts yet. Add at least one.
              </li>
            )}
          </ul>

          <form
            onSubmit={addContact}
            className="flex flex-col gap-2 rounded-xl border border-border bg-background p-3 sm:flex-row"
          >
            <label className="flex-1">
              <span className="sr-only">Contact name</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="flex-1">
              <span className="sr-only">Relation</span>
              <input
                value={form.relation}
                onChange={(e) => setForm({ ...form, relation: e.target.value })}
                placeholder="Relation"
                className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="flex-1">
              <span className="sr-only">Phone number</span>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone"
                inputMode="tel"
                className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <button
              type="submit"
              disabled={contacts.length >= 5}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
