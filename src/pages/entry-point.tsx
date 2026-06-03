import { URLSync } from "@/components/entry-point/url-sync";
import { Card } from "@/components/ui/card";
import Editor from "@/components/entry-point/editor";
import Sidebar from "@/components/entry-point/sidebar";

// these classes are getting too big, idk whether to use the cn function or keep them as they are
export default function EntryPoint() {
  return (
    <div className="xl:h-screen xl:w-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <URLSync />
      <header className="h-[5vh] w-full bg-card/30 backdrop-blur-md border-b border-border/50 shadow-sm shrink-0" />

      <main className="flex-1 w-full mx-auto flex p-4 xl:p-8 gap-8 xl:flex-row flex-col items-center justify-center overflow-hidden min-h-0">
        <Card className="lg:w-1/2 max-h-full w-full aspect-square flex bg-card/50 backdrop-blur-sm rounded-xl overflow-hidden group shrink-0">
          <Editor />
        </Card>

        <div className="flex-1 h-full min-w-0 overflow-hidden">
          <Sidebar />
        </div>
      </main>

      <footer className="h-[5vh] w-full border-t border-border/40 bg-muted/20 shrink-0" />
    </div>
  );
}
