import { URLSync } from "@/components/entry-point/url-sync";
import { Card } from "@/components/ui/card";
import Editor from "@/components/entry-point/editor";

export default function EntryPoint() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <URLSync />

      <header className="h-[5vh] flex items-center justify-center">
        <span className="text-lg font-medium">
          Entry Point Skill Tree Editor
        </span>
      </header>

      <div className="h-[90vh] w-full flex p-4">
        <Card className="h-full aspect-square p-4 flex">
          <Editor />
        </Card>
        <div className="flex-1 flex ">dd</div>
      </div>

      <footer className="h-[5vh] flex items-center justify-center">
        <span className="text-lg font-medium">
          Entry Point Skill Tree Editor
        </span>
      </footer>
    </div>
  );
}
