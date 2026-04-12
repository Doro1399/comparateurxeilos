"use client";

import { useEffect } from "react";

/**
 * Thème « feuille de calcul » : surcharge les variables globales
 * uniquement sur la route /compare (sans toucher au journal).
 */
export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add("compare-light");
    return () => document.documentElement.classList.remove("compare-light");
  }, []);
  return children;
}
