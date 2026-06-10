import { Card, CardContent } from "@/shared/components/ui/card";
import { useFreelancersCutStore } from "@/features/freelancers-cut/store";
import { RootNode } from "@/features/freelancers-cut/types";
import { PERK_ENTRIES } from "@/features/freelancers-cut/config/entries";
import { cn } from "@/shared/lib/utils";
import { GitBranch } from "lucide-react";

export default function RootNodeSelector() {
  const rootNode = useFreelancersCutStore((s) => s.rootNode);
  const setRootNode = useFreelancersCutStore((s) => s.setRootNode);

  const rootNodes = Object.entries(RootNode).map(([_, id]) => ({
    name: PERK_ENTRIES[id].perk.name,
    icon: PERK_ENTRIES[id].perk.icon,
    id,
  }));

  return (
    <Card className="bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 transition-all rounded-xl shadow-md overflow-hidden">
      <CardContent className="px-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-primary/10">
              <GitBranch className="size-4 text-primary" />
            </div>
            <span className="text-[13px] font-bold text-foreground/90">
              Root Node
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {rootNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setRootNode(node.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all border text-left",
                  rootNode === node.id
                    ? "bg-primary/10 border-primary/30 ring-1 ring-primary/20"
                    : "bg-muted/30 border-transparent hover:bg-muted/50",
                )}
              >
                <div
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center shrink-0",
                    rootNode === node.id ? "bg-primary/20" : "bg-muted",
                  )}
                >
                  <img
                    src={node.icon}
                    alt={node.name}
                    className={cn(
                      "size-5 rounded-full",
                      rootNode !== node.id && "grayscale opacity-50",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[12px] font-bold flex-1 truncate",
                    rootNode === node.id
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {node.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
