'use client'

import { Phone, Shield, X } from 'lucide-react'

const links = [
  { href: '#sos', label: 'SOS' },
  { href: '#helplines', label: 'Helplines' },
  { href: '#essentials', label: 'Essentials' },
  { href: '#support', label: 'Therapy' },
]

export function SiteHeader() {
  function quickExit() {
    window.location.replace('https://www.google.com/search?q=weather+today')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="size-4" aria-hidden="true" />
          </span>
          <span className="text-base font-bold tracking-tight">
            Sakhi<span className="text-saffron">Net</span>
          </span>
        </a>

        <nav aria-label="Sections" className="ml-2 hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="tel:112"
            className="flex items-center gap-2 rounded-lg bg-destructive px-3 py-2 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call 112
          </a>
          <button
            type="button"
            onClick={quickExit}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Quick exit</span>
            <span className="sr-only sm:hidden">Quick exit this site</span>
          </button>
        </div>
      </div>

      <nav
        aria-label="Sections"
        className="flex items-center gap-1 overflow-x-auto border-t border-border/70 px-4 py-2 md:hidden"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-md px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
