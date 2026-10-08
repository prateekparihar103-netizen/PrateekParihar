/**
 * Decorative hero background: a faded blueprint grid plus three slowly
 * drifting colour fields — one per pillar. Purely presentational.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 bottom-0 -z-10 overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0 opacity-60 dark:opacity-40" />
      <div className="animate-drift absolute -top-24 left-[8%] size-[28rem] rounded-full bg-scm/15 blur-3xl dark:bg-scm/10" />
      <div
        className="animate-drift absolute top-10 right-[4%] size-[26rem] rounded-full bg-esg/15 blur-3xl dark:bg-esg/10"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="animate-drift absolute top-[22rem] left-[38%] size-[24rem] rounded-full bg-ai/15 blur-3xl dark:bg-ai/10"
        style={{ animationDelay: '-12s' }}
      />
    </div>
  )
}
