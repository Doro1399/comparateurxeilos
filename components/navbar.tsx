import Link from "next/link";

type NavbarProps = {
  /** Feuille claire Xelos (rare). */
  theme?: "dark" | "sheet" | "petrol";
};

export default function Navbar({ theme = "dark" }: NavbarProps) {
  const sheet = theme === "sheet";
  const petrol = theme === "petrol";
  const header = sheet
    ? "sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-sm"
    : petrol
      ? "sticky top-0 z-50 w-full border-b border-[color:rgba(125,158,148,0.28)] bg-[color:rgba(16,22,21,0.92)] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      : "sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0f18]/88 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";
  const title = sheet
    ? "text-2xl font-semibold tracking-[-0.03em] text-slate-900"
    : petrol
      ? "text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]"
      : "text-2xl font-semibold tracking-[-0.03em] text-white";
  const navLink = sheet
    ? "rounded-lg px-2 py-1 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
    : petrol
      ? "rounded-lg px-2 py-1 text-sm text-white/60 transition hover:bg-white/[0.06] hover:text-[color:var(--foreground)]"
      : "rounded-lg px-2 py-1 text-sm text-white/65 transition hover:bg-white/[0.06] hover:text-white";
  const cta = sheet
    ? "rounded-xl border border-blue-700/20 bg-gradient-to-b from-blue-700 to-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-blue-600 hover:to-blue-700"
    : petrol
      ? "rounded-xl border border-[color:rgba(157,188,178,0.38)] bg-gradient-to-b from-[#2c3b36] to-[#1c2825] px-5 py-2.5 text-sm font-semibold text-[#eef4f1] shadow-md transition hover:from-[#354a42] hover:to-[#24332f]"
      : "rounded-xl border border-white/15 bg-gradient-to-b from-white to-white/90 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(0,0,0,0.25)] transition hover:border-sky-400/40 hover:from-sky-50 hover:to-white";

  return (
    <header className={header}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className={title}>
          Comparateur
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/compare" className={navLink}>
            Compare
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/compare" className={cta}>
            Compare
          </Link>
        </div>
      </div>
    </header>
  );
}
