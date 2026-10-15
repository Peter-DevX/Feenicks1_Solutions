// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // ---------- Tunable motion values ----------
// const MOTION = {
//   desktop: 1024, // px: pinned zoom at/above, stacked static layout below
//   end: "+=150%", // scroll distance (1.5 screens) the hero stays pinned
//   scrub: 0.6, // seconds of smoothing between scroll and animation
//   fadeX: -80, // px the left column drifts while fading
//   intro: { y: 30, duration: 0.9, stagger: 0.1 }, // on-load rise
// };

// // ---------- Content (from the company brief) ----------
// const STEPS = [
//   { label: "Enquiry", state: "done" },
//   { label: "Eligibility and verification", state: "done" },
//   { label: "Approved agreement", state: "current" },
//   { label: "Recorded funding", state: "todo" },
//   { label: "Portfolio record", state: "todo" },
//   { label: "Monthly reporting", state: "todo" },
// ];
// const PRINCIPLES = ["Security", "Transparent reporting", "Client support", "Operational discipline"];
// const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink";

// export default function Hero() {
//   const root = useRef(null); // pinned <section>
//   const copy = useRef(null); // left column that fades out
//   const panel = useRef(null); // right panel that scales up

//   useLayoutEffect(() => {
//     const q = gsap.utils.selector(root);
//     const mm = gsap.matchMedia();

//     // Named conditions: one callback, and we read which ones are true.
//     mm.add(
//       {
//         motion: "(prefers-reduced-motion: no-preference)",
//         desktop: `(min-width: ${MOTION.desktop}px)`,
//       },
//       (ctx) => {
//         const { motion, desktop } = ctx.conditions;
//         if (!motion) return; // reduced motion: fully static page

//         // On load (all screen sizes): left column items rise in, staggered.
//         gsap.from(q("[data-in]"), {
//           opacity: 0,
//           y: MOTION.intro.y,
//           duration: MOTION.intro.duration,
//           stagger: MOTION.intro.stagger,
//           ease: "power3.out",
//         });

//         if (!desktop) return; // below lg: no pin, no zoom

//         // Scroll scene: pin + scrub + scale the panel to cover the viewport.
//         gsap
//           .timeline({
//             defaults: { ease: "none" },
//             scrollTrigger: {
//               trigger: root.current,
//               start: "top top",
//               end: MOTION.end,
//               scrub: MOTION.scrub,
//               pin: true,
//               anticipatePin: 1,
//               invalidateOnRefresh: true, // re-run function values on resize
//             },
//           })
//           .to(
//             panel.current,
//             {
//               // Scale needed for the panel to reach every edge of the viewport.
//               scale: () =>
//                 Math.max(
//                   window.innerWidth / panel.current.offsetWidth,
//                   window.innerHeight / panel.current.offsetHeight
//                 ),
//               borderRadius: 0, // square corners once it fills the screen
//             },
//             0
//           )
//           .to(copy.current, { opacity: 0, x: MOTION.fadeX }, 0); // in parallel
//       },
//       root
//     );

//     return () => mm.revert();
//   }, []);

//   return (
//     <>
//       <section
//         ref={root}
//         className="relative overflow-hidden bg-white text-ink lg:h-svh"
//       >
//         {/* ---------- Left column ---------- */}
//         <div
//           ref={copy}
//           className="relative z-10 flex flex-col justify-center px-[5vw] pb-10 pt-32 lg:absolute lg:inset-0 lg:pb-0 lg:pt-0"
//         >
//           <header className="absolute left-[5vw] right-[5vw] top-8 flex items-center justify-between">
//             <a href="/" className={`flex items-center gap-3 ${focus}`}>
//               <span className="grid size-9 place-items-center rounded-lg bg-ink font-display text-sm text-brass">F1</span>
//               <span className="text-sm font-semibold leading-tight">
//                 Feenicks1
//                 <br />
//                 <span className="font-normal text-ink/60">Solutions Ltd</span>
//               </span>
//             </a>
//             <nav aria-label="Primary" className="hidden gap-8 text-sm sm:flex">
//               {[["Services", "/services"], ["About", "/about"], ["Contact", "/contact"]].map(([l, h]) => (
//                 <a key={l} href={h} className={`hover:underline ${focus}`}>{l}</a>
//               ))}
//             </nav>
//           </header>

//           <div className="max-w-xl lg:max-w-[44vw]">
//             <span data-in className="mb-6 inline-block rounded-full border border-ink/60 px-4 py-1 text-xs">
//               Financial services
//             </span>
//             <h1
//               data-in
//               className="font-display text-[clamp(2.8rem,5.4vw,5.2rem)] font-normal leading-[1.02] tracking-tight"
//             >
//               Your Trust, Our Priority.
//             </h1>
//             <p data-in className="mt-5 max-w-md text-lg leading-snug text-ink/75">
//               A technology-enabled business ecosystem for financial services, built on clear records, defined
//               processes and transparent reporting.
//             </p>
//             <a
//               data-in
//               href="/services"
//               className={`mt-8 inline-flex items-center gap-2 border-t border-ink/30 pt-4 text-sm font-medium hover:gap-3 ${focus}`}
//             >
//               Explore services <span aria-hidden="true">→</span>
//             </a>
//           </div>
//         </div>

//         {/* ---------- Stage: pins the panel to the right edge ---------- */}
//         <div className="relative z-20 mt-10 flex justify-end lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:items-center">
//           <div
//             ref={panel}
//             role="img"
//             aria-label="Preview of the Feenicks1 platform showing a portfolio record, monthly reporting and the client journey"
//             className="relative h-[26rem] w-[92%] origin-right overflow-hidden rounded-l-[2.5rem] bg-[radial-gradient(60%_80%_at_75%_20%,rgba(255,255,255,0.7)_0%,transparent_65%),linear-gradient(160deg,#cdebc8,#9bd09a)] text-[clamp(9px,2.4vw,14px)] will-change-transform sm:h-[30rem] lg:pointer-events-auto lg:h-[72svh] lg:w-[56vw] lg:text-[clamp(8px,0.78vw,14px)]"
//           >
//             {/* Everything inside is sized in em: the --spacing override makes p-4, gap-3 etc. scale with font-size. */}
//             <div
//               aria-hidden="true"
//               className="absolute bottom-0 left-[9%] right-0 top-[22%] flex flex-col rounded-tl-[1.6em] bg-paper text-ink shadow-[0_2em_6em_rgba(0,0,0,0.5)] [--spacing:0.25em]"
//             >
//               <div className="flex items-center gap-6 border-b border-ink/10 px-8 py-4 text-[0.9em]">
//                 <b className="mr-2 font-display text-[1.5em] font-semibold">F1 CAPITAL</b>
//                 {["Portfolio", "Reports", "Services", "Support"].map((t) => (
//                   <span key={t} className="hidden md:inline">{t}</span>
//                 ))}
//                 <span className="ml-auto rounded-full bg-ink px-4 py-2 text-white">Platform preview</span>
//               </div>

//               <div className="grid flex-1 grid-cols-1 gap-8 px-8 pt-8 md:grid-cols-2">
//                 <div className="flex flex-col">
//                   <h2 className="font-display text-[2.1em] leading-[1.08]">Clear records. Transparent reporting.</h2>
//                   <p className="mt-3 leading-snug text-ink/70">
//                     Portfolio information and investor reporting, built around defined processes.
//                   </p>
//                   <div className="mt-5 flex gap-3 text-[0.9em]">
//                     <span className="rounded-full bg-ink px-5 py-3 text-white">Explore services</span>
//                     <span className="rounded-full bg-ink/10 px-5 py-3">Meet F1 CAPITAL</span>
//                   </div>
//                   <div className="mb-8 mt-auto flex h-28 w-60 flex-col justify-between rounded-[1em] bg-linear-to-br from-panel to-ink p-5 text-white shadow-[0_1.5em_3em_rgba(0,0,0,0.3)]">
//                     <span className="font-display text-[1.1em] text-brass">F1</span>
//                     <div>
//                       <p className="font-display text-[1.15em] italic">Your Trust, Our Priority!</p>
//                       <p className="mt-1 text-[0.7em] text-mist">Feenicks1 Solutions Ltd</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="hidden flex-col gap-4 md:flex">
//                   <div className="rounded-[1em] bg-white p-5 shadow-[0_1em_3em_rgba(9,9,10,0.12)]">
//                     <p className="text-[0.8em] text-ink/60">Portfolio record</p>
//                     <p className="font-display text-[2em] leading-tight">0,000.00</p>
//                     <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="h-12 w-full" aria-hidden="true">
//                       <polyline
//                         points="0,32 25,28 50,30 75,20 100,23 125,14 150,17 175,8 200,5"
//                         fill="none"
//                         stroke="#c9a45c"
//                         strokeWidth="2"
//                       />
//                     </svg>
//                     <p className="text-[0.75em] text-ink/60">Monthly report · illustrative, not real data</p>
//                   </div>

//                   <div className="rounded-[1em] bg-white p-5 shadow-[0_1em_3em_rgba(9,9,10,0.12)]">
//                     <p className="mb-2 text-[0.8em] text-ink/60">Your journey</p>
//                     <ol className="text-[0.85em]">
//                       {STEPS.map((s) => (
//                         <li key={s.label} className="flex items-center gap-3 py-1">
//                           <span
//                             className={`size-3 shrink-0 rounded-full ${
//                               s.state === "done"
//                                 ? "bg-ink"
//                                 : s.state === "current"
//                                 ? "bg-brass ring-4 ring-brass/30"
//                                 : "border border-ink/30"
//                             }`}
//                           />
//                           <span className={s.state === "todo" ? "text-ink/60" : ""}>{s.label}</span>
//                         </li>
//                       ))}
//                     </ol>
//                   </div>
//                 </div>
//               </div>

//               <div className="hidden items-center gap-8 border-t border-ink/10 px-8 py-4 md:flex">
//                 <small className="max-w-[9em] text-[0.8em] leading-tight text-ink/60">Built on four principles</small>
//                 <ul className="flex flex-wrap gap-x-6 font-display text-[1.2em]">
//                   {PRINCIPLES.map((p) => (
//                     <li key={p}>{p}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }







import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Portfolio from "./Portfolio";

gsap.registerPlugin(ScrollTrigger);

const portfolios = [
  {
    audience: "Student",
    code: "SMFC",
    name: "Mutual Fund Capital",
    description: "Entry-level, diversified managed portfolio",
    amount: "GHS 150 – 499.99",
    cycle: "28-day cycle",
    color: "amber",
    icon: "✦",
  },
  {
    audience: "Investor",
    code: "SIC",
    name: "Investwise Capital",
    description: "Broader market exposure for growing capital",
    amount: "GHS 500 – 4,999.99",
    cycle: "28-day cycle",
    color: "blue",
    icon: "↗",
  },
  {
    audience: "Agribusiness",
    code: "SABC",
    name: "Agribusiness Capital",
    description: "Participation in licensed agribusiness firms",
    amount: "GHS 5,000 – 9,999.99",
    cycle: "3-month cycle",
    color: "green",
    icon: "✳",
  },
  {
    audience: "Business Owner",
    code: "SREPF",
    name: "Real Estate Pool Fund",
    description: "Pooled real-estate participation",
    amount: "GHS 10,000 – 100,000",
    cycle: "6-month cycle",
    color: "red",
    icon: "⌂",
  },
];

const colorStyles = {
  amber: {
    card: "border-amber-200 bg-amber-50/50",
    icon: "bg-amber-400 text-slate-950",
    tag: "bg-amber-100 text-amber-950",
    button: "bg-amber-400 hover:bg-amber-300",
  },
  blue: {
    card: "border-blue-200 bg-blue-50/50",
    icon: "bg-blue-600 text-white",
    tag: "bg-blue-100 text-blue-900",
    button: "bg-blue-600 hover:bg-blue-500 text-white",
  },
  green: {
    card: "border-emerald-200 bg-emerald-50/50",
    icon: "bg-emerald-600 text-white",
    tag: "bg-emerald-100 text-emerald-900",
    button: "bg-emerald-600 hover:bg-emerald-500 text-white",
  },
  red: {
    card: "border-red-200 bg-red-50/50",
    icon: "bg-red-500 text-white",
    tag: "bg-red-100 text-red-900",
    button: "bg-red-500 hover:bg-red-400 text-white",
  },
};

const features = [
  {
    icon: "◇",
    title: "Secure & Transparent",
    description: "Clear processes and reporting.",
  },
  {
    icon: "↗",
    title: "Flexible Cycles",
    description: "Explore available investment terms.",
  },
  {
    icon: "◎",
    title: "Expert Guidance",
    description: "Support throughout your journey.",
  },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.from("[data-reveal]", {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
          });

          gsap.from(".portfolio-card", {
            opacity: 0,
            y: 20,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".portfolio-list",
              start: "top 85%",
            },
          });
        }
      );

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  const whatsapp =
    "https://wa.me/233545728382?text=" +
    encodeURIComponent(
      "Hello F1 Capital, I would like to learn more about your portfolio options."
    );

  return (
    <main
      ref={root}
      className="min-h-screen overflow-hidden bg-white text-[#101f3d]"
    >
      {/* Navigation */}
      <header className="relative z-20 mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-12">
        <a href="/" className="flex shrink-0 items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#101f3d] text-lg font-black text-white shadow-lg">
            F1
          </span>

          <span>
            <span className="block text-lg font-black tracking-tight sm:text-xl">
              F1 CAPITAL
            </span>
            <span className="block text-xs text-slate-500 sm:text-sm">
              Feenicks1 Solutions Ltd
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#home" className="text-blue-600">Home</a>
          {/* <a href="#about" className="transition hover:text-blue-600">
            About
          </a> */}
          <a href="#portfolio" className="transition hover:text-blue-600">
            Portfolio
          </a>
          <a href="#why-us" className="transition hover:text-blue-600">
            Why Us
          </a>
          <a href="#contact" className="transition hover:text-blue-600">
            Contact
          </a>
        </nav>

        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:px-6"
        >
          <span className="hidden sm:inline">Chat on WhatsApp ↗</span>
          <span className="sm:hidden">WhatsApp ↗</span>
        </a>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-14 pt-8 sm:px-8 lg:min-h-[530px] lg:grid-cols-2 lg:px-12 lg:pb-16 lg:pt-10"
      >
        <div className="relative z-10" data-reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-blue-700">
            Smart investments <span>•</span> Real growth
          </span>

          <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Which F1 CAPITAL portfolio fits{" "}
            <span className="relative inline-block text-blue-600">
              your goals?
              <span className="absolute -bottom-1 left-0 h-1.5 w-2/3 -rotate-2 rounded-full bg-amber-400" />
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
            A structured guide to portfolio options for students, investors,
            and business owners. Find an option that aligns with your goals.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {[
              ["Student", "bg-amber-400 text-slate-950"],
              ["Investor", "bg-[#101f3d] text-white"],
              ["Business Owner", "bg-blue-50 text-blue-800"],
            ].map(([label, style]) => (
              <a
                key={label}
                href="#portfolio"
                className={`rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-1 ${style}`}
              >
                {label} ↗
              </a>
            ))}
          </div>

          <a
            href="#portfolio"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#101f3d] px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Explore portfolios <span>→</span>
          </a>
        </div>

        {/* Replace this image with your uploaded image */}
        <div
          data-reveal
          className="relative min-w-0"
        >
          <div className="absolute -right-5 -top-5 size-40 rounded-full bg-amber-200/70 blur-3xl" />
          <div className="absolute -bottom-5 -left-5 size-40 rounded-full bg-blue-200/70 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
            <img
              src="hero-img.png"
              alt="F1 Capital investment consultation"
              className="aspect-[4/3] w-full object-cover lg:aspect-[1.08/1]"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#101f3d]/90 via-[#101f3d]/30 to-transparent p-6 pt-20 sm:p-8 sm:pt-24">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                F1 Capital
              </span>
              <p className="mt-2 max-w-sm text-2xl font-bold text-white sm:text-3xl">
                Plan with purpose. Build with confidence.
              </p>
            </div>
          </div>

          {/* <div className="absolute -bottom-5 left-4 rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-xl backdrop-blur sm:left-8">
            <p className="text-xs text-slate-500">Your next step</p>
            <p className="mt-1 font-bold">Explore your options ↗</p>
          </div> */}
        </div>
      </section>

      {/* About */}



      {/* Portfolio options */}
     <Portfolio />

      {/* Benefits */}
      <section
        id="why-us"
        className="mx-auto grid max-w-[1440px] m-5 gap-4 px-5 pb-16 sm:grid-cols-3 sm:px-8 lg:px-12"
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-5"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-2xl font-bold text-blue-700 shadow-sm">
              {feature.icon}
            </span>
            <div>
              <h3 className="font-bold">{feature.title}</h3>
              <p className="mt-1 text-sm text-slate-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>

       

      {/* Footer */}
      <footer className="bg-[#08152a] px-5 py-8 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white text-lg font-black text-[#101f3d]">
              F1
            </span>
            <span>
              <span className="block font-bold">F1 CAPITAL</span>
              <span className="text-xs text-slate-400">Feenicks1 Solutions Ltd</span>
            </span>
          </a>

          <nav className="flex flex-wrap gap-5 text-sm text-slate-300">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#portfolio" className="hover:text-white">Portfolio</a>
            <a href="#why-us" className="hover:text-white">Why Us</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>

        <div className="mx-auto mt-7 max-w-[1360px] border-t border-white/10 pt-5 text-xs leading-6 text-slate-400">
          Investments are subject to market risk. Returns are not guaranteed.
          Past performance does not indicate future results. Review all
          portfolio terms and related documents carefully before investing.
          <p className="mt-2">© {new Date().getFullYear()} F1 Capital. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
