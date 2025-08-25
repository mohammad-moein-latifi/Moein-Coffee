'use client';
import { useContext } from "react";
import { UIContext } from "@/context/UiContext";

export function useUI() {
  return useContext(UIContext);
}
