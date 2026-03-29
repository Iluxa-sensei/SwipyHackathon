"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AccessibilityPanel from "@/components/accessibility/AccessibilityPanel";
import VoiceNavigation from "@/components/accessibility/VoiceNavigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
        <AccessibilityPanel />
        <VoiceNavigation />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
