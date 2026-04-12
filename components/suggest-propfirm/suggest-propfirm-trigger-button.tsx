type Props = {
  onClick: () => void;
};

/** CTA premium bas de menu latéral — ouvre la modale de suggestion. */
export function SuggestPropfirmTriggerButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-xl border border-[color:var(--cmp-sage-strong)]/55 bg-gradient-to-br from-[color:var(--cmp-sage-soft)] via-[color:var(--cmp-compare-active-bg)] to-[color:var(--cmp-ink-900)] px-4 py-3.5 text-left shadow-[0_10px_32px_rgba(0,0,0,0.38)] ring-1 ring-[color:var(--cmp-mint)]/15 transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--cmp-mint)]/45 hover:shadow-[0_14px_40px_rgba(190,60,74,0.22)] active:translate-y-0"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      >
        <span className="absolute -left-1/4 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm" />
      </span>
      <span className="relative flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[color:var(--cmp-sage-border)] bg-black/25 text-[color:var(--cmp-mint)] shadow-inner shadow-black/20">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-semibold tracking-tight text-white">
            Proposer une propfirm
          </span>
          <span className="mt-0.5 block text-[11px] leading-snug text-[color:var(--cmp-steel)]">
            Une firme fiable à ajouter ? Clique ici.
          </span>
        </span>
        <svg
          className="h-4 w-4 shrink-0 text-[color:var(--cmp-steel)] transition group-hover:translate-x-0.5 group-hover:text-[color:var(--cmp-mint)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </span>
    </button>
  );
}
