import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Portfolio from "./Portfolio";
import Contactsection from "../components/Contactsection";
import Benefits from "./Benefits";
import benefitsVideo from "../assets/feenickx.mp4";
import Footer from "./Footer";


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
      className="min-h-screen overflow-hidden bg-slate-200 text-[#101f3d]"
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
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
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
      <Benefits videoSrc={benefitsVideo} videoPoster="" />
      <Contactsection />

       

      {/* Footer */}
      {/* <footer className="bg-white px-5 py-8 text-black sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-white text-lg font-black text-black">
              F1
            </span>
            <span>
              <span className="block font-bold">F1 CAPITAL</span>
              <span className="text-xs text-black">Feenicks1 Solutions Ltd</span>
            </span>
          </a>

          <nav className="flex flex-wrap gap-5 text-sm text-black-300">
            <a href="#home" className="hover:text-black">Home</a>
            <a href="#portfolio" className="hover:text-black">Portfolio</a>
            <a href="#why-us" className="hover:text-black">Why Us</a>
            <a href="#contact" className="hover:text-black">Contact</a>
          </nav>
        </div>

        <div className="mx-auto mt-7 max-w-[1360px] border-t border-white/10 pt-5 text-[16px] leading-6 text-black">
          Investments are subject to market risk. Returns are not guaranteed.
          Past performance does not indicate future results. Review all
          portfolio terms and related documents carefully before investing.
          <p className="mt-2">© {new Date().getFullYear()} F1 Capital. All rights reserved.</p>
        </div>
      </footer> */}

 <Footer />




    </main>
  );
}
