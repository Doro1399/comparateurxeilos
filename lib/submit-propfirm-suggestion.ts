export type SuggestPropfirmPayload = {
  firmName: string;
  experience: string;
  email?: string;
};

export type SubmitPropfirmResult =
  | { ok: true }
  | { ok: false; message: string };

/** Formulaire Formspree par défaut (même id que l’URL /f/mdaynzek). Surcharge : NEXT_PUBLIC_FORMSPREE_FORM_ID. */
const FORMSPREE_DEFAULT_FORM_ID = "mdaynzek";

/**
 * Envoie la suggestion via Formspree (aucune dépendance npm).
 * Optionnel : `NEXT_PUBLIC_FORMSPREE_FORM_ID` au build pour un autre formulaire.
 */
export async function submitPropfirmSuggestion(
  payload: SuggestPropfirmPayload
): Promise<SubmitPropfirmResult> {
  const formId =
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() ||
    FORMSPREE_DEFAULT_FORM_ID;

  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        propfirm: payload.firmName.trim(),
        retour: payload.experience.trim(),
        email: payload.email?.trim() ?? "",
        _replyto: payload.email?.trim() || undefined,
        _subject: `Suggestion propfirm — ${payload.firmName.trim()}`,
      }),
    });

    if (!res.ok) {
      let detail = "Envoi impossible pour le moment.";
      try {
        const data = (await res.json()) as { error?: string };
        if (data?.error) detail = data.error;
      } catch {
        /* ignore */
      }
      return { ok: false, message: detail };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Erreur réseau. Vérifie ta connexion et réessaie.",
    };
  }
}
