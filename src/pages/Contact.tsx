/**
 * Contact — minimalist two-column layout.
 *
 * Left: a contact form with real client-side validation and loading/
 * success states. It is SIMULATED: nothing is sent anywhere, and the
 * success state says so and offers a pre-filled email instead. To make
 * it live, replace `simulateSend` with a call to Formspree, Web3Forms,
 * a Vercel function, etc.
 *
 * Right: large anchors for LinkedIn, GitHub and email (with copy).
 */
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Loader2, Mail, Send } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { Page } from '../components/Page'
import { Container, Reveal, SectionHeading } from '../components/Primitives'
import { profile } from '../data/resume'
import { cn } from '../lib/accent'
import { ease, fadeUp, stagger } from '../motion/presets'

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please add your name.'
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.'
  if (f.message.trim().length < 10) e.message = 'A few more words, please (10+ characters).'
  return e
}

/** Stand-in for a real submission endpoint. */
const simulateSend = () => new Promise((r) => setTimeout(r, 1200))

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-xs tracking-widest text-muted uppercase">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass = (invalid: boolean) =>
  cn(
    'w-full rounded-2xl border bg-surface px-4 py-3.5 text-base text-ink placeholder:text-muted/70 transition-colors duration-200 outline-none focus:border-ink',
    invalid ? 'border-red-500/70' : 'border-line',
  )

function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const update = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    setStatus('sending')
    await simulateSend()
    setStatus('sent')
  }

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Hello from ${fields.name}`)}&body=${encodeURIComponent(fields.message)}`

  return (
    <div className="relative rounded-[2rem] border border-line bg-surface p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="flex min-h-[26rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid size-16 place-items-center rounded-full bg-esg/15 text-esg"
            >
              <Check size={28} aria-hidden="true" />
            </motion.span>
            <h3 className="mt-6 font-display text-3xl">Thanks, {fields.name.split(' ')[0]}.</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              This form is a preview and doesn’t deliver messages yet. To reach me now, send the same note by email —
              it’s already filled in.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={mailto} className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg">
                <Mail size={16} aria-hidden="true" /> Open in email
              </a>
              <button
                type="button"
                onClick={() => {
                  setFields({ name: '', email: '', message: '' })
                  setStatus('idle')
                }}
                className="inline-flex h-11 cursor-pointer items-center rounded-full border border-line px-5 text-sm"
              >
                Write another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }} className="space-y-5" aria-describedby="form-note">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={update('name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass(!!errors.name)}
                  placeholder="Your name"
                />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={fields.email}
                  onChange={update('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass(!!errors.email)}
                  placeholder="you@company.com"
                />
              </Field>
            </div>
            <Field id="message" label="Message" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={fields.message}
                onChange={update('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={cn(inputClass(!!errors.message), 'resize-none')}
                placeholder="A role, a project, or a supply chain problem worth solving…"
              />
            </Field>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <p id="form-note" className="text-xs text-muted">
                Preview form — messages aren’t stored or sent.
              </p>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.97 }}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-ink px-6 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send size={16} aria-hidden="true" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — the address is visible to copy manually */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Email copied' : 'Copy email address'}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={copied ? 'y' : 'n'} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
          {copied ? <Check size={16} className="text-esg" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Contact() {
  const anchors = [
    { label: 'LinkedIn', value: `in/${profile.linkedinHandle}`, href: profile.linkedin, icon: <LinkedinIcon size={22} />, tone: 'group-hover:text-ai' },
    { label: 'GitHub', value: profile.githubHandle, href: profile.github, icon: <GithubIcon size={22} />, tone: 'group-hover:text-esg' },
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={22} aria-hidden="true" />, tone: 'group-hover:text-scm' },
  ]

  return (
    <Page title="Contact">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title={
            <>
              Let’s talk <em className="text-ai">shop</em>.
            </>
          }
          description="Enterprise AI, supply chain consulting or ESG strategy — if it involves making complex operations smarter, I’d like to hear about it."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <motion.ul className="space-y-3" variants={stagger(0.1, 0.15)} initial="hidden" animate="show">
            {anchors.map((a) => (
              <motion.li key={a.label} variants={fadeUp} className="flex items-center gap-2">
                <a
                  href={a.href}
                  target={a.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex min-w-0 flex-1 items-center gap-4 rounded-3xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-ink/40"
                >
                  <span className={cn('grid size-12 shrink-0 place-items-center rounded-2xl bg-surface-2 text-ink transition-colors duration-300', a.tone)}>
                    {a.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs tracking-widest text-muted uppercase">{a.label}</span>
                    <span className="mt-0.5 block truncate font-medium">{a.value}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
                {a.label === 'Email' && <CopyEmail />}
              </motion.li>
            ))}

            <motion.li variants={fadeUp} className="rounded-3xl border border-dashed border-line p-5 text-sm leading-relaxed text-muted">
              Based in <span className="font-medium text-ink">{profile.location}</span> · open to relocation across India.
            </motion.li>
          </motion.ul>
        </div>
      </Container>
    </Page>
  )
}
