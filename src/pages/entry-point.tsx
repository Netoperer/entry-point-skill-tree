import { URLSync } from "@/components/entry-point/url-sync";
import { Card } from "@/components/ui/card";
import Editor from "@/components/entry-point/editor";
import Sidebar from "@/components/entry-point/sidebar";
import Header from "@/components/entry-point/header";

export default function EntryPoint() {
  return (
    <div className="xl:h-screen xl:w-screen flex flex-col items-center justify-center overflow-hidden bg-background selection:bg-primary/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_50%)] pointer-events-none" />
      <URLSync />

      <Header />

      <main className="flex-1 w-full mx-auto flex p-4 xl:p-10 gap-10 xl:flex-row flex-col items-center justify-center overflow-hidden min-h-0 relative z-10">
        <Card className="lg:w-1/2 max-h-full w-full aspect-square flex bg-card/60 backdrop-blur-md rounded-2xl overflow-hidden group shadow-2xl ring-1 ring-primary/10 transition-all duration-500 hover:ring-primary/20">
          <Editor />
        </Card>

        <div className="flex-1 h-full min-w-0 overflow-hidden flex flex-col max-w-220">
          <Sidebar />
        </div>
      </main>

      <footer className="h-[4vh] w-full border-t border-border/40 bg-muted/10 shrink-0 flex items-center justify-between px-8 z-50" />
    </div>
  );
}
