import { Badge } from "lucide-react";
import { Link } from "react-router";
import { DiscordLogo, GithubLogo } from "../home/logos";

export default function Header() {
  return (
    <header className="h-[7vh] w-full bg-card/40 md:backdrop-blur-xl border-b border-border/50 shadow-sm shrink-0 flex items-center px-8 z-50">
      <div className="flex justify-between flex-1 items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Badge className="size-5 text-primary" />
          </div>
          <span className="font-bold">Entry Point Skill Tree Editor</span>
        </div>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2">
            <GithubLogo />
            <DiscordLogo />
          </div>
          <Link to={"/"} className="font-bold">
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}
