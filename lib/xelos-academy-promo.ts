import type { PropFirm } from "@/lib/prop-firms";

/** Codes promo partagés par Xelos Academy — affichage compare + copie. */
const ACADEMY_PROMO_BY_FIRM: Record<string, string> = {
  "Apex Trader Funding": "GANBYXAW",
  TopStep: "",
  Bulenox: "hirobym",
  "Take Profit Trader": "XEILOSTRADING",
  Tradeify: "6923",
  "Funded Next Futures": "TRADING",
  "Funded Futures Network": "MYFFN50",
  "Lucid Trading": "XEILOSTRADING",
  "My Funded Futures": "TPF",
  Blusky: "30OFF",
  TradeDay: "NOFEE30",
  Phidias: "EGGHUNT26",
  "Elite Trader Funding": "APRIL90",
  DayTraders: "XZAAUYML",
  "Taurus Arena": "FUTURSCALP",
};

export function xelosAcademyPromoForFirm(firmName: string): string | undefined {
  if (Object.prototype.hasOwnProperty.call(ACADEMY_PROMO_BY_FIRM, firmName)) {
    return ACADEMY_PROMO_BY_FIRM[firmName];
  }
  return undefined;
}

/** Code promo affiché / copié (priorité au mapping Xelos quand défini). */
export function comparePromoDisplay(firm: PropFirm): string {
  const academy = xelosAcademyPromoForFirm(firm.name);
  if (academy !== undefined) return academy;
  return firm.promo;
}
