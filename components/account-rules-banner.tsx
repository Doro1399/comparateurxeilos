import type { ReactNode } from "react";
import { PlatformLogos } from "@/components/platform-logos";
import type { AccountRulesBrief } from "@/lib/prop-firms";

type Props = {
  rules: AccountRulesBrief;
  /** Opens journal-style funded rules (e.g. from Compare). */
  onFundedRules?: () => void;
  /** Compare « feuille » : cartes lisibles sur fond clair. */
  surface?: "dark" | "light";
};

function normalizeConsistency(value: string): string {
  const v = value.trim();
  if (v === "-" || v === "—" || v === "–") return "—";
  return value;
}

function RuleCard({
  label,
  children,
  surface,
}: {
  label: string;
  children: ReactNode;
  surface: "dark" | "light";
}) {
  const card =
    surface === "light"
      ? "min-w-[100px] flex-1 rounded-xl border border-rose-200/80 bg-white px-2.5 py-2 shadow-sm"
      : "min-w-[100px] flex-1 rounded-xl border border-[color:var(--cmp-sage-border)]/50 bg-[color:var(--cmp-ink-900)]/55 px-2.5 py-2";
  const labelCls =
    surface === "light"
      ? "text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-900/85"
      : "text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cmp-mint)]";
  const bodyCls =
    surface === "light"
      ? "mt-1 text-[11px] leading-snug text-slate-800"
      : "mt-1 text-[11px] leading-snug text-white/82";
  return (
    <div className={card}>
      <p className={labelCls}>{label}</p>
      <div className={bodyCls}>{children}</div>
    </div>
  );
}

export function AccountRulesBanner({
  rules,
  onFundedRules,
  surface = "dark",
}: Props) {
  const shell =
    surface === "light"
      ? "flex flex-col border-t border-rose-200/70 bg-rose-50/90"
      : "flex flex-col border-t border-[color:var(--cmp-sage-border)]/40 bg-[color:var(--cmp-ink-950)]/45";
  const detailMuted =
    surface === "light"
      ? "text-rose-900/55"
      : "text-[color:var(--cmp-steel)]";
  const btn =
    surface === "light"
      ? "rounded-lg border border-rose-700/25 bg-rose-700/10 px-3 py-1.5 text-[11px] font-semibold text-rose-950 transition hover:border-rose-700/40 hover:bg-rose-700/15"
      : "rounded-lg border border-[color:var(--cmp-sage-border)] bg-[color:var(--cmp-sage-soft)] px-3 py-1.5 text-[11px] font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--cmp-sage-strong)] hover:bg-[color:var(--cmp-hover-mid)]";
  return (
    <div className={shell}>
      <div
        className={`flex flex-wrap gap-2 px-4 pt-3 ${onFundedRules ? "pb-2" : "pb-3"}`}
      >
      <RuleCard label="Perte journalière max." surface={surface}>
        {rules.dailyLossLimit}
      </RuleCard>
      <RuleCard label="Sizing" surface={surface}>
        <span className="whitespace-pre-line">{rules.sizing}</span>
      </RuleCard>
      <RuleCard label="Consistance" surface={surface}>
        {normalizeConsistency(rules.consistency)}
      </RuleCard>
      <RuleCard label="Jours minimum" surface={surface}>
        {rules.minDays}
      </RuleCard>
      <RuleCard label="Scalping" surface={surface}>
        <span>
          {/^allowed$/i.test(rules.scalping.trim())
            ? "Autorisé"
            : /^not allowed$/i.test(rules.scalping.trim())
              ? "Interdit"
              : rules.scalping}
        </span>
        {rules.scalpingDetail ? (
          <p className={`mt-0.5 text-[10px] ${detailMuted}`}>{rules.scalpingDetail}</p>
        ) : null}
      </RuleCard>
      <RuleCard label="Comptes max." surface={surface}>
        {rules.maxAccounts}
      </RuleCard>
      <RuleCard label="Licence plateforme" surface={surface}>
        <div className="mt-1">
          <PlatformLogos platforms={rules.licensePlatforms} compact />
        </div>
      </RuleCard>
      </div>
      {onFundedRules ? (
        <div className="flex justify-center px-4 pb-3 pt-0">
          <button
            type="button"
            data-row-click-ignore="true"
            onClick={(e) => {
              e.stopPropagation();
              onFundedRules();
            }}
            className={btn}
          >
            Règles du compte financé
          </button>
        </div>
      ) : null}
    </div>
  );
}
