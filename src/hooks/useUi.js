'use client';

import { useContext } from "react";
import { UIContext } from "@/contexts/UiContext";

export function useUI() {
  return useContext(UIContext);
}
