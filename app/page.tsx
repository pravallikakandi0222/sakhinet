import { EssentialsRequest } from '@/components/essentials-request'
import { HelplineDirectory } from '@/components/helpline-directory'
import { MindSupport } from '@/components/mind-support'
import { SafetyConsole } from '@/components/safety-console'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex flex-col gap-16 pb-16 sm:gap-24">
        <section className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-20">
          <p className="font-mono text-xs tracking-widest text-primary uppercase">
            Safety · Essentials · Support
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl">
            Help that does not make you explain yourself first.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            One hold of a button to reach your people. Verified helplines that actually pick
            up. Period supplies and innerwear delivered free and discreetly. Counsellors who
            treat a bad month as seriously as a broken bone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#sos"
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Set up my SOS
            </a>
            <a
              href="#essentials"
              className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              I need essentials
            </a>
          </div>
        </section>

        <SafetyConsole />
        <HelplineDirectory />
        <EssentialsRequest />
        <MindSupport />
      </main>
      <SiteFooter />
    </>
  )
}
