import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/* Data: edit here, the UI follows                                             */
/* -------------------------------------------------------------------------- */

const SEGMENTS = [
  {
    id: "student",
    number: "01",
    label: "Student",
    tagline: "Start small. Build the habit.",
    tone: "gold",
    portfolios: [
      {
        ticker: "$MFC",
        name: "Mutual Fund Capital",
        description: "Entry-level, diversified managed portfolio",
        range: "GHS 150 – 499.99",
        cycle: "28-day cycle",
      },
    ],
  },
  {
    id: "investor",
    number: "02",
    label: "Investor",
    tagline: "Scale with structure.",
    tone: "navy",
    portfolios: [
      {
        ticker: "$IC",
        name: "Investwise Capital",
        description: "Broader market exposure for growing capital",
        range: "GHS 500 – 4,999.99",
        cycle: "28-day cycle",
      },
      {
        ticker: "$ABC",
        name: "Agribusiness Capital",
        description: "Participation in licensed agribusiness firms",
        range: "GHS 5,000 – 9,999.99",
        cycle: "3-month cycle",
      },
    ],
  },
  {
    id: "business-owner",
    number: "03",
    label: "Business Owner",
    tagline: "Put capital to work.",
    tone: "coral",
    portfolios: [
      {
        ticker: "$REPF",
        name: "Real Estate Pool Fund",
        description: "Pooled real-estate participation, no property management",
        range: "GHS 10,000 – 100,000",
        cycle: "6-month cycle",
      },
    ],
  },
];

const WITHDRAWAL_TERMS = [
  { label: "Standard", text: "Fixed cycles with Express Withdrawal" },
  { label: "Locked", text: "Your chosen duration, minimum 6 months" },
];

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

/* Tailwind needs full class strings, so tones are mapped, not interpolated. */
const TONES = {
  gold: {
    tile: "bg-[#FFC629] text-[#0B1B3A]",
    ticker: "bg-[#FFC629] text-[#0B1B3A]",
    price: "bg-[#FFF1C9] text-[#0B1B3A]",
  },
  navy: {
    tile: "bg-[#0B1B3A] text-white",
    ticker: "bg-[#0B1B3A] text-white",
    price: "bg-[#DDE8FB] text-[#0B1B3A]",
  },
  coral: {
    tile: "bg-[#DC4A34] text-white",
    ticker: "bg-[#DC4A34] text-white",
    price: "bg-[#FDE3DE] text-[#0B1B3A]",
  },
};

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Props (all optional):
 *  - heroImage: illustration shown beside the heading
 *  - heroImageAlt: alt text for the illustration
 *  - guideLabel: text for the top pill
 */
const PortfolioSection = ({
  heroImage,
  heroImageAlt = "",
  guideLabel = "Portfolio guide | Oct 2026",
}) => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Motion only runs when the visitor has not asked for reduced motion.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Heading block
        gsap.from("[data-head]", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-header]", start: "top 85%", once: true },
        });

        // 2. Each audience row: tile slides in, portfolio cards follow, prices pop
        gsap.utils.toArray("[data-row]").forEach((row) => {
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          });

          tl.from(row.querySelector("[data-tile]"), { x: -48, opacity: 0, duration: 0.7 })
            .from(
              row.querySelectorAll("[data-item]"),
              { x: 48, opacity: 0, duration: 0.6, stagger: 0.12 },
              "<0.1"
            )
            .from(
              row.querySelectorAll("[data-price]"),
              { scale: 0.8, opacity: 0, duration: 0.4, ease: "back.out(2)", stagger: 0.12 },
              "-=0.4"
            );
        });

        // 3. Terms and call to action
        gsap.from("[data-terms]", {
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: "[data-terms]", start: "top 95%", once: true },
        });

        gsap.from("[data-cta]", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-cta]", start: "top 90%", once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative overflow-x-clip bg-[#FDF8F1] py-16 sm:py-24"
    >
      {/* soft background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FFE9A8]/60 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-72 h-56 w-56 rounded-full bg-[#F9D9D2]/60 blur-2xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div
          data-header
          className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]"
        >
          <div>
            <p
              data-head
              className="inline-block rounded-full border border-[#B8860B] px-4 py-1.5 text-xs font-semibold text-[#8A6508]"
            >
              {guideLabel}
            </p>

            <h2
              id="portfolio-heading"
              data-head
              className="mt-5 text-4xl font-extrabold text-[#0B1B3A] sm:text-5xl inline-block"
            >
              Which F1 Capital portfolio fits{" "}
              
            </h2>

            <p data-head className="mt-5 max-w-md text-lg text-[#46506A]">
              A structured guide for students, investors and business owners.
            </p>

            <ul data-head className="mt-6 flex flex-wrap gap-2">
              {SEGMENTS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`inline-block rounded-full px-4 py-1.5 text-sm font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1B3A] ${TONES[s.tone].ticker}`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {heroImage && (
            <div
              data-head
              className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_20px_50px_-20px_rgba(11,27,58,0.35)]"
            >
              <img
                src={heroImage}
                alt={heroImageAlt}
                loading="lazy"
                className="h-full w-full rounded-[1.5rem] object-cover"
              />
            </div>
          )}
        </div>

        {/* Audience rows */}
        <div className="mt-12 space-y-4">
          {SEGMENTS.map((segment) => {
            const tone = TONES[segment.tone];
            return (
              <div
                key={segment.id}
                id={segment.id}
                data-row
                className="grid scroll-mt-24 gap-3 md:grid-cols-[220px_1fr]"
              >
                {/* Audience tile */}
                <div
                  data-tile
                  className={`flex flex-col justify-between rounded-3xl p-5 md:min-h-[8.5rem] ${tone.tile}`}
                >
                  <span className="w-fit rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-[#0B1B3A]">
                    {segment.number}
                  </span>
                  <div className="mt-4">
                    <h3 className="text-xl font-extrabold leading-tight">
                      {segment.label}
                    </h3>
                    <p className="mt-1 text-sm opacity-80">{segment.tagline}</p>
                  </div>
                </div>

                {/* Portfolios */}
                <div className="divide-y divide-[#EFE7DA] overflow-hidden rounded-3xl bg-white shadow-[0_12px_30px_-18px_rgba(11,27,58,0.3)]">
                  {segment.portfolios.map((p) => (
                    <article
                      key={p.ticker}
                      data-item
                      className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-5 py-4 sm:px-7 sm:py-5"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${tone.ticker}`}
                        >
                          {p.ticker}
                        </span>
                        <h4 className="text-lg font-extrabold text-[#0B1B3A] sm:text-xl">
                          {p.name}
                        </h4>
                      </div>

                      <span
                        data-price
                        className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-extrabold sm:text-base ${tone.price}`}
                      >
                        {p.range}
                      </span>

                      <p className="text-sm text-[#46506A] sm:text-base">
                        {p.description}
                      </p>

                      <span className="whitespace-nowrap rounded-full border border-[#E4DACB] px-3 py-1 text-xs text-[#5B6478]">
                        {p.cycle}
                      </span>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Withdrawal terms */}
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {WITHDRAWAL_TERMS.map((t) => (
            <li
              key={t.label}
              data-terms
              className="rounded-full border border-[#E4DACB] bg-white px-4 py-2 text-xs text-[#46506A] sm:text-sm"
            >
              <strong className="mr-1.5 text-[#0B1B3A]">{t.label}</strong>
              {t.text}
            </li>
          ))}
        </ul>

        {/* Call to action */}
        
      </div>
    </section>
  );
};

export default PortfolioSection;