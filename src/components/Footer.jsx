const Footer = () => {
  return (
    <footer className="bg-slate-200 text-[#111827]">
      <div className="mx-auto max-w-[1360px] px-5 pt-14 pb-10 sm:px-8 lg:px-12">

        {/* Main Footer */}
        <div className="flex flex-col justify-between gap-10 border-b border-gray-200 pb-10 md:flex-row md:items-start">

          {/* Brand */}
          <a href="#home" className="group flex w-fit items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-[#111827] text-lg font-extrabold tracking-tight text-white transition-colors group-hover:bg-[#C6A66B]">
              F1
            </span>

            <span>
              <span className="block text-base font-bold tracking-[0.12em]">
                F1 CAPITAL
              </span>
              <span className="mt-0.5 block text-xs tracking-wide text-gray-500">
                Feenicks1 Solutions Ltd
              </span>
            </span>
          </a>

          {/* Navigation */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-gray-500">
              <a href="#home" className="transition-colors hover:text-[#111827]">
                Home
              </a>
              <a href="#portfolio" className="transition-colors hover:text-[#111827]">
                Portfolio
              </a>
              <a href="#why-us" className="transition-colors hover:text-[#111827]">
                Why Choose Us
              </a>
              <a href="#contact" className="transition-colors hover:text-[#111827]">
                Contact
              </a>
            </nav>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col justify-between gap-6 pt-7 md:flex-row md:items-end">

          <div className="max-w-3xl">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Investment Disclaimer
            </p>

            <p className="text-xs leading-6 text-gray-500 sm:text-[13px]">
              Investments are subject to market risks, and returns are not
              guaranteed. Past performance is not indicative of future results.
              Investors should carefully review all portfolio terms, associated
              risks, and relevant documentation before making investment decisions.
            </p>
          </div>

          <p className="shrink-0 text-xs text-gray-400">
            © {new Date().getFullYear()} F1 Capital.
            <span className="ml-1">All rights reserved.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;