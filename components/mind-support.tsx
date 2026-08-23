import { ArrowRight, HeartHandshake } from 'lucide-react'
import { GroundingBreath } from '@/components/grounding-breath'
import { therapyTracks } from '@/lib/support-data'

export function MindSupport() {
  return (
    <section id="support" className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          Mental health
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          A crisis in your head is still an emergency
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Depression, panic and exhaustion are not weakness and not something to earn help
          for. Three ways in, depending on how heavy today is.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <ul className="grid gap-3 sm:grid-cols-3">
          {therapyTracks.map((track) => (
            <li
              key={track.title}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="text-base font-bold tracking-tight">{track.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{track.who}</p>
              <p className="text-sm leading-relaxed">{track.format}</p>
              <p className="font-mono text-xs text-primary">{track.cost}</p>
              <ul className="flex flex-col gap-1.5 border-t border-border pt-3">
                {track.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <HeartHandshake
                      className="mt-0.5 size-3.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="tel:14416"
                className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary hover:underline"
              >
                Start with a call
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <GroundingBreath />
        </div>
      </div>
    </section>
  )
}
