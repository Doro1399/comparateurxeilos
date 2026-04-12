import type {
  ApexAccountRulesCard,
  ApexEvalRulesLayout,
  ApexFundedRulesLayout,
  ApexRulesRow,
  RuleLabelInfoPopover,
} from "@/lib/journal/apex-journal-rules";
import { FIFTY_PERCENT_ACCOUNT_BALANCE_PAYOUT_NOTE } from "@/lib/journal/fifty-percent-payout-note";

const FIFTY_PERCENT_NOTE_FR =
  "Demander jusqu’à 50 % du solde du compte par retrait ; les 50 % restants demeurent comme buffer.";

const FNF_MLL_NOTE_EN =
  "The first withdrawal resets the maximum loss limit (MLL) back to the initial balance.";
const FNF_MLL_NOTE_FR =
  "Le premier retrait réinitialise la perte maximale (MLL) sur le solde initial.";

/** Libellés de colonnes / lignes (EN → FR) pour la modal funded du comparateur uniquement. */
const RULE_LABEL_FR: Record<string, string> = {
  Rules: "Règles",
  "Drawdown type": "Type de drawdown",
  "Drawdown Type": "Type de drawdown",
  /** Sizing, Trading news, Buffer, Payout mini / max : laissés en anglais (demande produit). */
  "Profit Target": "Objectif de profit",
  "Profit target": "Objectif de profit",
  Drawdown: "Drawdown",
  "Overnight / Overweek": "Overnight / week-end",
  DLL: "DLL",
  "DLL (Daily Loss Limit)": "DLL (perte max. journalière)",
  "Payout rules": "Règles de paiement",
  "Payout Rules": "Règles de paiement",
  "Mini Profit Days": "Jours de profit minimum",
  "Profit split": "Partage des profits",
  "Scaling Plan": "Plan de scaling",
  "Scaling plan": "Plan de scaling",
  /** Libellé unifié « max » côté UI. */
  "Payout maxi": "Payout max",
  Notes: "Notes",
  "Max drawdown": "Drawdown maximum",
  Note: "Note",
  "Daily loss limit": "Perte journalière max.",
  Consistency: "Consistance",
  "Minimum days": "Jours minimum",
  "Minimum trading days": "Jours de trading minimum",
  Scalping: "Scalping",
  "Max accounts": "Comptes max.",
  "Platform license": "Licence plateforme",
  "Profit goal (payout req.)": "Objectif profit (retrait)",
  "Profit goals": "Objectifs de profit",
};

function trLabel(s: string): string {
  return RULE_LABEL_FR[s] ?? s;
}

function trPopover(p: RuleLabelInfoPopover): RuleLabelInfoPopover {
  return {
    lead: trRuleBody(p.lead),
    entries: p.entries.map((e) => ({
      label: trLabel(e.label),
      value: trRuleBody(e.value),
    })),
  };
}

/** Valeurs courantes et fragments répétés dans les cellules de règles. */
function trRuleBody(v: string): string {
  if (v === FIFTY_PERCENT_ACCOUNT_BALANCE_PAYOUT_NOTE) {
    return FIFTY_PERCENT_NOTE_FR;
  }
  if (v === FNF_MLL_NOTE_EN) return FNF_MLL_NOTE_FR;
  if (v === "None") return "Aucune";
  const trimmed = v.trim();
  if (/^allowed$/i.test(trimmed)) return "Autorisé";
  if (/^not allowed$/i.test(trimmed)) return "Interdit";

  let o = v;
  o = o.replace(/^Consistency /gm, "Consistance ");
  o = o.replace(/(\d+) profit days:/g, "$1 jours de profit :");
  o = o.replace(/Min trading days:/g, "Jours de trading min. :");
  o = o.replace(/1st payout:/g, "1er retrait :");
  o = o.replace(/After 1st:/g, "Après le 1er :");
  o = o.replace(/\btampon\b/gi, "buffer");
  return o;
}

function trRow(row: ApexRulesRow): ApexRulesRow {
  return {
    ...row,
    label: trLabel(row.label),
    value: trRuleBody(row.value),
    labelInfoTooltip: row.labelInfoTooltip
      ? trRuleBody(row.labelInfoTooltip)
      : undefined,
    labelInfoPopover: row.labelInfoPopover
      ? trPopover(row.labelInfoPopover)
      : undefined,
  };
}

function trEval(layout: ApexEvalRulesLayout): ApexEvalRulesLayout {
  return {
    rules: trRow(layout.rules),
    drawdownType: trRow(layout.drawdownType),
    sizing: trRow(layout.sizing),
    profitTarget: trRow(layout.profitTarget),
    tradingNews: trRow(layout.tradingNews),
    drawdown: trRow(layout.drawdown),
    overnight: trRow(layout.overnight),
    dll: trRow(layout.dll),
  };
}

function trFunded(layout: ApexFundedRulesLayout): ApexFundedRulesLayout {
  return {
    column1: layout.column1.map(trRow),
    column2: layout.column2.map(trRow),
    column3: layout.column3.map(trRow),
  };
}

/** Traduction affichage — utilisée uniquement par `CompareFundedRulesModal`. */
export function translateCompareFundedRulesCardToFr(
  card: ApexAccountRulesCard | null
): ApexAccountRulesCard | null {
  if (!card) return null;
  if (card.phase === "eval") {
    return { phase: "eval", evalLayout: trEval(card.evalLayout) };
  }
  return { phase: "funded", fundedLayout: trFunded(card.fundedLayout) };
}
