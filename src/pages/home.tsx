import { DiscordLogo, GithubLogo } from "@/components/home/logos";
import { ModeCard } from "@/components/home/mode-card";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground">
      <header className="h-[7vh] w-full border-b border-border/40 flex items-center px-6 sm:px-12 shrink-0 bg-background/50 backdrop-blur-md sticky">
        <div className="flex justify-between w-full items-center max-w-500 mx-auto">
          <div className="flex items-center gap-2.5 text-[10px] font-bold tracking-[0.25em] text-muted-foreground/50">
            Skill Tree Editors for
            <span className="text-primary/30 font-normal">/</span>
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

      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 h-[86vh] mx-auto w-full max-w-5xl">
        <div className="w-full space-y-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <ModeCard
              title="Entry Point"
              to="/entry-point"
              bgImage="/ep.webp"
            />
            <ModeCard
              title="Freelancer's Cut"
              to="/freelancers-cut"
              bgImage="/epfc.htm"
            />
          </div>
        </div>
      </main>

      <footer className="h-[5vh] border-t border-border/40 px-6 sm:px-12 bg-background/50 items-center flex">
        <div className="max-w-500 mx-auto flex justify-center items-center text-[10px] font-bold text-muted-foreground/30 tracking-widest">
          This project is unofficial and has no association with Cishshato.
        </div>
      </footer>
    </div>
  );
}
