import { URLSync } from "@/components/entry-point/url-sync";
import { Card } from "@/components/ui/card";
import Editor from "@/components/entry-point/editor";
import Sidebar from "@/components/entry-point/sidebar";

export default function EntryPoint() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <URLSync />

      <header className="h-[5vh] flex items-center">
        <span className="text-lg font-medium">
          Entry Point Skill Tree Editor
        </span>
      </header>

      <div className="h-[90vh] w-full flex p-4 gap-16 2xl:flex-row flex-col">
        <Card className="h-full aspect-square p-4 flex">
          <Editor />
        </Card>

        <Sidebar />
      </div>

      <footer className="h-[5vh] flex items-center justify-center">
        <span className="text-lg font-medium">
          Entry Point Skill Tree Editor
        </span>
      </footer>
    </div>
  );
}
