import { PhoneCall } from 'lucide-react'
import { helplines, tagLabels } from '@/lib/support-data'

export function HelplineDirectory() {
  return (
    <section id="helplines" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Verified numbers · India
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          Someone is awake on every one of these lines
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Government and nationally recognised helplines. Tap to dial. Calls to 112 connect
          even when your phone has no balance or no SIM.
        </p>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {helplines.map((line) => (
          <li key={line.number}>
            <a
              href={`tel:${line.number.replace(/[^0-9]/g, '')}`}
              className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/45 hover:bg-secondary"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="font-mono text-2xl font-medium tracking-tight">
                  {line.number}
                </span>
                <PhoneCall className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{line.name}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {line.detail}
                </span>
              </span>
              <span className="mt-auto flex items-center gap-2 pt-1 font-mono text-xs text-muted-foreground">
                <span className="rounded-full bg-accent px-2 py-0.5 text-accent-foreground">
                  {tagLabels[line.tag]}
                </span>
                {line.hours}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
