import { DiscordLogo, GithubLogo } from "@/shared/components/logos";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground">
      <header className="h-16 w-full border-b border-border/40 flex items-center px-6 sm:px-12 shrink-0 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex justify-between w-full items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-2.5 text-[10px] font-bold tracking-[0.25em] text-muted-foreground/50 truncate">
            <span className="hidden sm:inline">Skill Tree Editors for</span>
            <span className="text-foreground/70">Entry Point</span>
            <span className="text-primary/30 font-normal">&</span>
            <span className="text-foreground/70">Freelancer's Cut</span>
          </div>
          <div className="flex items-center gap-3">
            <GithubLogo />
            <DiscordLogo />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 mx-auto w-full max-w-5xl">
        <div className="w-full space-y-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <ModeCard
              title="Entry Point"
              to="/entry-point"
              bgImage="/ep.webp"
              isReady={true}
            />
            <ModeCard
              title="Freelancer's Cut"
              to="/freelancers-cut"
              bgImage="/epfc.htm"
              isReady={true}
            />
          </div>
        </div>
      </main>

      <footer className="h-16 border-t border-border/40 px-6 sm:px-12 bg-background/50 items-center flex shrink-0">
        <div className="max-w-5xl mx-auto flex justify-center items-center text-[10px] font-bold text-muted-foreground/30 tracking-widest text-center">
          This project is unofficial and has no association with Cishshato.
        </div>
      </footer>
    </div>
  );
}

export function ModeCard({
  title,
  to,
  bgImage,
  isReady,
}: {
  title: string;
  to: string;
  bgImage: string;
  isReady: boolean;
}) {
  return (
    <Card
      className={`relative overflow-hidden group bg-card/40 border-border/40 hover:border-primary/50 transition-all duration-300 min-h-[300px] md:min-h-[600px] flex flex-col ${!isReady ? "opacity-60 grayscale-[0.8]" : ""}`}
    >
      <img
        src={bgImage}
        alt={title}
        className={cn(
          "absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000",
          isReady ? "group-hover:scale-110" : "",
        )}
      />
      <div className="absolute inset-0 z-1 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />

      <div className="relative z-10 flex flex-col flex-1">
        <CardHeader className="p-12 pb-8 text-center flex-1 flex flex-col justify-center">
          <CardTitle
            className={cn(
              "text-4xl font-bold tracking-tight",
              !isReady ? "text-muted-foreground" : "",
            )}
          >
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-12 pt-0">
          {isReady ? (
            <Button
              asChild
              size="lg"
              className="w-full font-bold shadow-lg shadow-primary/20 h-16 text-xl"
            >
              <Link to={to}>Open Editor</Link>
            </Button>
          ) : (
            <>
              <div className="w-full font-bold h-16 text-xl flex items-center justify-center border-2 border-dashed border-border/40 text-muted-foreground rounded-md">
                Coming Soon
              </div>
            </>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
