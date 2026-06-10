import { DiscordLogo, GithubLogo } from "@/shared/components/logos";
import { Badge } from "lucide-react";
import { Link } from "react-router";

export default function Header({ title }: { title: string }) {
  return (
    <header className="h-[7vh] w-full bg-card/40 md:backdrop-blur-xl border-b border-border/50 shadow-sm shrink-0 flex items-center px-4 md:px-8 z-50">
      <div className="flex justify-between flex-1 items-center gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <Badge className="size-5 text-primary" />
          </div>
          <span className="font-bold truncate max-w-[150px] sm:max-w-none text-xs sm:text-base">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-12 shrink-0">
          <div className="flex items-center gap-2">
            <GithubLogo />
            <DiscordLogo />
          </div>
          <Link to={"/"} className="font-bold text-sm sm:text-base">
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}
