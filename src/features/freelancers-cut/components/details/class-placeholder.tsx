import { Card, CardHeader } from "@/shared/components/ui/card";

export default function ClassPlaceholder() {
  return (
    <Card className="w-full flex flex-col gap-4 px-4 py-4 transition-all duration-300 bg-card/60 md:backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 shadow-lg rounded-2xl">
      <CardHeader className="px-1 py-0 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center select-none gap-4">
          <div className="h-6 w-1 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]" />
          <span className="font-bold text-[18px] tracking-tight text-foreground/90">
            Class
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[16px] font-black text-primary/90 px-2 py-1">
            Freelancer
          </span>
        </div>
      </CardHeader>
    </Card>
  );
}
