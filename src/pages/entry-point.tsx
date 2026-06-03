import { URLSync } from "@/components/entry-point/url-sync";
import { Card } from "@/components/ui/card";
import Editor from "@/components/entry-point/editor";
import Sidebar from "@/components/entry-point/sidebar";

export default function EntryPoint() {
  return (
    <div className="2xl:h-screen 2xl:w-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <URLSync />
      <header className="h-[6vh] w-full bg-card/30 backdrop-blur-md border-b border-border/50 shadow-sm shrink-0" />

      <main className="h-full w-full max-w-550 mx-auto flex p-8 gap-12 2xl:flex-row flex-col items-center justify-center overflow-hidden">
        <Card className="h-full aspect-square flex bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden group shrink-0">
          <Editor />
        </Card>

        <div className="flex-1 h-full min-w-0">
          <Sidebar />
        </div>
      </main>

      <footer className="h-[6vh] w-full border-t border-border/40 bg-muted/20 shrink-0" />
    </div>
  );
}
