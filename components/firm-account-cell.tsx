"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { countryFlagAssetSrc, countryFlagEmoji } from "@/lib/country-flag";

type Props = {
  accountName: string;
  firmName: string;
  countryCode: string;
  sinceYear: number;
  firmLogoSrc: string | null;
  /** Compare feuille de calcul — texte sombre sur fond clair. */
  surface?: "dark" | "light";
  expanded?: boolean;
  onToggleExpand?: () => void;
  /** When set, compare circle replaces the chevron in the same slot. */
  compareMode?: boolean;
  compareSelected?: boolean;
  onCompareToggle?: () => void;
  /**
   * When set, the account hover card (logo + name block) links here instead of
   * relying on the row click (rules / compare). Use for firm detail pages.
   */
  firmDetailHref?: string;
};

function Chevron({
  expanded,
  surface,
}: {
  expanded: boolean;
  surface: "dark" | "light";
}) {
  const cls =
    surface === "light"
      ? "shrink-0 text-slate-500 transition-transform duration-200"
      : "shrink-0 text-white/45 transition-transform duration-200";
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${cls} ${expanded ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function FirmAccountCell({
  accountName,
  firmName,
  countryCode,
  sinceYear,
  firmLogoSrc,
  surface = "dark",
  expanded = false,
  onToggleExpand,
  compareMode = false,
  compareSelected = false,
  onCompareToggle,
  firmDetailHref,
}: Props) {
  const [flagAssetFailed, setFlagAssetFailed] = useState(false);
  const flagSrc = countryFlagAssetSrc(countryCode);
  const flagEmoji = countryFlagEmoji(countryCode);
  const initial = firmName.trim().charAt(0).toUpperCase() || "?";
  const showFlagImg = Boolean(flagSrc) && !flagAssetFailed;

  useEffect(() => {
    setFlagAssetFailed(false);
  }, [countryCode]);

  /** Round flag PNGs (`public/flags/*.png`); 16px base + 10% → 17.6px. */
  const flagShellClass =
    "inline-flex h-[17.6px] w-[17.6px] shrink-0 overflow-hidden rounded-full aspect-square min-w-0";

  const leadingClass =
    "flex shrink-0 items-center justify-center pl-3.5";

  const hoverCardClass =
    surface === "light"
      ? "group flex min-w-min flex-1 cursor-pointer items-center gap-1.5 rounded-md border border-transparent px-1.5 py-1 transition-[border-color,background-color] duration-200 ease-out hover:border-slate-200 hover:bg-slate-100/80 text-inherit no-underline"
      : "group flex min-w-min flex-1 cursor-pointer items-center gap-1.5 rounded-md border border-transparent px-1.5 py-1 transition-[border-color,background-color] duration-200 ease-out hover:border-white/[0.04] hover:bg-white/[0.015] text-inherit no-underline";

  const logoShell =
    surface === "light"
      ? "relative h-[32.4px] w-[32.4px] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white"
      : "relative h-[32.4px] w-[32.4px] shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5";

  const titleCls =
    surface === "light"
      ? "whitespace-nowrap text-left text-[14px] font-semibold leading-snug tracking-[-0.02em] text-slate-900 underline-offset-2 decoration-slate-400 group-hover:underline"
      : "whitespace-nowrap text-left text-[14px] font-semibold leading-snug tracking-[-0.02em] text-white underline-offset-2 decoration-white/75 group-hover:underline";

  const firmCls =
    surface === "light"
      ? "mt-0.5 text-[12px] leading-snug text-slate-600 break-words"
      : "mt-0.5 text-[12px] leading-snug text-white/45 break-words";

  const metaCls =
    surface === "light"
      ? "mt-0.5 flex items-center gap-1.5 text-[12px] leading-snug text-slate-500"
      : "mt-0.5 flex items-center gap-1.5 text-[12px] leading-snug text-white/38";

  const hoverCardInner = (
    <>
      <div className={logoShell}>
        {firmLogoSrc ? (
          <Image
            src={firmLogoSrc}
            alt=""
            width={33}
            height={33}
            className="h-[32.4px] w-[32.4px] object-cover"
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500/30 to-amber-700/20 text-xs font-bold text-amber-100"
            aria-hidden
          >
            {initial}
          </span>
        )}
      </div>

      <div className="min-w-min flex-1">
        <div className="flex min-w-min items-center gap-1.5">
          <span className={titleCls}>
            {accountName}
          </span>
        </div>
        <p className={firmCls}>
          {firmName}
        </p>
        <p className={metaCls}>
          {showFlagImg ? (
            <span className={flagShellClass} title={countryCode}>
              {/* eslint-disable-next-line @next/next/no-img-element -- local PNG from /public */}
              <img
                src={flagSrc!}
                alt=""
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
                onError={() => setFlagAssetFailed(true)}
              />
            </span>
          ) : flagEmoji ? (
            <span className={flagShellClass} title={countryCode}>
              <span className="flex h-full w-full items-center justify-center text-[11px] leading-none">
                {flagEmoji}
              </span>
            </span>
          ) : null}
          <span>{sinceYear}</span>
        </p>
      </div>
    </>
  );

  return (
    <div className="flex min-w-min items-stretch gap-1.5 pr-2">
      {compareMode && onCompareToggle ? (
        <div className={leadingClass}>
          <button
            type="button"
            onClick={onCompareToggle}
            data-row-click-ignore="true"
            className="inline-flex items-center justify-center border-0 bg-transparent p-0.5 transition hover:opacity-100"
            aria-label={
              compareSelected
                ? "Remove from comparison"
                : "Add to comparison"
            }
            aria-pressed={compareSelected}
          >
            <span
              className={`inline-flex h-4 w-4 items-center justify-center rounded-full transition ${
                compareSelected
                  ? "bg-emerald-500"
                  : surface === "light"
                    ? "border border-slate-400 bg-transparent hover:border-slate-600"
                    : "border border-white/35 bg-transparent hover:border-white/55"
              }`}
            >
              {compareSelected ? (
                <span
                  className={
                    surface === "light"
                      ? "h-2 w-2 rounded-full bg-white"
                      : "h-2 w-2 rounded-full bg-black/85"
                  }
                />
              ) : null}
            </span>
          </button>
        </div>
      ) : onToggleExpand ? (
        <div className={leadingClass}>
          <button
            type="button"
            onClick={onToggleExpand}
            className={
              surface === "light"
                ? "inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0.5 text-slate-500 transition hover:text-slate-900"
                : "inline-flex cursor-pointer items-center justify-center border-0 bg-transparent p-0.5 text-white/45 transition hover:text-white/90"
            }
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse account rules" : "Expand account rules"}
          >
            <Chevron expanded={expanded} surface={surface} />
          </button>
        </div>
      ) : null}
      {firmDetailHref ? (
        <Link
          href={firmDetailHref}
          className={hoverCardClass}
          aria-label={`${accountName} — ${firmName}, view firm details`}
        >
          {hoverCardInner}
        </Link>
      ) : (
        <div className={hoverCardClass}>{hoverCardInner}</div>
      )}
    </div>
  );
}
