import { Badge } from "lucide-react";

export default function Header() {
  return (
    <header className="h-[7vh] w-full bg-card/40 backdrop-blur-xl border-b border-border/50 shadow-sm shrink-0 flex items-center px-8 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Badge className="size-5 text-primary" />
        </div>
      </div>
    </header>
  );
}
