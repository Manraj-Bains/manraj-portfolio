"use client";

import { useMemo, useState } from "react";
import { skills } from "@/data/skills";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps / Infra" },
  { key: "tool", label: "Tools" },
];

const levelStyles = {
  beginner: "bg-muted text-muted-foreground",
  intermediate: "bg-primary/10 text-primary",
  advanced: "bg-primary text-primary-foreground",
};

const levelLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function SkillsVisualizer() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return skills;
    return skills.filter((s) => s.category === active);
  }, [active]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={active === cat.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(cat.key)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((skill) => (
          <Card
            key={`${skill.category}-${skill.name}`}
            className="transition hover:shadow-md"
          >
            <CardContent className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">
                  {skill.category}
                </p>
                <h3 className="text-base font-semibold leading-tight">
                  {skill.name}
                </h3>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium capitalize",
                  levelStyles[skill.level] || levelStyles.intermediate
                )}
              >
                {levelLabels[skill.level] || skill.level}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

