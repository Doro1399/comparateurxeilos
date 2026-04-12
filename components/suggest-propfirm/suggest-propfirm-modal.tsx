"use client";

import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useState,
  type AnimationEvent,
  type FormEvent,
} from "react";
import { submitPropfirmSuggestion } from "@/lib/submit-propfirm-suggestion";

const MODAL_EXIT_UNMOUNT_MS = 460;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SuggestPropfirmModal({ open, onClose }: Props) {
  const [portalReady, setPortalReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  const [firmName, setFirmName] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  const canShow = open;

  useEffect(() => {
    if (canShow) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
    }
  }, [canShow, mounted]);

  useEffect(() => {
    if (!closing || !mounted) return;
    const t = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, MODAL_EXIT_UNMOUNT_MS);
    return () => window.clearTimeout(t);
  }, [closing, mounted]);

  const onPanelAnimationEnd = useCallback((e: AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!closing) return;
    if (!String(e.animationName).includes("compare-modal-panel-out")) return;
    setMounted(false);
    setClosing(false);
  }, [closing]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mounted, onClose]);

  useEffect(() => {
    if (!open) {
      setSuccess(false);
      setSendError(null);
      setNameError(null);
    }
  }, [open]);

  const resetForm = useCallback(() => {
    setFirmName("");
    setExperience("");
    setEmail("");
    setNameError(null);
    setSendError(null);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSendError(null);
    const name = firmName.trim();
    if (!name) {
      setNameError("Indique le nom de la propfirm.");
      return;
    }
    setNameError(null);
    setSubmitting(true);
    const result = await submitPropfirmSuggestion({
      firmName: name,
      experience: experience.trim(),
      email: email.trim() || undefined,
    });
    setSubmitting(false);
    if (!result.ok) {
      setSendError(result.message);
      return;
    }
    setSuccess(true);
    resetForm();
  };

  if (!portalReady || typeof document === "undefined") return null;

  if (!mounted) return null;

  const backdropAnim = closing
    ? "compare-modal-backdrop--out"
    : "compare-modal-backdrop--in";
  const panelAnim = closing ? "compare-modal-panel--out" : "compare-modal-panel--in";

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5">
      <button
        type="button"
        aria-label="Fermer"
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${backdropAnim}`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="suggest-propfirm-title"
        className={`relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-[color:var(--cmp-sage-border)] bg-gradient-to-b from-[color:var(--cmp-ink-900)] via-[color:var(--cmp-ink-950)] to-[#100a0d] shadow-[0_16px_48px_rgba(0,0,0,0.55)] ring-1 ring-[color:var(--cmp-sage-border)]/35 [will-change:transform,opacity] ${panelAnim}`}
        onClick={(ev) => ev.stopPropagation()}
        onAnimationEnd={onPanelAnimationEnd}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-[color:var(--cmp-sage-border)]/50 bg-[color:var(--cmp-ink-850)]/60 px-5 py-4">
          <div className="min-w-0">
            <p
              id={success ? "suggest-propfirm-title" : undefined}
              className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--cmp-mint)]"
            >
              Contribution
            </p>
            {!success ? (
              <>
                <h2
                  id="suggest-propfirm-title"
                  className="mt-2 text-lg font-semibold tracking-tight text-white"
                >
                  Tu connais une propfirm fiable ?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--cmp-steel)]">
                  Tu as testé une propfirm sérieuse qui paye ? Partage-la pour enrichir la liste.
                </p>
              </>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 text-xl leading-none text-[color:var(--cmp-steel)] transition hover:border-[color:var(--cmp-sage-strong)] hover:bg-[color:var(--cmp-sage-soft)] hover:text-[color:var(--foreground)]"
            aria-label="Fermer la fenêtre"
          >
            ×
          </button>
        </header>

        <div className="px-5 py-4">
          {success ? (
            <div className="space-y-3">
              <p className="rounded-xl border border-[color:var(--cmp-sage-strong)]/40 bg-[color:var(--cmp-sage-soft)] px-4 py-3 text-center text-sm font-medium text-[color:var(--foreground)]">
                Merci pour ta contribution
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="w-full rounded-xl border border-[color:var(--cmp-sage-border)] bg-black/25 px-3 py-2.5 text-xs font-semibold text-[color:var(--cmp-steel)] transition hover:border-[color:var(--cmp-sage-strong)] hover:bg-[color:var(--cmp-sage-softer)] hover:text-[color:var(--foreground)]"
              >
                Proposer une autre propfirm
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="suggest-propfirm-name"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-white/75"
                >
                  Nom de la propfirm
                </label>
                <input
                  id="suggest-propfirm-name"
                  name="propfirm"
                  type="text"
                  autoComplete="organization"
                  value={firmName}
                  onChange={(ev) => {
                    setFirmName(ev.target.value);
                    if (nameError) setNameError(null);
                  }}
                  className="w-full rounded-xl border border-[color:var(--cmp-sage-border)] bg-black/30 px-3 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--cmp-steel)] transition focus:border-[color:var(--cmp-sage-strong)] focus:outline-none focus:ring-1 focus:ring-[color:var(--cmp-ring)]"
                  placeholder="ex. Lucid Trading"
                />
                {nameError ? (
                  <p className="mt-1.5 text-xs text-rose-300/95">{nameError}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="suggest-propfirm-exp"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-white/75"
                >
                  Ton retour / expérience
                </label>
                <textarea
                  id="suggest-propfirm-exp"
                  name="retour"
                  rows={4}
                  value={experience}
                  onChange={(ev) => setExperience(ev.target.value)}
                  className="w-full resize-y rounded-xl border border-[color:var(--cmp-sage-border)] bg-black/30 px-3 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--cmp-steel)] transition focus:border-[color:var(--cmp-sage-strong)] focus:outline-none focus:ring-1 focus:ring-[color:var(--cmp-ring)]"
                  placeholder="Payouts, règles, support…"
                />
              </div>

              <div>
                <label
                  htmlFor="suggest-propfirm-email"
                  className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-white/75"
                >
                  Email <span className="font-normal normal-case text-[color:var(--cmp-steel)]">(optionnel)</span>
                </label>
                <input
                  id="suggest-propfirm-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="w-full rounded-xl border border-[color:var(--cmp-sage-border)] bg-black/30 px-3 py-2.5 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--cmp-steel)] transition focus:border-[color:var(--cmp-sage-strong)] focus:outline-none focus:ring-1 focus:ring-[color:var(--cmp-ring)]"
                />
              </div>

              {sendError ? (
                <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200/95">
                  {sendError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex w-full items-center justify-center rounded-xl border border-[color:var(--cmp-sage-strong)] bg-[color:var(--cmp-sage-soft)] px-4 py-3 text-sm font-semibold text-[color:var(--foreground)] shadow-sm shadow-black/20 transition-[transform,box-shadow,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--cmp-hover-mid)] hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {submitting ? "Envoi…" : "Envoyer"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
