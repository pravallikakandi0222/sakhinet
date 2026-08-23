'use client'

import { Check, PackageCheck } from 'lucide-react'
import { useState } from 'react'
import { essentialItems } from '@/lib/support-data'

const deliveryModes = [
  {
    id: 'doorstep',
    label: 'Discreet doorstep delivery',
    note: 'Plain brown packaging, no brand name, no invoice inside.',
  },
  {
    id: 'pickup',
    label: 'Pick up from a safe point',
    note: 'Partner pharmacies, colleges and Anganwadi centres near you.',
  },
  {
    id: 'urgent',
    label: 'Urgent — I need it today',
    note: 'Volunteer drop within 4 hours in serviceable pin codes.',
  },
] as const

export function EssentialsRequest() {
  const [selected, setSelected] = useState<string[]>(['pads'])
  const [mode, setMode] = useState<string>('doorstep')
  const [pin, setPin] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <section id="essentials" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            Free essentials
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Period supplies and innerwear, at no cost, no questions
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Pick what you need. You will never be asked for income proof, a caste
            certificate or a reason. Requests are capped only to keep stock fair.
          </p>

          <fieldset className="mt-6">
            <legend className="sr-only">Choose the essentials you need</legend>
            <ul className="grid gap-3 sm:grid-cols-2">
              {essentialItems.map((item) => {
                const active = selected.includes(item.id)
                return (
                  <li key={item.id}>
                    <label
                      className={`flex h-full cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                        active
                          ? 'border-primary bg-secondary'
                          : 'border-border bg-card hover:border-primary/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggle(item.id)}
                        className="sr-only"
                      />
                      <span
                        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border ${
                          active
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-input'
                        }`}
                        aria-hidden="true"
                      >
                        {active && <Check className="size-3.5" />}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{item.name}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                        <span className="mt-2 block font-mono text-xs text-primary">
                          {item.unit}
                        </span>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </fieldset>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="flex h-fit flex-col gap-4 rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24"
        >
          <h3 className="text-base font-bold">How should it reach you?</h3>

          <fieldset className="flex flex-col gap-2">
            <legend className="sr-only">Delivery preference</legend>
            {deliveryModes.map((option) => (
              <label
                key={option.id}
                className={`cursor-pointer rounded-xl border p-3 transition-colors ${
                  mode === option.id
                    ? 'border-primary bg-secondary'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={mode === option.id}
                  onChange={() => setMode(option.id)}
                  className="sr-only"
                />
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {option.note}
                </span>
              </label>
            ))}
          </fieldset>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">PIN code</span>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              placeholder="400001"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          <button
            type="submit"
            disabled={selected.length === 0 || pin.length !== 6}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <PackageCheck className="size-4" aria-hidden="true" />
            Request {selected.length || 'these'} item{selected.length === 1 ? '' : 's'}
          </button>

          <p aria-live="polite" className="text-xs leading-relaxed text-muted-foreground">
            {submitted
              ? 'Request noted. A coordinator will confirm on your preferred channel, and nothing about this request appears on any shared bill or account.'
              : 'Select at least one item and a 6-digit PIN code to continue.'}
          </p>
        </form>
      </div>
    </section>
  )
}
