'use client'

import { Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

const phases = [
  { label: 'Breathe in', seconds: 4, scale: 1 },
  { label: 'Hold', seconds: 4, scale: 1 },
  { label: 'Breathe out', seconds: 6, scale: 0.62 },
] as const

export function GroundingBreath() {
  const [running, setRunning] = useState(false)
  const [index, setIndex] = useState(0)
  const [left, setLeft] = useState(phases[0].seconds)
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => setLeft((prev) => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [running])

  useEffect(() => {
    if (left > 0) return
    const next = (index + 1) % phases.length
    setIndex(next)
    setLeft(phases[next].seconds)
    if (next === 0) setCycles((c) => c + 1)
  }, [left, index])

  const phase = phases[index]

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6">
      <div className="text-center">
        <h3 className="text-base font-bold">Ninety seconds of quiet</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          A 4-4-6 breath. It will not fix anything, but it buys your body enough calm to
          make the next call.
        </p>
      </div>

      <div className="relative flex size-40 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full bg-accent transition-transform duration-1000 ease-in-out"
          style={{ transform: `scale(${running ? phase.scale : 0.8})` }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col items-center" aria-live="polite">
          <span className="text-sm font-semibold text-accent-foreground">
            {running ? phase.label : 'Ready'}
          </span>
          <span className="font-mono text-3xl font-medium tabular-nums">
            {running ? left : phases[0].seconds}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setRunning((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        {running ? (
          <>
            <Pause className="size-4" aria-hidden="true" /> Pause
          </>
        ) : (
          <>
            <Play className="size-4" aria-hidden="true" /> Start
          </>
        )}
      </button>

      <p className="font-mono text-xs text-muted-foreground">
        {cycles} cycle{cycles === 1 ? '' : 's'} done
      </p>
    </div>
  )
}
