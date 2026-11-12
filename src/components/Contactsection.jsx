import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, MessageCircle, Phone, Send, Mail, MapPin, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/* Data: edit here, the UI follows                                             */
/* -------------------------------------------------------------------------- */

const CONTACT = {
  manager: "MrrFeenicks1",
  role: "General Portfolio Manager",
  whatsappLink: "https://wa.me/233545728382",
  phones: ["+233 54 572 8382", "+233 55 021 2623"],
  telegram: { label: "t.me/feebnb", href: "https://t.me/feebnb" },
  facebook: "Feenicks1 Solutions Ltd",
  email: "feenicks1solutionsltd@gmail.com",
  location: "Ridge, Accra",
};

const TOPICS = [
  "Choosing a portfolio",
  "Investing and deposits",
  "Withdrawals",
  "My existing account",
  "Partnerships",
  "Something else",
];

const CHANNELS = [
  ["whatsapp", "WhatsApp", "Fastest way to reach the manager"],
  ["phone", "Phone", "Call either number"],
  ["email", "Email", "For longer questions"],
];

/* -------------------------------------------------------------------------- */
/* Look & feel (same system as the portfolio section)                          */
/* -------------------------------------------------------------------------- */

const FF = { fontFamily: '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif' };
const FONT_CSS = "@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap');";
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const INPUT =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[#FFC629] focus:outline-none focus:ring-2 focus:ring-[#FFC629] aria-[invalid=true]:border-[#FF8A75] [&>option]:text-black";
const RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC629]";

const Grain = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
);

const Field = ({ label, id, error, children, className = "" }) => (
  <div className={className}>
    <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-white/70">{label}</label>
    {children}
    {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs text-[#FF8A75]">{error}</p>}
  </div>
);

const INIT = { name: "", phone: "", email: "", topic: "", channel: "whatsapp", message: "" };

const validate = (f) => {
  const e = {};
  if (f.name.trim().length < 2) e.name = "Enter your name.";
  if (f.phone.replace(/\D/g, "").length < 9) e.phone = "Enter a phone number we can reach you on.";
  if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Enter a valid email address, or leave it blank.";
  if (!f.topic) e.topic = "Choose what your question is about.";
  if (f.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  return e;
};

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Props (all optional):
 *  - onSubmit(payload): async handler for the enquiry. If omitted, the visitor
 *    sends it through a pre-filled WhatsApp message.
 */
const ContactSection = ({ onSubmit }) => {
  const rootRef = useRef(null);
  const formRef = useRef(null);
  const doneRef = useRef(null);
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // fromTo with explicit end values, so a re-run can never strand elements hidden
        gsap.timeline({ defaults: { ease: "power4.out" }, scrollTrigger: { trigger: "[data-header]", start: "top 85%", once: true } })
          .fromTo("[data-line]", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.12 })
          .fromTo("[data-head]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.6");
        gsap.fromTo("[data-channel]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: "[data-channels]", start: "top 85%", once: true } });
        gsap.fromTo("[data-card]", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: "[data-card]", start: "top 88%", once: true } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const field = (k) => ({
    id: k, name: k, value: form[k], onChange: set(k), className: INPUT,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  const message =
    `Hello ${CONTACT.manager}, I have an enquiry about: ${form.topic}.\n\n${form.message.trim()}\n\n` +
    `Name: ${form.name.trim()}\nPhone: ${form.phone.trim()}` +
    (form.email.trim() ? `\nEmail: ${form.email.trim()}` : "");
  const waHref = `${CONTACT.whatsappLink}?text=${encodeURIComponent(message)}`;

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) { formRef.current?.querySelector(`[name="${first}"]`)?.focus(); return; }
    setFailed(false);
    if (onSubmit) {
      setBusy(true);
      try { await onSubmit({ ...form }); }
      catch { setFailed(true); setBusy(false); return; }
      setBusy(false);
    }
    setSent(true);
    requestAnimationFrame(() => doneRef.current?.focus());
  };

  const reset = () => { setForm(INIT); setErrors({}); setSent(false); };

  const rows = {
    whatsapp: { href: CONTACT.whatsappLink, external: true, icon: MessageCircle, accent: "#FFC629", value: CONTACT.phones[0] },
    phone: { icon: Phone, accent: "#7FA8FF" },
    email: { href: `mailto:${CONTACT.email}`, icon: Mail, accent: "#FF6B52", value: CONTACT.email },
  };

  return (
    <section
      ref={rootRef} id="contact" aria-labelledby="contact-heading" style={FF}
      className="relative overflow-x-clip bg-[#070B14] py-20 text-white sm:py-28"
    >
      <style>{FONT_CSS}</style>
      <Grain />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]" style={{ background: "radial-gradient(60% 70% at 30% 0%, rgba(255,198,41,0.16), transparent 70%), radial-gradient(40% 50% at 100% 25%, rgba(255,107,82,0.12), transparent 70%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55))" }} />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div data-header>
          <p data-head className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[#FFC629] backdrop-blur">
            Enquiries
          </p>
          <h2 id="contact-heading" className="mt-6 text-[clamp(2.6rem,8vw,5.75rem)] font-extrabold leading-[0.95] tracking-tight">
            {["Have a question?", "Ask us directly."].map((l) => (
              <span key={l} className="block overflow-hidden pb-[0.08em]"><span data-line className="block">{l}</span></span>
            ))}
          </h2>
          <p data-head className="mt-6 max-w-lg text-lg text-white/65">
            Send your enquiry and {CONTACT.manager}, our {CONTACT.role}, will reply on the channel you choose. You can also reach us directly.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          {/* Channels */}
          <div data-channels>
            <h3 className="text-sm font-bold text-white/55">Reach us directly</h3>
            <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
              {CHANNELS.map(([key, label, hint]) => {
                const r = rows[key];
                const Icon = r.icon;
                const inner = (
                  <>
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)" }} />
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--accent)] text-[var(--accent)]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                    <span className="relative min-w-0 flex-1">
                      <span className="block text-lg font-bold">{label}</span>
                      <span className="block text-sm text-white/55">{hint}</span>
                      {key === "phone"
                        ? <span className="mt-1 flex flex-wrap gap-x-4 text-sm">{CONTACT.phones.map((p) => (
                            <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className={`relative font-semibold text-[var(--accent)] hover:underline ${RING}`}>{p}</a>
                          ))}</span>
                        : <span className="mt-1 block break-all text-sm font-semibold text-[var(--accent)]">{r.value}</span>}
                    </span>
                  </>
                );
                const cls = "group relative flex items-center gap-4 overflow-hidden px-2 py-5 sm:px-3";
                return (
                  <li key={key} data-channel style={{ "--accent": r.accent }}>
                    {r.href ? (
                      <a href={r.href} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} onPointerMove={spot} className={`${cls} ${RING} focus-visible:-outline-offset-2`}>
                        {inner}
                        {r.external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    ) : (
                      <div onPointerMove={spot} className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <ul className="mt-6 space-y-3 text-sm text-white/65">
              <li className="flex items-center gap-3"><Send className="h-4 w-4 shrink-0 text-white/45" aria-hidden="true" /><a href={CONTACT.telegram.href} target="_blank" rel="noopener noreferrer" className={`hover:text-white ${RING}`}>Telegram: {CONTACT.telegram.label}</a></li>
              <li className="flex items-center gap-3"><Users className="h-4 w-4 shrink-0 text-white/45" aria-hidden="true" />Facebook: {CONTACT.facebook}</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0 text-white/45" aria-hidden="true" />{CONTACT.location}</li>
            </ul>
          </div>

          {/* Enquiry form */}
          <div data-card className="relative overflow-hidden rounded-[2rem] border border-white/10 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:p-8" style={{ background: "radial-gradient(90% 60% at 0% 0%, rgba(255,198,41,0.12), transparent 65%), #0D1424" }}>
            <Grain />
            <div className="relative">
              {sent ? (
                <div className="space-y-6" role="status">
                  <h3 ref={doneRef} tabIndex={-1} className="text-3xl font-extrabold outline-none sm:text-4xl">
                    {onSubmit ? "Message received" : "Your enquiry is ready"}
                  </h3>
                  <p className="flex items-start gap-3 text-base text-white/75">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFC629] text-[#070B14]"><Check className="h-4 w-4" aria-hidden="true" /></span>
                    {onSubmit
                      ? `Thanks, ${form.name.trim().split(" ")[0]}. ${CONTACT.manager} will reply on ${form.channel === "email" ? "email" : form.channel === "phone" ? "your phone" : "WhatsApp"}.`
                      : `Send it to ${CONTACT.manager} on WhatsApp to complete your enquiry. Nothing has been sent yet.`}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FFC629] px-6 py-3.5 text-sm font-extrabold text-[#070B14] ${RING}`}>
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {onSubmit ? "Also message on WhatsApp" : "Send on WhatsApp"}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <button type="button" onClick={reset} className={`rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold hover:bg-white/10 ${RING}`}>Ask another question</button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={submit} noValidate className="space-y-4">
                  <h3 className="text-2xl font-extrabold sm:text-3xl">Send an enquiry</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Full name" error={errors.name} className="sm:col-span-2">
                      <input {...field("name")} autoComplete="name" placeholder="Ama Mensah" />
                    </Field>
                    <Field id="phone" label="Phone (WhatsApp)" error={errors.phone}>
                      <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+233 5X XXX XXXX" />
                    </Field>
                    <Field id="email" label="Email (optional)" error={errors.email}>
                      <input {...field("email")} type="email" autoComplete="email" placeholder="you@example.com" />
                    </Field>
                    <Field id="topic" label="Your question is about" error={errors.topic} className="sm:col-span-2">
                      <select {...field("topic")}>
                        <option value="">Select a topic</option>
                        {TOPICS.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                  </div>

                  <fieldset>
                    <legend className="mb-1.5 text-xs font-semibold text-white/70">Reply to me by</legend>
                    <div className="grid grid-cols-3 gap-2">
                      {[["whatsapp", "WhatsApp"], ["phone", "Call"], ["email", "Email"]].map(([v, l]) => (
                        <label key={v} className="block cursor-pointer">
                          <input type="radio" name="channel" value={v} checked={form.channel === v} onChange={set("channel")} className="peer sr-only" />
                          <span className="block rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-center text-sm text-white/70 transition-colors peer-checked:border-[#FFC629] peer-checked:bg-white/10 peer-checked:font-bold peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#FFC629]">{l}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <Field id="message" label="Your message" error={errors.message}>
                    <textarea {...field("message")} rows={5} placeholder="Tell us what you’d like to know." className={`${INPUT} resize-y`} />
                  </Field>

                  {failed && <p role="alert" className="text-sm text-[#FF8A75]">We couldn’t send your enquiry. Check your connection and try again.</p>}

                  <button type="submit" disabled={busy} className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC629] px-6 py-3.5 text-sm font-extrabold text-[#070B14] transition-transform hover:-translate-y-0.5 disabled:opacity-60 ${RING}`}>
                    {busy ? "Sending…" : <>Send enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;