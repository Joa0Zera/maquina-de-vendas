"use client";

import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ContinueProjectButtonProps {
  projectId: string;
  nextActionHref: string;
}

export function ContinueProjectButton({ projectId, nextActionHref }: ContinueProjectButtonProps) {
  return (
    <Link href={nextActionHref}>
      <Button className="gap-2" size="sm">
        <Rocket className="h-4 w-4" />
        Continuar Projeto
      </Button>
    </Link>
  );
}
