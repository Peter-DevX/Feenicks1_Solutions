// import { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowRight } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// /* -------------------------------------------------------------------------- */
// /* Data: edit here, the UI follows                                             */
// /* -------------------------------------------------------------------------- */

// const SEGMENTS = [
//   {
//     id: "student",
//     number: "01",
//     label: "Student",
//     tagline: "Start small. Build the habit.",
//     tone: "gold",
//     portfolios: [
//       {
//         ticker: "$MFC",
//         name: "Mutual Fund Capital",
//         description: "Entry-level, diversified managed portfolio",
//         range: "GHS 150 – 499.99",
//         cycle: "28-day cycle",
//       },
//     ],
//   },
//   {
//     id: "investor",
//     number: "02",
//     label: "Investor",
//     tagline: "Scale with structure.",
//     tone: "navy",
//     portfolios: [
//       {
//         ticker: "$IC",
//         name: "Investwise Capital",
//         description: "Broader market exposure for growing capital",
//         range: "GHS 500 – 4,999.99",
//         cycle: "28-day cycle",
//       },
//       {
//         ticker: "$ABC",
//         name: "Agribusiness Capital",
//         description: "Participation in licensed agribusiness firms",
//         range: "GHS 5,000 – 9,999.99",
//         cycle: "3-month cycle",
//       },
//     ],
//   },
//   {
//     id: "business-owner",
//     number: "03",
//     label: "Business Owner",
//     tagline: "Put capital to work.",
//     tone: "coral",
//     portfolios: [
//       {
//         ticker: "$REPF",
//         name: "Real Estate Pool Fund",
//         description: "Pooled real-estate participation, no property management",
//         range: "GHS 10,000 – 100,000",
//         cycle: "6-month cycle",
//       },
//     ],
//   },
// ];

// const WITHDRAWAL_TERMS = [
//   { label: "Standard", text: "Fixed cycles with Express Withdrawal" },
//   { label: "Locked", text: "Your chosen duration, minimum 6 months" },
// ];

// const CONTACT = {
//   manager: "MrrFeenicks1",
//   role: "General Portfolio Manager",
//   whatsappLink: "https://wa.me/233545728382",
//   phones: ["+233 54 572 8382", "+233 55 021 2623"],
//   telegram: { label: "t.me/feebnb", href: "https://t.me/feebnb" },
//   facebook: "Feenicks1 Solutions Ltd",
//   email: "feenicks1solutionsltd@gmail.com",
//   location: "Ridge, Accra",
// };

// /* Tailwind needs full class strings, so tones are mapped, not interpolated. */
// const TONES = {
//   gold: {
//     tile: "bg-[#FFC629] text-[#0B1B3A]",
//     ticker: "bg-[#FFC629] text-[#0B1B3A]",
//     price: "bg-[#FFF1C9] text-[#0B1B3A]",
//   },
//   navy: {
//     tile: "bg-[#0B1B3A] text-white",
//     ticker: "bg-[#0B1B3A] text-white",
//     price: "bg-[#DDE8FB] text-[#0B1B3A]",
//   },
//   coral: {
//     tile: "bg-[#DC4A34] text-white",
//     ticker: "bg-[#DC4A34] text-white",
//     price: "bg-[#FDE3DE] text-[#0B1B3A]",
//   },
// };

// /* -------------------------------------------------------------------------- */
// /* Component                                                                   */
// /* -------------------------------------------------------------------------- */

// /**
//  * Props (all optional):
//  *  - heroImage: illustration shown beside the heading
//  *  - heroImageAlt: alt text for the illustration
//  *  - guideLabel: text for the top pill
//  */
// const PortfolioSection = ({
//   heroImage,
//   heroImageAlt = "",
//   guideLabel = "Portfolio guide | Oct 2026",
// }) => {
//   const rootRef = useRef(null);

//   useLayoutEffect(() => {
//     if (!rootRef.current) return;

//     const ctx = gsap.context(() => {
//       const mm = gsap.matchMedia();

//       // Motion only runs when the visitor has not asked for reduced motion.
//       mm.add("(prefers-reduced-motion: no-preference)", () => {
//         // 1. Heading block
//         gsap.from("[data-head]", {
//           y: 24,
//           opacity: 0,
//           duration: 0.7,
//           ease: "power3.out",
//           stagger: 0.12,
//           scrollTrigger: { trigger: "[data-header]", start: "top 85%", once: true },
//         });

//         // 2. Each audience row: tile slides in, portfolio cards follow, prices pop
//         gsap.utils.toArray("[data-row]").forEach((row) => {
//           const tl = gsap.timeline({
//             defaults: { ease: "power3.out" },
//             scrollTrigger: { trigger: row, start: "top 85%", once: true },
//           });

//           tl.from(row.querySelector("[data-tile]"), { x: -48, opacity: 0, duration: 0.7 })
//             .from(
//               row.querySelectorAll("[data-item]"),
//               { x: 48, opacity: 0, duration: 0.6, stagger: 0.12 },
//               "<0.1"
//             )
//             .from(
//               row.querySelectorAll("[data-price]"),
//               { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)", stagger: 0.12 },
//               "-=0.4"
//             );
//         });

//         // 3. Terms and call to action
//         gsap.from("[data-terms]", {
//           y: 16,
//           opacity: 0,
//           duration: 0.5,
//           stagger: 0.1,
//           ease: "power2.out",
//           scrollTrigger: { trigger: "[data-terms]", start: "top 95%", once: true },
//         });

//         gsap.from("[data-cta]", {
//           y: 40,
//           opacity: 0,
//           duration: 0.8,
//           ease: "power3.out",
//           scrollTrigger: { trigger: "[data-cta]", start: "top 90%", once: true },
//         });
//       });
//     }, rootRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={rootRef}
//       id="portfolio"
//       aria-labelledby="portfolio-heading"
//       className="relative overflow-x-clip bg-[#FDF8F1] py-16 sm:py-24"
//     >
//       {/* soft background shapes */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FFE9A8]/60 blur-2xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -left-20 top-72 h-56 w-56 rounded-full bg-[#F9D9D2]/60 blur-2xl"
//       />

//       <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
//         {/* Header */}
//         <div
//           data-header
//           className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]"
//         >
//           <div>
//             <p
//               data-head
//               className="inline-block rounded-full border border-[#B8860B] px-4 py-1.5 text-xs font-semibold text-[#8A6508]"
//             >
//               {guideLabel}
//             </p>

//             <h2
//               id="portfolio-heading"
//               data-head
//               className="mt-5 text-4xl font-extrabold text-[#0B1B3A] sm:text-5xl inline-block"
//             >
//               Which F1 Capital portfolio fits{" "}
              
//             </h2>

//             <p data-head className="mt-5 max-w-md text-lg text-[#46506A]">
//               A structured guide for students, investors and business owners.
//             </p>

//             <ul data-head className="mt-6 flex flex-wrap gap-2">
//               {SEGMENTS.map((s) => (
//                 <li key={s.id}>
//                   <a
//                     href={`#${s.id}`}
//                     className={`inline-block rounded-full px-4 py-1.5 text-sm font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1B3A] ${TONES[s.tone].ticker}`}
//                   >
//                     {s.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {heroImage && (
//             <div
//               data-head
//               className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_20px_50px_-20px_rgba(11,27,58,0.35)]"
//             >
//               <img
//                 src={heroImage}
//                 alt={heroImageAlt}
//                 loading="lazy"
//                 className="h-full w-full rounded-[1.5rem] object-cover"
//               />
//             </div>
//           )}
//         </div>

//         {/* Audience rows */}
//         <div className="mt-12 space-y-4">
//           {SEGMENTS.map((segment) => {
//             const tone = TONES[segment.tone];
//             return (
//               <div
//                 key={segment.id}
//                 id={segment.id}
//                 data-row
//                 className="grid scroll-mt-24 gap-3 md:grid-cols-[220px_1fr]"
//               >
//                 {/* Audience tile */}
//                 <div
//                   data-tile
//                   className={`flex flex-col justify-between rounded-3xl p-5 md:min-h-[8.5rem] ${tone.tile}`}
//                 >
//                   <span className="w-fit rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-[#0B1B3A]">
//                     {segment.number}
//                   </span>
//                   <div className="mt-4">
//                     <h3 className="text-xl font-extrabold leading-tight">
//                       {segment.label}
//                     </h3>
//                     <p className="mt-1 text-sm opacity-80">{segment.tagline}</p>
//                   </div>
//                 </div>

//                 {/* Portfolios */}
//                 <div className="divide-y divide-[#EFE7DA] overflow-hidden rounded-3xl bg-white shadow-[0_12px_30px_-18px_rgba(11,27,58,0.3)]">
//                   {segment.portfolios.map((p) => (
//                     <article
//                       key={p.ticker}
//                       data-item
//                       className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-4 sm:px-7 sm:py-5"
//                     >
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-bold ${tone.ticker}`}
//                         >
//                           {p.ticker}
//                         </span>
//                         <h4 className="text-lg font-extrabold text-[#0B1B3A] sm:text-xl">
//                           {p.name}
//                         </h4>
//                       </div>

//                       <span
//                         data-price
//                         className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-extrabold sm:text-base ${tone.price}`}
//                       >
//                         {p.range}
//                       </span>

//                       <p className="text-sm text-[#46506A] sm:text-base">
//                         {p.description}
//                       </p>

//                       <span className="whitespace-nowrap rounded-full border border-[#E4DACB] px-3 py-1 text-xs text-[#5B6478]">
//                         {p.cycle}
//                       </span>
//                     </article>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Withdrawal terms */}
//         <ul className="mt-6 flex flex-wrap justify-center gap-3">
//           {WITHDRAWAL_TERMS.map((t) => (
//             <li
//               key={t.label}
//               data-terms
//               className="rounded-full border border-[#E4DACB] bg-white px-4 py-2 text-xs text-[#46506A] sm:text-sm"
//             >
//               <strong className="mr-1.5 text-[#0B1B3A]">{t.label}</strong>
//               {t.text}
//             </li>
//           ))}
//         </ul>

//         {/* Call to action */}
        
//       </div>
//     </section>
//   );
// };

// export default PortfolioSection;








// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowRight, X, MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// /* -------------------------------------------------------------------------- */
// /* Data: edit here, the UI follows                                             */
// /* -------------------------------------------------------------------------- */

// const SEGMENTS = [
//   {
//     id: "student",
//     number: "01",
//     label: "Student",
//     tagline: "Start small. Build the habit.",
//     tone: "gold",
//     portfolios: [
//       {
//         ticker: "$MFC",
//         name: "Mutual Fund Capital",
//         description: "Entry-level, diversified managed portfolio",
//         range: "GHS 150 – 499.99",
//         cycle: "28-day cycle",
//       },
//     ],
//   },
//   {
//     id: "investor",
//     number: "02",
//     label: "Investor",
//     tagline: "Scale with structure.",
//     tone: "navy",
//     portfolios: [
//       {
//         ticker: "$IC",
//         name: "Investwise Capital",
//         description: "Broader market exposure for growing capital",
//         range: "GHS 500 – 4,999.99",
//         cycle: "28-day cycle",
//       },
//       {
//         ticker: "$ABC",
//         name: "Agribusiness Capital",
//         description: "Participation in licensed agribusiness firms",
//         range: "GHS 5,000 – 9,999.99",
//         cycle: "3-month cycle",
//       },
//       // TODO: placeholder values. Replace the ticker, description, range, cycle
//       // (and move it to the right segment) with the real Sikapa details.
//       {
//         ticker: "$SKP",
//         name: "Sikapa",
//         description: "Description to be confirmed",
//         range: "GHS –",
//         cycle: "Cycle to be confirmed",
//       },
//     ],
//   },
//   {
//     id: "business-owner",
//     number: "03",
//     label: "Business Owner",
//     tagline: "Put capital to work.",
//     tone: "coral",
//     portfolios: [
//       {
//         ticker: "$REPF",
//         name: "Real Estate Pool Fund",
//         description: "Pooled real-estate participation, no property management",
//         range: "GHS 10,000 – 100,000",
//         cycle: "6-month cycle",
//       },
//     ],
//   },
// ];

// const WITHDRAWAL_TERMS = [
//   { label: "Standard", text: "Fixed cycles with Express Withdrawal" },
//   { label: "Locked", text: "Your chosen duration, minimum 6 months" },
// ];

// const RISK_NOTICE =
//   "Investing involves risk. Returns are not guaranteed, and your capital can go down as well as up. Confirm current terms with the Portfolio Manager before you invest.";

// const CONTACT = {
//   manager: "MrrFeenicks1",
//   role: "General Portfolio Manager",
//   whatsappLink: "https://wa.me/233545728382",
//   phones: ["+233 54 572 8382", "+233 55 021 2623"],
//   telegram: { label: "t.me/feebnb", href: "https://t.me/feebnb" },
//   facebook: "Feenicks1 Solutions Ltd",
//   email: "feenicks1solutionsltd@gmail.com",
//   location: "Ridge, Accra",
// };

// /* Tailwind needs full class strings, so tones are mapped, not interpolated. */
// const TONES = {
//   gold: {
//     tile: "bg-[#FFC629] text-[#0B1B3A]",
//     ticker: "bg-[#FFC629] text-[#0B1B3A]",
//     price: "bg-[#FFF1C9] text-[#0B1B3A]",
//   },
//   navy: {
//     tile: "bg-[#0B1B3A] text-white",
//     ticker: "bg-[#0B1B3A] text-white",
//     price: "bg-[#DDE8FB] text-[#0B1B3A]",
//   },
//   coral: {
//     tile: "bg-[#DC4A34] text-white",
//     ticker: "bg-[#DC4A34] text-white",
//     price: "bg-[#FDE3DE] text-[#0B1B3A]",
//   },
// };

// const FOCUSABLE =
//   'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// /* -------------------------------------------------------------------------- */
// /* Modal                                                                       */
// /* -------------------------------------------------------------------------- */

// /**
//  * Accessible modal dialog:
//  *  - rendered in a portal on document.body
//  *  - role="dialog" + aria-modal + labelled by its title
//  *  - focus moves in on open, is trapped while open, and returns to the
//  *    clicked row on close
//  *  - closes on Escape, backdrop click, or the close button
//  *  - page scroll is locked while open
//  *  - entrance motion is skipped for reduced-motion visitors
//  */
// const PortfolioModal = ({ portfolio, segment, onClose }) => {
//   const backdropRef = useRef(null);
//   const panelRef = useRef(null);
//   const closeRef = useRef(null);
//   const tone = TONES[segment.tone];

//   // Entrance animation (a response to the click, so motion is appropriate here)
//   useLayoutEffect(() => {
//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (reduce) return;
//     const ctx = gsap.context(() => {
//       gsap.from(backdropRef.current, { opacity: 0, duration: 0.2, ease: "power1.out" });
//       gsap.from(panelRef.current, {
//         y: 32,
//         opacity: 0,
//         duration: 0.35,
//         ease: "power3.out",
//       });
//     });
//     return () => ctx.revert();
//   }, []);

//   // Scroll lock, initial focus, Escape, focus trap
//   useEffect(() => {
//     const scrollbar = window.innerWidth - document.documentElement.clientWidth;
//     const prevOverflow = document.body.style.overflow;
//     const prevPadding = document.body.style.paddingRight;
//     document.body.style.overflow = "hidden";
//     if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

//     closeRef.current?.focus();

//     const onKeyDown = (e) => {
//       if (e.key === "Escape") {
//         e.stopPropagation();
//         onClose();
//         return;
//       }
//       if (e.key !== "Tab" || !panelRef.current) return;

//       const items = panelRef.current.querySelectorAll(FOCUSABLE);
//       if (!items.length) return;
//       const first = items[0];
//       const last = items[items.length - 1];

//       if (e.shiftKey && document.activeElement === first) {
//         e.preventDefault();
//         last.focus();
//       } else if (!e.shiftKey && document.activeElement === last) {
//         e.preventDefault();
//         first.focus();
//       }
//     };

//     document.addEventListener("keydown", onKeyDown);
//     return () => {
//       document.removeEventListener("keydown", onKeyDown);
//       document.body.style.overflow = prevOverflow;
//       document.body.style.paddingRight = prevPadding;
//     };
//   }, [onClose]);

//   const message = `Hello, I'm interested in ${portfolio.name} (${portfolio.ticker}). Please share how to get started.`;
//   const whatsappHref = `${CONTACT.whatsappLink}?text=${encodeURIComponent(message)}`;

//   const facts = [
//     { label: "Investment range", value: portfolio.range },
//     { label: "Cycle", value: portfolio.cycle },
//     { label: "Suited to", value: segment.label },
//   ];

//   return createPortal(
//     <div
//       ref={backdropRef}
//       className="fixed inset-0 z-50 flex items-end justify-center bg-[#0B1B3A]/60 p-0 sm:items-center sm:p-6"
//       onMouseDown={(e) => {
//         if (e.target === e.currentTarget) onClose();
//       }}
//     >
//       <div
//         ref={panelRef}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="portfolio-modal-title"
//         aria-describedby="portfolio-modal-desc"
//         className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-t-3xl bg-[#FDF8F1] shadow-[0_30px_80px_-20px_rgba(11,27,58,0.55)] sm:rounded-3xl"
//       >
//         {/* Header */}
//         <div className={`px-6 pb-6 pt-6 sm:px-8 ${tone.tile}`}>
//           <div className="flex items-start justify-between gap-4">
//             <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0B1B3A]">
//               {portfolio.ticker}
//             </span>
//             <button
//               ref={closeRef}
//               type="button"
//               onClick={onClose}
//               aria-label="Close portfolio details"
//               className="-mr-2 -mt-2 grid h-10 w-10 place-items-center rounded-full bg-white/20 transition-colors hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//             >
//               <X className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>
//           <h3
//             id="portfolio-modal-title"
//             className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl"
//           >
//             {portfolio.name}
//           </h3>
//           <p id="portfolio-modal-desc" className="mt-2 text-sm opacity-90 sm:text-base">
//             {portfolio.description}
//           </p>
//         </div>

//         <div className="space-y-6 px-6 py-6 sm:px-8">
//           {/* Key facts */}
//           <dl className="grid gap-3 sm:grid-cols-3">
//             {facts.map((f) => (
//               <div key={f.label} className="rounded-2xl bg-white p-4">
//                 <dt className="text-xs text-[#5B6478]">{f.label}</dt>
//                 <dd className="mt-1 text-sm font-extrabold text-[#0B1B3A]">{f.value}</dd>
//               </div>
//             ))}
//           </dl>

//           {/* Withdrawal terms */}
//           <section aria-labelledby="modal-withdrawal">
//             <h4 id="modal-withdrawal" className="text-sm font-extrabold text-[#0B1B3A]">
//               Withdrawal options
//             </h4>
//             <ul className="mt-2 divide-y divide-[#EFE7DA] overflow-hidden rounded-2xl bg-white">
//               {WITHDRAWAL_TERMS.map((t) => (
//                 <li key={t.label} className="px-4 py-3 text-sm text-[#46506A]">
//                   <strong className="mr-1.5 text-[#0B1B3A]">{t.label}</strong>
//                   {t.text}
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Contact */}
//           <section aria-labelledby="modal-contact">
//             <h4 id="modal-contact" className="text-sm font-extrabold text-[#0B1B3A]">
//               Get started with {CONTACT.manager}
//             </h4>
//             <p className="mt-1 text-sm text-[#5B6478]">{CONTACT.role}</p>

//             <a
//               href={whatsappHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0B1B3A] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1B3A]"
//             >
//               <MessageCircle className="h-4 w-4" aria-hidden="true" />
//               Message on WhatsApp
//               <span className="sr-only"> (opens in a new tab)</span>
//             </a>

//             <ul className="mt-4 space-y-2 text-sm text-[#46506A]">
//               {CONTACT.phones.map((p) => (
//                 <li key={p} className="flex items-center gap-2">
//                   <Phone className="h-4 w-4 shrink-0 text-[#5B6478]" aria-hidden="true" />
//                   <a
//                     href={`tel:${p.replace(/\s/g, "")}`}
//                     className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0B1B3A]"
//                   >
//                     {p}
//                   </a>
//                 </li>
//               ))}
//               <li className="flex items-center gap-2">
//                 <Send className="h-4 w-4 shrink-0 text-[#5B6478]" aria-hidden="true" />
//                 <a
//                   href={CONTACT.telegram.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0B1B3A]"
//                 >
//                   {CONTACT.telegram.label}
//                 </a>
//               </li>
//               <li className="flex items-center gap-2">
//                 <Mail className="h-4 w-4 shrink-0 text-[#5B6478]" aria-hidden="true" />
//                 <a
//                   href={`mailto:${CONTACT.email}`}
//                   className="break-all underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0B1B3A]"
//                 >
//                   {CONTACT.email}
//                 </a>
//               </li>
//               <li className="flex items-center gap-2">
//                 <MapPin className="h-4 w-4 shrink-0 text-[#5B6478]" aria-hidden="true" />
//                 {CONTACT.facebook}, {CONTACT.location}
//               </li>
//             </ul>
//           </section>

//           {/* Risk notice */}
//           <p className="border-t border-[#EFE7DA] pt-4 text-xs leading-relaxed text-[#5B6478]">
//             {RISK_NOTICE}
//           </p>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* Component                                                                   */
// /* -------------------------------------------------------------------------- */

// /**
//  * Props (all optional):
//  *  - heroImage: illustration shown beside the heading
//  *  - heroImageAlt: alt text for the illustration
//  *  - guideLabel: text for the top pill
//  */
// const PortfolioSection = ({
//   heroImage,
//   heroImageAlt = "",
//   guideLabel = "Portfolio guide | Oct 2026",
// }) => {
//   const rootRef = useRef(null);
//   const triggerRef = useRef(null); // the row that opened the modal
//   const [active, setActive] = useState(null); // { portfolio, segment } | null

//   const openModal = (portfolio, segment, e) => {
//     triggerRef.current = e.currentTarget;
//     setActive({ portfolio, segment });
//   };

//   const closeModal = () => {
//     setActive(null);
//     // Return focus to the row the visitor came from.
//     requestAnimationFrame(() => triggerRef.current?.focus());
//   };

//   useLayoutEffect(() => {
//     if (!rootRef.current) return;

//     const ctx = gsap.context(() => {
//       const mm = gsap.matchMedia();

//       // Motion only runs when the visitor has not asked for reduced motion.
//       mm.add("(prefers-reduced-motion: no-preference)", () => {
//         // 1. Heading block
//         gsap.from("[data-head]", {
//           y: 24,
//           opacity: 0,
//           duration: 0.7,
//           ease: "power3.out",
//           stagger: 0.12,
//           scrollTrigger: { trigger: "[data-header]", start: "top 85%", once: true },
//         });

//         // 2. Each audience row: tile slides in, portfolio cards follow, prices pop
//         gsap.utils.toArray("[data-row]").forEach((row) => {
//           const tl = gsap.timeline({
//             defaults: { ease: "power3.out" },
//             scrollTrigger: { trigger: row, start: "top 85%", once: true },
//           });

//           tl.from(row.querySelector("[data-tile]"), { x: -48, opacity: 0, duration: 0.7 })
//             .from(
//               row.querySelectorAll("[data-item]"),
//               { x: 48, opacity: 0, duration: 0.6, stagger: 0.12 },
//               "<0.1"
//             )
//             .from(
//               row.querySelectorAll("[data-price]"),
//               { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)", stagger: 0.12 },
//               "-=0.4"
//             );
//         });

//         // 3. Terms and call to action
//         gsap.from("[data-terms]", {
//           y: 16,
//           opacity: 0,
//           duration: 0.5,
//           stagger: 0.1,
//           ease: "power2.out",
//           scrollTrigger: { trigger: "[data-terms]", start: "top 95%", once: true },
//         });

//         gsap.from("[data-cta]", {
//           y: 40,
//           opacity: 0,
//           duration: 0.8,
//           ease: "power3.out",
//           scrollTrigger: { trigger: "[data-cta]", start: "top 90%", once: true },
//         });
//       });
//     }, rootRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={rootRef}
//       id="portfolio"
//       aria-labelledby="portfolio-heading"
//       className="relative overflow-x-clip bg-[#FDF8F1] py-16 sm:py-24"
//     >
//       {/* soft background shapes */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FFE9A8]/60 blur-2xl"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -left-20 top-72 h-56 w-56 rounded-full bg-[#F9D9D2]/60 blur-2xl"
//       />

//       <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
//         {/* Header */}
//         <div
//           data-header
//           className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]"
//         >
//           <div>
//             <p
//               data-head
//               className="inline-block rounded-full border border-[#B8860B] px-4 py-1.5 text-xs font-semibold text-[#8A6508]"
//             >
//               {guideLabel}
//             </p>

//             <h2
//               id="portfolio-heading"
//               data-head
//               className="mt-5 text-4xl font-extrabold text-[#0B1B3A] sm:text-5xl inline-block"
//             >
//               Which F1 Capital portfolio fits{" "}
              
//             </h2>

//             <p data-head className="mt-5 max-w-md text-lg text-[#46506A]">
//               A structured guide for students, investors and business owners.
//             </p>

//             <ul data-head className="mt-6 flex flex-wrap gap-2">
//               {SEGMENTS.map((s) => (
//                 <li key={s.id}>
//                   <a
//                     href={`#${s.id}`}
//                     className={`inline-block rounded-full px-4 py-1.5 text-sm font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1B3A] ${TONES[s.tone].ticker}`}
//                   >
//                     {s.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {heroImage && (
//             <div
//               data-head
//               className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_20px_50px_-20px_rgba(11,27,58,0.35)]"
//             >
//               <img
//                 src={heroImage}
//                 alt={heroImageAlt}
//                 loading="lazy"
//                 className="h-full w-full rounded-[1.5rem] object-cover"
//               />
//             </div>
//           )}
//         </div>

//         {/* Audience rows */}
//         <div className="mt-12 space-y-4">
//           {SEGMENTS.map((segment) => {
//             const tone = TONES[segment.tone];
//             return (
//               <div
//                 key={segment.id}
//                 id={segment.id}
//                 data-row
//                 className="grid scroll-mt-24 gap-3 md:grid-cols-[220px_1fr]"
//               >
//                 {/* Audience tile */}
//                 <div
//                   data-tile
//                   className={`flex flex-col justify-between rounded-3xl p-5 md:min-h-[8.5rem] ${tone.tile}`}
//                 >
//                   <span className="w-fit rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-[#0B1B3A]">
//                     {segment.number}
//                   </span>
//                   <div className="mt-4">
//                     <h3 className="text-xl font-extrabold leading-tight">
//                       {segment.label}
//                     </h3>
//                     <p className="mt-1 text-sm opacity-80">{segment.tagline}</p>
//                   </div>
//                 </div>

//                 {/* Portfolios: each row is a real button so it works with
//                     keyboard and screen readers, and opens the details modal */}
//                 <div className="divide-y divide-[#EFE7DA] overflow-hidden rounded-3xl bg-white shadow-[0_12px_30px_-18px_rgba(11,27,58,0.3)]">
//                   {segment.portfolios.map((p) => (
//                     <button
//                       key={p.ticker}
//                       type="button"
//                       data-item
//                       aria-haspopup="dialog"
//                       aria-label={`${p.name}, ${p.range}. View details`}
//                       onClick={(e) => openModal(p, segment, e)}
//                       className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-4 text-left transition-colors hover:bg-[#FDF8F1] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0B1B3A] sm:px-7 sm:py-5"
//                     >
//                       <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-bold ${tone.ticker}`}
//                         >
//                           {p.ticker}
//                         </span>
//                         <span className="text-lg font-extrabold text-[#0B1B3A] sm:text-xl">
//                           {p.name}
//                         </span>
//                       </span>

//                       <span
//                         data-price
//                         className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-extrabold sm:text-base ${tone.price}`}
//                       >
//                         {p.range}
//                       </span>

//                       <span className="text-sm text-[#46506A] sm:text-base">
//                         {p.description}
//                       </span>

//                       <span className="flex items-center gap-2">
//                         <span className="whitespace-nowrap rounded-full border border-[#E4DACB] px-3 py-1 text-xs text-[#5B6478]">
//                           {p.cycle}
//                         </span>
//                         <ArrowRight
//                           aria-hidden="true"
//                           className="h-4 w-4 text-[#0B1B3A] transition-transform group-hover:translate-x-0.5"
//                         />
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Withdrawal terms */}
//         <ul className="mt-6 flex flex-wrap justify-center gap-3">
//           {WITHDRAWAL_TERMS.map((t) => (
//             <li
//               key={t.label}
//               data-terms
//               className="rounded-full border border-[#E4DACB] bg-white px-4 py-2 text-xs text-[#46506A] sm:text-sm"
//             >
//               <strong className="mr-1.5 text-[#0B1B3A]">{t.label}</strong>
//               {t.text}
//             </li>
//           ))}
//         </ul>

//         {/* Call to action */}
        
//       </div>

//       {active && (
//         <PortfolioModal
//           portfolio={active.portfolio}
//           segment={active.segment}
//           onClose={closeModal}
//         />
//       )}
//     </section>
//   );
// };

// export default PortfolioSection;






// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ArrowRight, Check, X, MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react";

// gsap.registerPlugin(ScrollTrigger);

// /* -------------------------------------------------------------------------- */
// /* Data: edit here, the UI follows                                             */
// /* min/max (GHS) drive the eligibility check. Use null to skip the check.      */
// /* -------------------------------------------------------------------------- */

// const SEGMENTS = [
//   {
//     id: "student", number: "01", label: "Student", tagline: "Start small. Build the habit.",
//     accent: "#FFC629",
//     portfolios: [
//       { ticker: "$MFC", name: "Mutual Fund Capital", description: "Entry-level, diversified managed portfolio", range: "GHS 150 – 499.99", min: 150, max: 499.99, cycle: "28-day cycle" },
//     ],
//   },
//   {
//     id: "investor", number: "02", label: "Investor", tagline: "Scale with structure.",
//     accent: "#7FA8FF",
//     portfolios: [
//       { ticker: "$IC", name: "Investwise Capital", description: "Broader market exposure for growing capital", range: "GHS 500 – 4,999.99", min: 500, max: 4999.99, cycle: "28-day cycle" },
//       { ticker: "$ABC", name: "Agribusiness Capital", description: "Participation in licensed agribusiness firms", range: "GHS 5,000 – 9,999.99", min: 5000, max: 9999.99, cycle: "3-month cycle" },
//       // TODO: placeholder values. Replace with the real Sikapa details
//       // (and move it to the right segment).
//       { ticker: "$SKP", name: "Sikapa", description: "Description to be confirmed", range: "GHS –", min: null, max: null, cycle: "Cycle to be confirmed" },
//     ],
//   },
//   {
//     id: "business-owner", number: "03", label: "Business Owner", tagline: "Put capital to work.",
//     accent: "#FF6B52",
//     portfolios: [
//       { ticker: "$REPF", name: "Real Estate Pool Fund", description: "Pooled real-estate participation, no property management", range: "GHS 10,000 – 100,000", min: 10000, max: 100000, cycle: "6-month cycle" },
//     ],
//   },
// ];

// const WITHDRAWAL_TERMS = [
//   { value: "standard", label: "Standard", text: "Fixed cycles with Express Withdrawal" },
//   { value: "locked", label: "Locked", text: "Your chosen duration, minimum 6 months" },
// ];

// const RISK_NOTICE =
//   "Investing involves risk. Returns are not guaranteed, and your capital can go down as well as up. Confirm current terms with the Portfolio Manager before you invest.";

// const CONTACT = {
//   manager: "MrrFeenicks1",
//   role: "General Portfolio Manager",
//   whatsappLink: "https://wa.me/233545728382",
//   phones: ["+233 54 572 8382", "+233 55 021 2623"],
//   telegram: { label: "t.me/feebnb", href: "https://t.me/feebnb" },
//   facebook: "Feenicks1 Solutions Ltd",
//   email: "feenicks1solutionsltd@gmail.com",
//   location: "Ridge, Accra",
// };

// const STATUSES = [
//   ["student", "Student"], ["employed", "Employed"],
//   ["self-employed", "Self-employed"], ["business-owner", "Business owner"],
// ];
// const SOURCES = ["Salary", "Business income", "Savings", "Allowance or family support", "Other"];

// /* -------------------------------------------------------------------------- */
// /* Look & feel                                                                 */
// /* -------------------------------------------------------------------------- */

// const FF = { fontFamily: '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif' };
// const FONT_CSS = "@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap');";
// const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
// const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
// const INPUT =
//   "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] aria-[invalid=true]:border-[#FF8A75] [&>option]:text-black";
// const RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

// const Grain = () => (
//   <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
// );

// const Field = ({ label, id, error, children, className = "" }) => (
//   <div className={className}>
//     <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-white/70">{label}</label>
//     {children}
//     {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-xs text-[#FF8A75]">{error}</p>}
//   </div>
// );

// /* -------------------------------------------------------------------------- */
// /* Qualification logic                                                         */
// /* -------------------------------------------------------------------------- */

// const INIT = {
//   name: "", phone: "", email: "", status: "", institution: "", business: "",
//   amount: "", source: "", withdrawal: "standard", months: "", age: false, risk: false,
// };
// const toNumber = (v) => parseFloat(String(v).replace(/,/g, ""));
// const fmt = (n) => `GHS ${n.toLocaleString("en-GH", { maximumFractionDigits: 2 })}`;

// const validate = (f, p) => {
//   const e = {};
//   const amt = toNumber(f.amount);
//   if (f.name.trim().split(/\s+/).filter(Boolean).length < 2) e.name = "Enter your first and last name.";
//   if (f.phone.replace(/\D/g, "").length < 9) e.phone = "Enter a phone number we can reach on WhatsApp.";
//   if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Enter a valid email address.";
//   if (!f.status) e.status = "Choose your current status.";
//   if (f.status === "student" && !f.institution.trim()) e.institution = "Enter your school or university.";
//   if ((f.status === "business-owner" || f.status === "self-employed") && !f.business.trim()) e.business = "Enter your business name.";
//   if (!amt || amt <= 0) e.amount = "Enter the amount you plan to invest.";
//   else if (p.min != null && (amt < p.min || amt > p.max)) e.amount = `${p.name} accepts ${p.range}.`;
//   if (!f.source) e.source = "Choose where the money comes from.";
//   if (f.withdrawal === "locked" && !(toNumber(f.months) >= 6)) e.months = "Locked terms start at 6 months.";
//   if (!f.age) e.age = "You must be 18 or older to invest.";
//   if (!f.risk) e.risk = "Please confirm you understand the risks.";
//   return e;
// };

// /* -------------------------------------------------------------------------- */
// /* Modal: overview -> qualification form -> confirmation                       */
// /* -------------------------------------------------------------------------- */

// const STEPS = ["Overview", "Qualify", "Done"];

// const PortfolioModal = ({ item, all, onSwitch, onClose, onSubmit }) => {
//   const { portfolio: p, segment: s } = item;
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState(INIT);
//   const [errors, setErrors] = useState({});
//   const [busy, setBusy] = useState(false);
//   const [failed, setFailed] = useState(false);
//   const backdropRef = useRef(null);
//   const panelRef = useRef(null);
//   const bodyRef = useRef(null);
//   const headingRef = useRef(null);
//   const formRef = useRef(null);

//   const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//   const amt = toNumber(form.amount);
//   const match = all.find((x) => x.portfolio.min != null && amt >= x.portfolio.min && amt <= x.portfolio.max);

//   // Entrance
//   useLayoutEffect(() => {
//     if (reduced()) return;
//     const ctx = gsap.context(() => {
//       gsap.from(backdropRef.current, { opacity: 0, duration: 0.25 });
//       gsap.from(panelRef.current, { y: 40, scale: 0.97, opacity: 0, duration: 0.45, ease: "power3.out" });
//     });
//     return () => ctx.revert();
//   }, []);

//   // New step or new portfolio: move focus to the heading and fade the content in
//   useEffect(() => { setErrors({}); }, [p.ticker]);
//   useLayoutEffect(() => {
//     headingRef.current?.focus({ preventScroll: true });
//     bodyRef.current?.scrollTo({ top: 0 });
//     if (reduced()) return;
//     const t = gsap.from("[data-step]", { opacity: 0, y: 16, duration: 0.4, ease: "power2.out", stagger: 0.05 });
//     return () => t.kill();
//   }, [step, p.ticker]);
//   useEffect(() => { setStep(1); }, [p.ticker]);

//   // Scroll lock, Escape, focus trap
//   useEffect(() => {
//     const bar = window.innerWidth - document.documentElement.clientWidth;
//     const prevO = document.body.style.overflow;
//     const prevP = document.body.style.paddingRight;
//     document.body.style.overflow = "hidden";
//     if (bar > 0) document.body.style.paddingRight = `${bar}px`;

//     const onKey = (e) => {
//       if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
//       if (e.key !== "Tab" || !panelRef.current) return;
//       const els = panelRef.current.querySelectorAll(FOCUSABLE);
//       if (!els.length) return;
//       const first = els[0], last = els[els.length - 1];
//       if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
//       else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
//     };
//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = prevO;
//       document.body.style.paddingRight = prevP;
//     };
//   }, [onClose]);

//   const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
//   const field = (k) => ({
//     id: k, name: k, value: form[k], onChange: set(k), className: INPUT,
//     "aria-invalid": errors[k] ? true : undefined,
//     "aria-describedby": errors[k] ? `${k}-err` : undefined,
//   });

//   const message =
//     `Hello ${CONTACT.manager}, I'd like to apply for ${p.name} (${p.ticker}).\n` +
//     `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n` +
//     `Status: ${STATUSES.find(([v]) => v === form.status)?.[1] ?? ""}\n` +
//     `Amount: ${amt ? fmt(amt) : ""}\nSource of funds: ${form.source}\n` +
//     `Withdrawal: ${form.withdrawal === "locked" ? `Locked, ${form.months} months` : "Standard"}`;
//   const waHref = `${CONTACT.whatsappLink}?text=${encodeURIComponent(message)}`;

//   const submit = async (e) => {
//     e.preventDefault();
//     const errs = validate(form, p);
//     setErrors(errs);
//     const first = Object.keys(errs)[0];
//     if (first) { formRef.current?.querySelector(`[name="${first}"]`)?.focus(); return; }
//     setFailed(false);
//     if (onSubmit) {
//       setBusy(true);
//       try { await onSubmit({ portfolio: p.ticker, ...form, amount: amt }); }
//       catch { setFailed(true); setBusy(false); return; }
//       setBusy(false);
//     }
//     setStep(2);
//   };

//   const titles = [p.name, "Check your eligibility", onSubmit ? "Application received" : "Application ready"];
//   const showBiz = form.status === "business-owner" || form.status === "self-employed";

//   return createPortal(
//     <div
//       ref={backdropRef}
//       style={{ ...FF, "--accent": s.accent }}
//       className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
//       onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
//     >
//       <div
//         ref={panelRef}
//         role="dialog" aria-modal="true" aria-labelledby="pm-title"
//         className="relative grid max-h-[94vh] w-full max-w-4xl overflow-hidden rounded-t-3xl border border-white/10 bg-[#0A0F1C] text-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:grid-cols-[300px_1fr] sm:rounded-3xl"
//       >
//         {/* Poster */}
//         <aside
//           className="relative hidden flex-col justify-between overflow-hidden p-8 md:flex"
//           style={{ background: `radial-gradient(120% 70% at 0% 0%, color-mix(in srgb, ${s.accent} 38%, transparent), transparent 65%), #0D1424` }}
//         >
//           <Grain />
//           <p className="relative text-sm text-white/65">{s.label} portfolio</p>
//           <div className="relative">
//             <p className="break-all text-7xl font-extrabold leading-none text-[var(--accent)]">{p.ticker}</p>
//             <p className="mt-3 text-xl font-bold">{p.name}</p>
//           </div>
//           <dl className="relative space-y-3 text-sm">
//             <div><dt className="text-white/50">Investment range</dt><dd className="font-bold">{p.range}</dd></div>
//             <div><dt className="text-white/50">Cycle</dt><dd className="font-bold">{p.cycle}</dd></div>
//           </dl>
//         </aside>

//         {/* Content */}
//         <div ref={bodyRef} className="relative overflow-y-auto overscroll-contain p-6 sm:p-8">
//           <div className="flex items-center justify-between gap-4">
//             <ol className="flex flex-1 gap-2" aria-label="Progress">
//               {STEPS.map((l, i) => (
//                 <li key={l} aria-current={i === step ? "step" : undefined} className="flex-1">
//                   <span className={`block h-1 rounded-full transition-colors ${i <= step ? "bg-[var(--accent)]" : "bg-white/15"}`} />
//                   <span className={`mt-1.5 block text-xs ${i === step ? "font-bold text-white" : "text-white/45"}`}>{l}</span>
//                 </li>
//               ))}
//             </ol>
//             <button
//               type="button" onClick={onClose} aria-label="Close"
//               className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 ${RING}`}
//             >
//               <X className="h-5 w-5" aria-hidden="true" />
//             </button>
//           </div>

//           <p data-step className="mt-6 text-sm font-bold text-[var(--accent)] md:hidden">{p.ticker}</p>
//           <h3 id="pm-title" ref={headingRef} tabIndex={-1} className="mt-2 text-3xl font-extrabold leading-tight outline-none sm:text-4xl md:mt-6">
//             {titles[step]}
//           </h3>

//           {/* Step 0: overview */}
//           {step === 0 && (
//             <div className="mt-4 space-y-6">
//               <p data-step className="text-base text-white/70">{p.description}</p>
//               <dl data-step className="grid gap-3 sm:grid-cols-3">
//                 {[["Investment range", p.range], ["Cycle", p.cycle], ["Suited to", s.label]].map(([k, v]) => (
//                   <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                     <dt className="text-xs text-white/50">{k}</dt>
//                     <dd className="mt-1 text-sm font-bold">{v}</dd>
//                   </div>
//                 ))}
//               </dl>
//               <section data-step aria-labelledby="pm-w">
//                 <h4 id="pm-w" className="text-sm font-bold">Withdrawal options</h4>
//                 <ul className="mt-2 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
//                   {WITHDRAWAL_TERMS.map((t) => (
//                     <li key={t.value} className="px-4 py-3 text-sm text-white/70"><strong className="mr-1.5 text-white">{t.label}</strong>{t.text}</li>
//                   ))}
//                 </ul>
//               </section>
//               <p data-step className="text-sm text-white/60">
//                 To apply you’ll share your contact details, your status, how much you plan to invest and where the money comes from. It takes about two minutes.
//               </p>
//               <p data-step className="text-xs leading-relaxed text-white/45">{RISK_NOTICE}</p>
//               <button
//                 data-step type="button" onClick={() => setStep(1)}
//                 className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-extrabold text-[#070B14] transition-transform hover:-translate-y-0.5 ${RING}`}
//               >
//                 Start application <ArrowRight className="h-4 w-4" aria-hidden="true" />
//               </button>
//             </div>
//           )}

//           {/* Step 1: qualification form */}
//           {step === 1 && (
//             <form ref={formRef} onSubmit={submit} noValidate className="mt-5 space-y-4">
//               <div data-step className="grid gap-4 sm:grid-cols-2">
//                 <Field id="name" label="Full name" error={errors.name} className="sm:col-span-2">
//                   <input {...field("name")} autoComplete="name" placeholder="Ama Mensah" />
//                 </Field>
//                 <Field id="phone" label="Phone (WhatsApp)" error={errors.phone}>
//                   <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+233 5X XXX XXXX" />
//                 </Field>
//                 <Field id="email" label="Email" error={errors.email}>
//                   <input {...field("email")} type="email" autoComplete="email" placeholder="you@example.com" />
//                 </Field>
//                 <Field id="status" label="I am a" error={errors.status}>
//                   <select {...field("status")}>
//                     <option value="">Select</option>
//                     {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
//                   </select>
//                 </Field>
//                 {form.status === "student" && (
//                   <Field id="institution" label="School or university" error={errors.institution}>
//                     <input {...field("institution")} placeholder="University of Ghana" />
//                   </Field>
//                 )}
//                 {showBiz && (
//                   <Field id="business" label="Business name" error={errors.business}>
//                     <input {...field("business")} placeholder="Your business" />
//                   </Field>
//                 )}
//               </div>

//               <div data-step className="grid gap-4 sm:grid-cols-2">
//                 <div>
//                   <Field id="amount" label={`Amount to invest${p.min != null ? ` (${p.range})` : " (GHS)"}`} error={errors.amount}>
//                     <input {...field("amount")} inputMode="decimal" placeholder={p.min != null ? String(p.min) : "0.00"} />
//                   </Field>
//                   {errors.amount && match && match.portfolio.ticker !== p.ticker && (
//                     <button type="button" onClick={() => onSwitch(match)} className={`mt-2 rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-bold text-[var(--accent)] ${RING}`}>
//                       {fmt(amt)} fits {match.portfolio.name}. Switch
//                     </button>
//                   )}
//                 </div>
//                 <Field id="source" label="Source of funds" error={errors.source}>
//                   <select {...field("source")}>
//                     <option value="">Select</option>
//                     {SOURCES.map((x) => <option key={x}>{x}</option>)}
//                   </select>
//                 </Field>
//               </div>

//               <fieldset data-step>
//                 <legend className="mb-1.5 text-xs font-semibold text-white/70">Withdrawal preference</legend>
//                 <div className="grid gap-3 sm:grid-cols-2">
//                   {WITHDRAWAL_TERMS.map((t) => (
//                     <label key={t.value} className="block cursor-pointer">
//                       <input type="radio" name="withdrawal" value={t.value} checked={form.withdrawal === t.value} onChange={set("withdrawal")} className="peer sr-only" />
//                       <span className="block rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white/70 transition-colors peer-checked:border-[var(--accent)] peer-checked:bg-white/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)]">
//                         <strong className="block text-white">{t.label}</strong>{t.text}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//                 {form.withdrawal === "locked" && (
//                   <Field id="months" label="Lock duration (months)" error={errors.months} className="mt-3 sm:w-1/2">
//                     <input {...field("months")} inputMode="numeric" placeholder="6" />
//                   </Field>
//                 )}
//               </fieldset>

//               <div data-step className="space-y-3">
//                 {[["age", "I am 18 years or older."], ["risk", "I understand that returns are not guaranteed and my capital is at risk."]].map(([k, l]) => (
//                   <div key={k}>
//                     <label className="flex cursor-pointer items-start gap-3 text-sm text-white/75">
//                       <input type="checkbox" name={k} checked={form[k]} onChange={set(k)} aria-invalid={errors[k] ? true : undefined} aria-describedby={errors[k] ? `${k}-err` : undefined} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]" />
//                       {l}
//                     </label>
//                     {errors[k] && <p id={`${k}-err`} role="alert" className="mt-1 text-xs text-[#FF8A75]">{errors[k]}</p>}
//                   </div>
//                 ))}
//               </div>

//               {failed && <p role="alert" className="text-sm text-[#FF8A75]">We couldn’t send your application. Check your connection and try again.</p>}

//               <div data-step className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
//                 <button type="button" onClick={() => setStep(0)} className={`rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold hover:bg-white/10 ${RING}`}>Back</button>
//                 <button type="submit" disabled={busy} className={`flex-1 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-extrabold text-[#070B14] transition-transform hover:-translate-y-0.5 disabled:opacity-60 ${RING}`}>
//                   {busy ? "Submitting…" : "Submit application"}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Step 2: done */}
//           {step === 2 && (
//             <div className="mt-4 space-y-6">
//               <p data-step className="flex items-start gap-3 text-base text-white/75">
//                 <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[#070B14]"><Check className="h-4 w-4" aria-hidden="true" /></span>
//                 {onSubmit
//                   ? `Thanks, ${form.name.split(" ")[0]}. ${CONTACT.manager} will contact you about ${p.name}.`
//                   : `You qualify for ${p.name}. Send your details to ${CONTACT.manager} on WhatsApp to complete your application.`}
//               </p>
//               <dl data-step className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 text-sm">
//                 {[["Portfolio", `${p.name} (${p.ticker})`], ["Amount", fmt(amt)], ["Withdrawal", form.withdrawal === "locked" ? `Locked, ${form.months} months` : "Standard"], ["Contact", `${form.phone} · ${form.email}`]].map(([k, v]) => (
//                   <div key={k} className="flex justify-between gap-4 px-4 py-3"><dt className="text-white/50">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
//                 ))}
//               </dl>
//               <div data-step className="flex flex-col gap-3 sm:flex-row">
//                 <a href={waHref} target="_blank" rel="noopener noreferrer" className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-extrabold text-[#070B14] ${RING}`}>
//                   <MessageCircle className="h-4 w-4" aria-hidden="true" />
//                   {onSubmit ? "Also message on WhatsApp" : "Send on WhatsApp"}
//                   <span className="sr-only"> (opens in a new tab)</span>
//                 </a>
//                 <button type="button" onClick={onClose} className={`rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold hover:bg-white/10 ${RING}`}>Close</button>
//               </div>
//             </div>
//           )}

//           {/* Contact */}
//           <ul data-step className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs text-white/55">
//             <li className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" aria-hidden="true" /><a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="hover:text-white">{CONTACT.phones[0]}</a></li>
//             <li className="flex items-center gap-1.5"><Send className="h-3.5 w-3.5" aria-hidden="true" /><a href={CONTACT.telegram.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{CONTACT.telegram.label}</a></li>
//             <li className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" aria-hidden="true" /><a href={`mailto:${CONTACT.email}`} className="break-all hover:text-white">{CONTACT.email}</a></li>
//             <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{CONTACT.location}</li>
//           </ul>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* Section                                                                     */
// /* -------------------------------------------------------------------------- */

// /**
//  * Props (all optional):
//  *  - heroImage / heroImageAlt: still or poster frame shown beside the heading
//  *  - guideLabel: text for the top pill
//  *  - onSubmit(payload): async handler that receives the completed application.
//  *    If omitted, the visitor sends the application via a pre-filled WhatsApp message.
//  */
// const PortfolioSection = ({
//   heroImage,
//   heroImageAlt = "",
//   guideLabel = "Portfolio guide | Oct 2026",
//   onSubmit,
// }) => {
//   const rootRef = useRef(null);
//   const triggerRef = useRef(null);
//   const [active, setActive] = useState(null);
//   const all = SEGMENTS.flatMap((segment) => segment.portfolios.map((portfolio) => ({ portfolio, segment })));

//   const open = (it, e) => { triggerRef.current = e.currentTarget; setActive(it); };
//   const close = () => { setActive(null); requestAnimationFrame(() => triggerRef.current?.focus()); };
//   const spot = (e) => {
//     const r = e.currentTarget.getBoundingClientRect();
//     e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
//     e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
//   };

//   useLayoutEffect(() => {
//     if (!rootRef.current) return;
//     const ctx = gsap.context(() => {
//       const mm = gsap.matchMedia();
//       mm.add("(prefers-reduced-motion: no-preference)", () => {
//         // The one orchestrated moment: headline lines rise out of a mask
//         gsap.timeline({ defaults: { ease: "power4.out" }, scrollTrigger: { trigger: "[data-header]", start: "top 85%", once: true } })
//           .from("[data-line]", { yPercent: 110, duration: 1, stagger: 0.12 })
//           .from("[data-head]", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6");

//         gsap.utils.toArray("[data-chapter]").forEach((ch) => {
//           gsap.from(ch.querySelectorAll("[data-item]"), {
//             y: 36, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
//             scrollTrigger: { trigger: ch, start: "top 80%", once: true },
//           });
//         });

//         gsap.from("[data-cta]", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: "[data-cta]", start: "top 92%", once: true } });
//       });
//     }, rootRef);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={rootRef} id="portfolio" aria-labelledby="portfolio-heading" style={FF}
//       className="relative overflow-x-clip bg-[#070B14] py-20 text-white sm:py-28"
//     >
//       <style>{FONT_CSS}</style>
//       <Grain />
//       {/* stage light and vignette */}
//       <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]" style={{ background: "radial-gradient(60% 70% at 70% 0%, rgba(255,198,41,0.18), transparent 70%), radial-gradient(40% 50% at 0% 20%, rgba(127,168,255,0.12), transparent 70%)" }} />
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55))" }} />

//       <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
//         {/* Header */}
//         <div data-header className={`grid items-end gap-10 ${heroImage ? "md:grid-cols-[1.4fr_1fr]" : ""}`}>
//           <div>
//             <p data-head className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[#FFC629] backdrop-blur">
//               {guideLabel}
//             </p>
//             <h2 id="portfolio-heading" className="mt-6 text-[clamp(2.6rem,8vw,5.75rem)] font-extrabold leading-[0.95] tracking-tight">
//               {["Which F1 Capital", "portfolio fits", "your next move?"].map((l) => (
//                 <span key={l} className="block overflow-hidden pb-[0.08em]"><span data-line className="block">{l}</span></span>
//               ))}
//             </h2>
//             <p data-head className="mt-6 max-w-md text-lg text-white/65">
//               A structured guide for students, investors and business owners. Pick a portfolio, then check if you qualify.
//             </p>
//             <ul data-head className="mt-7 flex flex-wrap gap-2">
//               {SEGMENTS.map((s) => (
//                 <li key={s.id}>
//                   <a href={`#${s.id}`} style={{ "--accent": s.accent }} className={`inline-block rounded-full border border-[var(--accent)] px-4 py-1.5 text-sm font-bold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#070B14] ${RING}`}>
//                     {s.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {heroImage && (
//             <div data-head className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
//               <img src={heroImage} alt={heroImageAlt} loading="lazy" className="aspect-[4/5] h-full w-full object-cover" />
//               <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,11,20,0.75), transparent 55%)" }} />
//               <Grain />
//             </div>
//           )}
//         </div>

//         {/* Chapters */}
//         <div className="mt-20 space-y-14">
//           {SEGMENTS.map((segment) => (
//             <div key={segment.id} id={segment.id} data-chapter style={{ "--accent": segment.accent }} className="scroll-mt-24">
//               <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-4">
//                 <div className="flex items-baseline gap-4">
//                   <span aria-hidden="true" className="text-5xl font-extrabold text-transparent [-webkit-text-stroke:1px_var(--accent)] sm:text-7xl">{segment.number}</span>
//                   <h3 className="text-2xl font-bold sm:text-3xl">{segment.label}</h3>
//                 </div>
//                 <p className="hidden text-sm text-white/55 sm:block">{segment.tagline}</p>
//               </div>

//               <div className="divide-y divide-white/10">
//                 {segment.portfolios.map((p) => (
//                   <button
//                     key={p.ticker} type="button" data-item aria-haspopup="dialog"
//                     aria-label={`${p.name}, ${p.range}. View details and apply`}
//                     onClick={(e) => open({ portfolio: p, segment }, e)}
//                     onPointerMove={spot}
//                     className={`group relative grid w-full cursor-pointer items-center gap-x-6 gap-y-2 overflow-hidden px-3 py-6 text-left sm:grid-cols-[90px_1fr_auto_auto] sm:px-5 ${RING} focus-visible:-outline-offset-2`}
//                   >
//                     <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)" }} />
//                     <span className="relative text-xl font-extrabold text-[var(--accent)]">{p.ticker}</span>
//                     <span className="relative block">
//                       <span className="block text-xl font-bold sm:text-2xl">{p.name}</span>
//                       <span className="mt-1 block text-sm text-white/60 sm:text-base">{p.description}</span>
//                     </span>
//                     <span className="relative flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
//                       <span className="whitespace-nowrap text-base font-extrabold sm:text-lg">{p.range}</span>
//                       <span className="whitespace-nowrap rounded-full border border-white/20 px-3 py-0.5 text-xs text-white/60">{p.cycle}</span>
//                     </span>
//                     <span aria-hidden="true" className="absolute right-3 top-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[#070B14] sm:static">
//                       <ArrowRight className="h-5 w-5 transition-transform group-hover:-rotate-45" />
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Withdrawal terms */}
//         <ul className="mt-10 flex flex-wrap justify-center gap-3">
//           {WITHDRAWAL_TERMS.map((t) => (
//             <li key={t.value} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/65 sm:text-sm">
//               <strong className="mr-1.5 text-white">{t.label}</strong>{t.text}
//             </li>
//           ))}
//         </ul>

//         {/* Call to action */}
//         <div data-cta className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/10 p-8 sm:p-12" style={{ background: "radial-gradient(90% 120% at 100% 0%, rgba(255,198,41,0.22), transparent 60%), #0D1424" }}>
//           <Grain />
//           <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h3 className="text-3xl font-extrabold sm:text-4xl">Not sure which one fits?</h3>
//               <p className="mt-2 text-white/65">Talk to {CONTACT.manager}, {CONTACT.role}.</p>
//             </div>
//             <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" style={{ "--accent": "#FFC629" }} className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#FFC629] px-7 py-4 text-sm font-extrabold text-[#070B14] transition-transform hover:-translate-y-0.5 ${RING}`}>
//               <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
//               <span className="sr-only"> (opens in a new tab)</span>
//             </a>
//           </div>
//         </div>
//       </div>

//       {active && <PortfolioModal item={active} all={all} onSwitch={setActive} onClose={close} onSubmit={onSubmit} />}
//     </section>
//   );
// };

// export default PortfolioSection;




import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, X, MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/* Data: edit here, the UI follows                                             */
/* min/max (GHS) drive the eligibility check. Use null to skip the check.      */
/* -------------------------------------------------------------------------- */

const SEGMENTS = [
  {
    id: "student", number: "01", label: "Student", tagline: "Start small. Build the habit.",
    accent: "#FFC629",
    portfolios: [
      { ticker: "$MFC", name: "Mutual Fund Capital", description: "Entry-level, diversified managed portfolio", range: "GHS 150 – 499.99", min: 150, max: 499.99, cycle: "28-day cycle" },
    ],
  },
  {
    id: "investor", number: "02", label: "Investor", tagline: "Scale with structure.",
    accent: "#7FA8FF",
    portfolios: [
      { ticker: "$IC", name: "Investwise Capital", description: "Broader market exposure for growing capital", range: "GHS 500 – 4,999.99", min: 500, max: 4999.99, cycle: "28-day cycle" },
      { ticker: "$ABC", name: "Agribusiness Capital", description: "Participation in licensed agribusiness firms", range: "GHS 5,000 – 9,999.99", min: 5000, max: 9999.99, cycle: "3-month cycle" },
      // TODO: placeholder values. Replace with the real Sikapa details
      // (and move it to the right segment).
      { ticker: "$SKP", name: "Sikapa", description: "Description to be confirmed", range: "GHS –", min: null, max: null, cycle: "Cycle to be confirmed" },
    ],
  },
  {
    id: "business-owner", number: "03", label: "Business Owner", tagline: "Put capital to work.",
    accent: "#FF6B52",
    portfolios: [
      { ticker: "$REPF", name: "Real Estate Pool Fund", description: "Pooled real-estate participation, no property management", range: "GHS 10,000 – 100,000", min: 10000, max: 100000, cycle: "6-month cycle" },
    ],
  },
];

const WITHDRAWAL_TERMS = [
  { value: "standard", label: "Standard", text: "Fixed cycles with Express Withdrawal" },
  { value: "locked", label: "Locked", text: "Your chosen duration, minimum 6 months" },
];

const RISK_NOTICE =
  "Investing involves risk. Returns are not guaranteed, and your capital can go down as well as up. Confirm current terms with the Portfolio Manager before you invest.";

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

const STATUSES = [
  ["student", "Student"], ["employed", "Employed"],
  ["self-employed", "Self-employed"], ["business-owner", "Business owner"],
];
const SOURCES = ["Salary", "Business income", "Savings", "Allowance or family support", "Other"];

/* -------------------------------------------------------------------------- */
/* Look & feel                                                                 */
/* -------------------------------------------------------------------------- */

const FF = { fontFamily: '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif' };
const FONT_CSS = "@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap');";
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
const INPUT =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] aria-[invalid=true]:border-[#FF8A75] [&>option]:text-black";
const RING = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

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

/* -------------------------------------------------------------------------- */
/* Qualification logic                                                         */
/* -------------------------------------------------------------------------- */

const INIT = {
  name: "", phone: "", email: "", status: "", institution: "", business: "",
  amount: "", source: "", withdrawal: "standard", months: "", age: false, risk: false,
};
const toNumber = (v) => parseFloat(String(v).replace(/,/g, ""));
const fmt = (n) => `GHS ${n.toLocaleString("en-GH", { maximumFractionDigits: 2 })}`;

const validate = (f, p) => {
  const e = {};
  const amt = toNumber(f.amount);
  if (f.name.trim().split(/\s+/).filter(Boolean).length < 2) e.name = "Enter your first and last name.";
  if (f.phone.replace(/\D/g, "").length < 9) e.phone = "Enter a phone number we can reach on WhatsApp.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!f.status) e.status = "Choose your current status.";
  if (f.status === "student" && !f.institution.trim()) e.institution = "Enter your school or university.";
  if ((f.status === "business-owner" || f.status === "self-employed") && !f.business.trim()) e.business = "Enter your business name.";
  if (!amt || amt <= 0) e.amount = "Enter the amount you plan to invest.";
  else if (p.min != null && (amt < p.min || amt > p.max)) e.amount = `${p.name} accepts ${p.range}.`;
  if (!f.source) e.source = "Choose where the money comes from.";
  if (f.withdrawal === "locked" && !(toNumber(f.months) >= 6)) e.months = "Locked terms start at 6 months.";
  if (!f.age) e.age = "You must be 18 or older to invest.";
  if (!f.risk) e.risk = "Please confirm you understand the risks.";
  return e;
};

/* -------------------------------------------------------------------------- */
/* Modal: overview -> qualification form -> confirmation                       */
/* -------------------------------------------------------------------------- */

const STEPS = ["Overview", "Qualify", "Done"];

const PortfolioModal = ({ item, all, onSwitch, onClose, onSubmit }) => {
  const { portfolio: p, segment: s } = item;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const bodyRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const amt = toNumber(form.amount);
  const match = all.find((x) => x.portfolio.min != null && amt >= x.portfolio.min && amt <= x.portfolio.max);

  // Entrance
  useLayoutEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(backdropRef.current, { opacity: 0, duration: 0.25 });
      gsap.from(panelRef.current, { y: 40, scale: 0.97, opacity: 0, duration: 0.45, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  // New step or new portfolio: move focus to the heading and fade the content in
  useEffect(() => { setErrors({}); }, [p.ticker]);
  useLayoutEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    bodyRef.current?.scrollTo({ top: 0 });
    if (reduced()) return;
    // fromTo with an explicit end state: gsap.from() + kill() can strand elements
    // at opacity 0 when React re-runs the effect (StrictMode, fast step changes).
    const t = gsap.fromTo(
      "[data-step]",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05, clearProps: "opacity,transform" }
    );
    return () => { t.kill(); gsap.set("[data-step]", { clearProps: "opacity,transform" }); };
  }, [step, p.ticker]);
  useEffect(() => { setStep(0); }, [p.ticker]);

  // Scroll lock, Escape, focus trap
  useEffect(() => {
    const bar = window.innerWidth - document.documentElement.clientWidth;
    const prevO = document.body.style.overflow;
    const prevP = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (bar > 0) document.body.style.paddingRight = `${bar}px`;

    const onKey = (e) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const els = panelRef.current.querySelectorAll(FOCUSABLE);
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevO;
      document.body.style.paddingRight = prevP;
    };
  }, [onClose]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const field = (k) => ({
    id: k, name: k, value: form[k], onChange: set(k), className: INPUT,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  const message =
    `Hello ${CONTACT.manager}, I'd like to apply for ${p.name} (${p.ticker}).\n` +
    `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n` +
    `Status: ${STATUSES.find(([v]) => v === form.status)?.[1] ?? ""}\n` +
    `Amount: ${amt ? fmt(amt) : ""}\nSource of funds: ${form.source}\n` +
    `Withdrawal: ${form.withdrawal === "locked" ? `Locked, ${form.months} months` : "Standard"}`;
  const waHref = `${CONTACT.whatsappLink}?text=${encodeURIComponent(message)}`;

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(form, p);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) { formRef.current?.querySelector(`[name="${first}"]`)?.focus(); return; }
    setFailed(false);
    if (onSubmit) {
      setBusy(true);
      try { await onSubmit({ portfolio: p.ticker, ...form, amount: amt }); }
      catch { setFailed(true); setBusy(false); return; }
      setBusy(false);
    }
    setStep(2);
  };

  const titles = [p.name, "Check your eligibility", onSubmit ? "Application received" : "Application ready"];
  const showBiz = form.status === "business-owner" || form.status === "self-employed";

  return createPortal(
    <div
      ref={backdropRef}
      style={{ ...FF, "--accent": s.accent }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panelRef}
        role="dialog" aria-modal="true" aria-labelledby="pm-title"
        className="relative grid max-h-[94vh] w-full max-w-4xl overflow-hidden rounded-t-3xl border border-white/10 bg-[#0A0F1C] text-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:grid-cols-[300px_1fr] sm:rounded-3xl"
      >
        {/* Poster */}
        <aside
          className="relative hidden flex-col justify-between overflow-hidden p-8 md:flex"
          style={{ background: `radial-gradient(120% 70% at 0% 0%, color-mix(in srgb, ${s.accent} 38%, transparent), transparent 65%), #0D1424` }}
        >
          <Grain />
          <p className="relative text-sm text-white/65">{s.label} portfolio</p>
          <div className="relative">
            <p className="break-all text-7xl font-extrabold leading-none text-[var(--accent)]">{p.ticker}</p>
            <p className="mt-3 text-xl font-bold">{p.name}</p>
          </div>
          <dl className="relative space-y-3 text-sm">
            <div><dt className="text-white/50">Investment range</dt><dd className="font-bold">{p.range}</dd></div>
            <div><dt className="text-white/50">Cycle</dt><dd className="font-bold">{p.cycle}</dd></div>
          </dl>
        </aside>

        {/* Content */}
        <div ref={bodyRef} className="relative overflow-y-auto overscroll-contain p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <ol className="flex flex-1 gap-2" aria-label="Progress">
              {STEPS.map((l, i) => (
                <li key={l} aria-current={i === step ? "step" : undefined} className="flex-1">
                  <span className={`block h-1 rounded-full transition-colors ${i <= step ? "bg-[var(--accent)]" : "bg-white/15"}`} />
                  <span className={`mt-1.5 block text-xs ${i === step ? "font-bold text-white" : "text-white/45"}`}>{l}</span>
                </li>
              ))}
            </ol>
            <button
              type="button" onClick={onClose} aria-label="Close"
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 ${RING}`}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <p data-step className="mt-6 text-sm font-bold text-[var(--accent)] md:hidden">{p.ticker}</p>
          <h3 id="pm-title" ref={headingRef} tabIndex={-1} className="mt-2 text-3xl font-extrabold leading-tight outline-none sm:text-4xl md:mt-6">
            {titles[step]}
          </h3>

          {/* Step 0: overview */}
          {step === 0 && (
            <div className="mt-4 space-y-6">
              <p data-step className="text-base text-white/70">{p.description}</p>
              <dl data-step className="grid gap-3 sm:grid-cols-3">
                {[["Investment range", p.range], ["Cycle", p.cycle], ["Suited to", s.label]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <dt className="text-xs text-white/50">{k}</dt>
                    <dd className="mt-1 text-sm font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
              <section data-step aria-labelledby="pm-w">
                <h4 id="pm-w" className="text-sm font-bold">Withdrawal options</h4>
                <ul className="mt-2 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {WITHDRAWAL_TERMS.map((t) => (
                    <li key={t.value} className="px-4 py-3 text-sm text-white/70"><strong className="mr-1.5 text-white">{t.label}</strong>{t.text}</li>
                  ))}
                </ul>
              </section>
              <p data-step className="text-sm text-white/60">
                To apply you’ll share your contact details, your status, how much you plan to invest and where the money comes from. It takes about two minutes.
              </p>
              <p data-step className="text-xs leading-relaxed text-white/45">{RISK_NOTICE}</p>
              <button
                data-step type="button" onClick={() => setStep(1)}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-extrabold text-[#070B14] transition-transform hover:-translate-y-0.5 ${RING}`}
              >
                Start application <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Step 1: qualification form */}
          {step === 1 && (
            <form ref={formRef} onSubmit={submit} noValidate className="mt-5 space-y-4">
              <div data-step className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Full name" error={errors.name} className="sm:col-span-2">
                  <input {...field("name")} autoComplete="name" placeholder="Ama Mensah" />
                </Field>
                <Field id="phone" label="Phone (WhatsApp)" error={errors.phone}>
                  <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="+233 5X XXX XXXX" />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input {...field("email")} type="email" autoComplete="email" placeholder="you@example.com" />
                </Field>
                <Field id="status" label="I am a" error={errors.status}>
                  <select {...field("status")}>
                    <option value="">Select</option>
                    {STATUSES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </Field>
                {form.status === "student" && (
                  <Field id="institution" label="School or university" error={errors.institution}>
                    <input {...field("institution")} placeholder="University of Ghana" />
                  </Field>
                )}
                {showBiz && (
                  <Field id="business" label="Business name" error={errors.business}>
                    <input {...field("business")} placeholder="Your business" />
                  </Field>
                )}
              </div>

              <div data-step className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Field id="amount" label={`Amount to invest${p.min != null ? ` (${p.range})` : " (GHS)"}`} error={errors.amount}>
                    <input {...field("amount")} inputMode="decimal" placeholder={p.min != null ? String(p.min) : "0.00"} />
                  </Field>
                  {errors.amount && match && match.portfolio.ticker !== p.ticker && (
                    <button type="button" onClick={() => onSwitch(match)} className={`mt-2 rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-bold text-[var(--accent)] ${RING}`}>
                      {fmt(amt)} fits {match.portfolio.name}. Switch
                    </button>
                  )}
                </div>
                <Field id="source" label="Source of funds" error={errors.source}>
                  <select {...field("source")}>
                    <option value="">Select</option>
                    {SOURCES.map((x) => <option key={x}>{x}</option>)}
                  </select>
                </Field>
              </div>

              <fieldset data-step>
                <legend className="mb-1.5 text-xs font-semibold text-white/70">Withdrawal preference</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {WITHDRAWAL_TERMS.map((t) => (
                    <label key={t.value} className="block cursor-pointer">
                      <input type="radio" name="withdrawal" value={t.value} checked={form.withdrawal === t.value} onChange={set("withdrawal")} className="peer sr-only" />
                      <span className="block rounded-xl border border-white/15 bg-white/5 p-3 text-sm text-white/70 transition-colors peer-checked:border-[var(--accent)] peer-checked:bg-white/10 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)]">
                        <strong className="block text-white">{t.label}</strong>{t.text}
                      </span>
                    </label>
                  ))}
                </div>
                {form.withdrawal === "locked" && (
                  <Field id="months" label="Lock duration (months)" error={errors.months} className="mt-3 sm:w-1/2">
                    <input {...field("months")} inputMode="numeric" placeholder="6" />
                  </Field>
                )}
              </fieldset>

              <div data-step className="space-y-3">
                {[["age", "I am 18 years or older."], ["risk", "I understand that returns are not guaranteed and my capital is at risk."]].map(([k, l]) => (
                  <div key={k}>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-white/75">
                      <input type="checkbox" name={k} checked={form[k]} onChange={set(k)} aria-invalid={errors[k] ? true : undefined} aria-describedby={errors[k] ? `${k}-err` : undefined} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]" />
                      {l}
                    </label>
                    {errors[k] && <p id={`${k}-err`} role="alert" className="mt-1 text-xs text-[#FF8A75]">{errors[k]}</p>}
                  </div>
                ))}
              </div>

              {failed && <p role="alert" className="text-sm text-[#FF8A75]">We couldn’t send your application. Check your connection and try again.</p>}

              <div data-step className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                <button type="button" onClick={() => setStep(0)} className={`rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold hover:bg-white/10 ${RING}`}>Back</button>
                <button type="submit" disabled={busy} className={`flex-1 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-extrabold text-[#070B14] transition-transform hover:-translate-y-0.5 disabled:opacity-60 ${RING}`}>
                  {busy ? "Submitting…" : "Submit application"}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: done */}
          {step === 2 && (
            <div className="mt-4 space-y-6">
              <p data-step className="flex items-start gap-3 text-base text-white/75">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-[#070B14]"><Check className="h-4 w-4" aria-hidden="true" /></span>
                {onSubmit
                  ? `Thanks, ${form.name.split(" ")[0]}. ${CONTACT.manager} will contact you about ${p.name}.`
                  : `You qualify for ${p.name}. Send your details to ${CONTACT.manager} on WhatsApp to complete your application.`}
              </p>
              <dl data-step className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 text-sm">
                {[["Portfolio", `${p.name} (${p.ticker})`], ["Amount", fmt(amt)], ["Withdrawal", form.withdrawal === "locked" ? `Locked, ${form.months} months` : "Standard"], ["Contact", `${form.phone} · ${form.email}`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-3"><dt className="text-white/50">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>
                ))}
              </dl>
              <div data-step className="flex flex-col gap-3 sm:flex-row">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-extrabold text-[#070B14] ${RING}`}>
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {onSubmit ? "Also message on WhatsApp" : "Send on WhatsApp"}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <button type="button" onClick={onClose} className={`rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold hover:bg-white/10 ${RING}`}>Close</button>
              </div>
            </div>
          )}

          {/* Contact */}
          <ul data-step className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs text-white/55">
            <li className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" aria-hidden="true" /><a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="hover:text-white">{CONTACT.phones[0]}</a></li>
            <li className="flex items-center gap-1.5"><Send className="h-3.5 w-3.5" aria-hidden="true" /><a href={CONTACT.telegram.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{CONTACT.telegram.label}</a></li>
            <li className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" aria-hidden="true" /><a href={`mailto:${CONTACT.email}`} className="break-all hover:text-white">{CONTACT.email}</a></li>
            <li className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{CONTACT.location}</li>
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Props (all optional):
 *  - heroImage / heroImageAlt: still or poster frame shown beside the heading
 *  - guideLabel: text for the top pill
 *  - onSubmit(payload): async handler that receives the completed application.
 *    If omitted, the visitor sends the application via a pre-filled WhatsApp message.
 */
const PortfolioSection = ({
  heroImage,
  heroImageAlt = "",
  guideLabel = "Portfolio guide | Oct 2026",
  onSubmit,
}) => {
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const [active, setActive] = useState(null);
  const all = SEGMENTS.flatMap((segment) => segment.portfolios.map((portfolio) => ({ portfolio, segment })));

  const open = (it, e) => { triggerRef.current = e.currentTarget; setActive(it); };
  const close = () => { setActive(null); requestAnimationFrame(() => triggerRef.current?.focus()); };
  const spot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The one orchestrated moment: headline lines rise out of a mask
        gsap.timeline({ defaults: { ease: "power4.out" }, scrollTrigger: { trigger: "[data-header]", start: "top 85%", once: true } })
          .from("[data-line]", { yPercent: 110, duration: 1, stagger: 0.12 })
          .from("[data-head]", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.6");

        gsap.utils.toArray("[data-chapter]").forEach((ch) => {
          gsap.from(ch.querySelectorAll("[data-item]"), {
            y: 36, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: ch, start: "top 80%", once: true },
          });
        });

        gsap.from("[data-cta]", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: "[data-cta]", start: "top 92%", once: true } });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef} id="portfolio" aria-labelledby="portfolio-heading" style={FF}
      className="relative overflow-x-clip bg-[#070B14] py-20 text-white sm:py-28"
    >
      <style>{FONT_CSS}</style>
      <Grain />
      {/* stage light and vignette */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]" style={{ background: "radial-gradient(60% 70% at 70% 0%, rgba(255,198,41,0.18), transparent 70%), radial-gradient(40% 50% at 0% 20%, rgba(127,168,255,0.12), transparent 70%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55))" }} />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div data-header className={`grid items-end gap-10 ${heroImage ? "md:grid-cols-[1.4fr_1fr]" : ""}`}>
          <div>
            <p data-head className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[#FFC629] backdrop-blur">
              {guideLabel}
            </p>
            <h2 id="portfolio-heading" className="mt-6 text-[clamp(2.6rem,8vw,5.75rem)] font-extrabold leading-[0.95] tracking-tight">
              {["Which F1 Capital", "portfolio fits", "your next move?"].map((l) => (
                <span key={l} className="block overflow-hidden pb-[0.08em]"><span data-line className="block">{l}</span></span>
              ))}
            </h2>
            <p data-head className="mt-6 max-w-md text-lg text-white/65">
              A structured guide for students, investors and business owners. Pick a portfolio, then check if you qualify.
            </p>
            <ul data-head className="mt-7 flex flex-wrap gap-2">
              {SEGMENTS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} style={{ "--accent": s.accent }} className={`inline-block rounded-full border border-[var(--accent)] px-4 py-1.5 text-sm font-bold text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[#070B14] ${RING}`}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {heroImage && (
            <div data-head className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
              <img src={heroImage} alt={heroImageAlt} loading="lazy" className="aspect-[4/5] h-full w-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,11,20,0.75), transparent 55%)" }} />
              <Grain />
            </div>
          )}
        </div>

        {/* Chapters */}
        <div className="mt-20 space-y-14">
          {SEGMENTS.map((segment) => (
            <div key={segment.id} id={segment.id} data-chapter style={{ "--accent": segment.accent }} className="scroll-mt-24">
              <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-4">
                <div className="flex items-baseline gap-4">
                  <span aria-hidden="true" className="text-5xl font-extrabold text-transparent [-webkit-text-stroke:1px_var(--accent)] sm:text-7xl">{segment.number}</span>
                  <h3 className="text-2xl font-bold sm:text-3xl">{segment.label}</h3>
                </div>
                <p className="hidden text-sm text-white/55 sm:block">{segment.tagline}</p>
              </div>

              <div className="divide-y divide-white/10">
                {segment.portfolios.map((p) => (
                  <button
                    key={p.ticker} type="button" data-item aria-haspopup="dialog"
                    aria-label={`${p.name}, ${p.range}. View details and apply`}
                    onClick={(e) => open({ portfolio: p, segment }, e)}
                    onPointerMove={spot}
                    className={`group relative grid w-full cursor-pointer items-center gap-x-6 gap-y-2 overflow-hidden px-3 py-6 text-left sm:grid-cols-[90px_1fr_auto_auto] sm:px-5 ${RING} focus-visible:-outline-offset-2`}
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%)" }} />
                    <span className="relative text-xl font-extrabold text-[var(--accent)]">{p.ticker}</span>
                    <span className="relative block">
                      <span className="block text-xl font-bold sm:text-2xl">{p.name}</span>
                      <span className="mt-1 block text-sm text-white/60 sm:text-base">{p.description}</span>
                    </span>
                    <span className="relative flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                      <span className="whitespace-nowrap text-base font-extrabold sm:text-lg">{p.range}</span>
                      <span className="whitespace-nowrap rounded-full border border-white/20 px-3 py-0.5 text-xs text-white/60">{p.cycle}</span>
                    </span>
                    <span aria-hidden="true" className="absolute right-3 top-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[#070B14] sm:static">
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:-rotate-45" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Withdrawal terms */}
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {WITHDRAWAL_TERMS.map((t) => (
            <li key={t.value} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/65 sm:text-sm">
              <strong className="mr-1.5 text-white">{t.label}</strong>{t.text}
            </li>
          ))}
        </ul>

        {/* Call to action */}
        <div data-cta className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/10 p-8 sm:p-12" style={{ background: "radial-gradient(90% 120% at 100% 0%, rgba(255,198,41,0.22), transparent 60%), #0D1424" }}>
          <Grain />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-3xl font-extrabold sm:text-4xl">Not sure which one fits?</h3>
              <p className="mt-2 text-white/65">Talk to {CONTACT.manager}, {CONTACT.role}.</p>
            </div>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" style={{ "--accent": "#FFC629" }} className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#FFC629] px-7 py-4 text-sm font-extrabold text-[#070B14] transition-transform hover:-translate-y-0.5 ${RING}`}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

      {active && <PortfolioModal item={active} all={all} onSwitch={setActive} onClose={close} onSubmit={onSubmit} />}
    </section>
  );
};

export default PortfolioSection;