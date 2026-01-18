import { create } from "zustand";
import { LeadState } from "@/lib/types";

export const useLeadStore = create<{
  leads: LeadState[];
  setLeads: (l: LeadState[]) => void;
}>((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads })
}));
