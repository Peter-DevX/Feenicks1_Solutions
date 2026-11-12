import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Pause, Play, Layers, Wallet, Zap, Sprout, Building2, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/* Data: edit here, the UI follows                                             */
/* `icon` can be a lucide component or a plain string/emoji, as before.        */
/* -------------------------------------------------------------------------- */

const DEFAULT_FEATURES = [
  { icon: Layers, title: "A portfolio for every stage", description: "Student, investor and business-owner portfolios, each with a clear range and cycle." },
  { icon: Wallet, title: "Start from GHS 150", description: "Begin small and move up to larger portfolios as your capital grows." },
  { icon: Zap, title: "Flexible withdrawals", description: "Standard cycles with Express Withdrawal, or lock your capital for 6 months or more." },
  { icon: Sprout, title: "Agribusiness exposure", description: "Take part in licensed agribusiness firms through Agribusiness Capital." },
  { icon: Building2, title: "Real estate, hands-off", description: "Join a pooled real-estate fund with no property management on your side." },
  { icon: MessageCircle, title: "A manager you can message", description: "Ask the General Portfolio Manager directly on WhatsApp, before and after you invest." },
];

// Figures come from the portfolio data. Update them if your terms change.
const STATS = [
  ["GHS 150", "Lowest starting amount"],
  ["28 days", "Shortest cycle"],
  ["6 months", "Minimum for locked terms"],
  ["3", "Audiences, one structured guide"],
];

const RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Props (all optional):
 *  - videoSrc: URL of the background video (mp4/webm). Keep it short, muted and under ~5 MB.
 *  - videoPoster: still image shown before the video loads and for reduced-motion visitors
 *  - features: array of { icon, title, description }
 */
const Benefits = ({ videoSrc, videoPoster, features = DEFAULT_FEATURES }) => {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Autoplay only for visitors who have not asked for reduced motion
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); setPlaying(false); return; }
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [videoSrc]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // fromTo with explicit end values so a re-run can never strand elements hidden
        gsap.fromTo("[data-head]", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: "[data-header]", start: "top 85%", once: true } });
        gsap.fromTo("[data-feature]", { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: "[data-grid]", start: "top 85%", once: true } });
        gsap.fromTo("[data-stat]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", scrollTrigger: { trigger: "[data-stats]", start: "top 92%", once: true } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef} id="why-us" aria-labelledby="why-heading"
      className="relative isolate overflow-hidden bg-slate-950 py-20 text-white sm:py-28"
    >
      {/* Background video (decorative) */}
      {videoSrc && (
        <video
          ref={videoRef} src={videoSrc} poster={videoPoster}
          muted loop playsInline preload="metadata" disablePictureInPicture
          aria-hidden="true" tabIndex={-1}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}
      {/* Blue tint keeps text readable over any footage */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-white-850/80 via-blue-950/70 to-slate-950/90" />
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(29,78,216,0.35), transparent 70%)" }} />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div data-header className="max-w-3xl">
          <p data-head className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            Why F1 Capital
          </p>
          <h2 id="why-heading" data-head className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Investing that fits where you are right now.
          </h2>
          <p data-head className="mt-6 max-w-2xl text-lg text-slate-200">
            Whether you’re a student making a first move or a business owner putting capital to work, you get clear ranges, clear cycles and a real person to talk to.
          </p>
          <div data-head className="mt-8 flex flex-wrap gap-3">
            <a href="#portfolio" className={`inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-600 ${RING}`}>
              Explore portfolios <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" className={`inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-bold transition-colors hover:bg-white/10 ${RING}`}>
              Talk to us
            </a>
          </div>
        </div>

        {/* Features */}
        <ul data-grid className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <li
                key={feature.title} data-feature
                className="flex items-start gap-4 rounded-2xl border border-white/60 bg-white/90 p-5 text-slate-900 shadow-[0_20px_50px_-25px_rgba(2,6,23,0.8)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-700 text-2xl font-bold text-white shadow-sm">
                  {typeof Icon === "string" ? Icon : <Icon className="size-5" aria-hidden="true" />}
                </span>
                <div>
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{feature.description}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Key figures */}
        <dl data-stats className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/20 bg-white/20 lg:grid-cols-4">
          {STATS.map(([value, label]) => (
            <div key={label} data-stat className="bg-slate-950/60 p-5 backdrop-blur sm:p-6">
              <dd className="text-3xl font-extrabold sm:text-4xl">{value}</dd>
              <dt className="mt-1 text-sm text-slate-300">{label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Pause control, so the moving background never can't be stopped */}
      {videoSrc && (
        <button
          type="button" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}
          className={`absolute bottom-4 right-4 grid size-10 place-items-center rounded-full border border-white/30 bg-slate-950/60 backdrop-blur transition-colors hover:bg-slate-950/80 sm:bottom-6 sm:right-6 ${RING}`}
        >
          {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
        </button>
      )}
    </section>
  );
};

export default Benefits;