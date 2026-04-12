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
      ? "min-w-[100px] flex-1 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm"
      : "min-w-[100px] flex-1 rounded-xl border border-slate-600/25 bg-black/30 px-2.5 py-2";
  const labelCls =
    surface === "light"
      ? "text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-800/90"
      : "text-[9px] font-semibold uppercase tracking-[0.14em] text-[color:var(--cmp-mist)]";
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
      ? "flex flex-col border-t border-slate-200 bg-slate-50/95"
      : "flex flex-col border-t border-slate-600/20 bg-slate-950/35";
  const detailMuted =
    surface === "light" ? "text-slate-500" : "text-slate-500";
  const btn =
    surface === "light"
      ? "rounded-lg border border-blue-600/25 bg-blue-600/10 px-3 py-1.5 text-[11px] font-semibold text-blue-900 transition hover:border-blue-600/40 hover:bg-blue-600/15"
      : "rounded-lg border border-[color:var(--cmp-sage-border)] bg-[color:var(--cmp-sage-soft)] px-3 py-1.5 text-[11px] font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--cmp-sage-strong)] hover:bg-[color:rgba(125,158,148,0.2)]";
  return (
    <div className={shell}>
      <div
        className={`flex flex-wrap gap-2 px-4 pt-3 ${onFundedRules ? "pb-2" : "pb-3"}`}
      >
      <RuleCard label="Daily loss limit" surface={surface}>
        {rules.dailyLossLimit}
      </RuleCard>
      <RuleCard label="Sizing" surface={surface}>
        <span className="whitespace-pre-line">{rules.sizing}</span>
      </RuleCard>
      <RuleCard label="Consistency" surface={surface}>
        {normalizeConsistency(rules.consistency)}
      </RuleCard>
      <RuleCard label="Minimum days" surface={surface}>
        {rules.minDays}
      </RuleCard>
      <RuleCard label="Scalping" surface={surface}>
        <span>{rules.scalping}</span>
        {rules.scalpingDetail ? (
          <p className={`mt-0.5 text-[10px] ${detailMuted}`}>{rules.scalpingDetail}</p>
        ) : null}
      </RuleCard>
      <RuleCard label="Max accounts" surface={surface}>
        {rules.maxAccounts}
      </RuleCard>
      <RuleCard label="Platform license" surface={surface}>
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
            Funded Rules
          </button>
        </div>
      ) : null}
    </div>
  );
}
