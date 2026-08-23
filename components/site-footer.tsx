import { Shield } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-secondary">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between">
        <div className="max-w-sm">
          <p className="flex items-center gap-2 text-base font-bold">
            <Shield className="size-4 text-primary" aria-hidden="true" />
            Sakhi<span className="text-primary">Net</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Built with survivors, ASHA workers and volunteer counsellors. Nothing you enter
            here is sold, shared with advertisers, or shown to anyone you have not named.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <h2 className="text-sm font-bold">Staying safe on this site</h2>
          <ul className="flex max-w-md flex-col gap-2 text-muted-foreground">
            <li>
              The <span className="font-semibold text-foreground">Quick exit</span> button
              replaces this page instantly with a weather search.
            </li>
            <li>
              If a phone is shared, use a private or incognito window before you browse.
            </li>
            <li>
              This is a demonstration interface. Requests and alerts are not yet routed to
              a live coordinator, so always dial 112 in a real emergency.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-5 sm:px-6">
        <p className="mx-auto max-w-6xl font-mono text-xs text-muted-foreground">
          Emergency 112 · Women helpline 1091 · Tele-MANAS 14416
        </p>
      </div>
    </footer>
  )
}
