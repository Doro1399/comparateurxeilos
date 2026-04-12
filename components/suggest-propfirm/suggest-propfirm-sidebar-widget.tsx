"use client";

import { useState } from "react";
import { SuggestPropfirmModal } from "./suggest-propfirm-modal";
import { SuggestPropfirmTriggerButton } from "./suggest-propfirm-trigger-button";

/** Bouton bas de sidebar + modale (état local). */
export function SuggestPropfirmSidebarWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SuggestPropfirmTriggerButton onClick={() => setOpen(true)} />
      <SuggestPropfirmModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
