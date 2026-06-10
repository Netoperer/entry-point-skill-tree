import { Card, CardContent } from "@/shared/components/ui/card";
import { useEntryPointStore } from "@/features/entry-point/store";
import { Download } from "lucide-react";
import { ExportControls } from "./controls";
import { ExportPreview } from "./preview";
import { ExportActions } from "./actions";

export default function ExportSettings() {
  const showPreview = useEntryPointStore((s) => s.showPreview);

  return (
    <Card className="bg-card/60 backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 transition-all rounded-xl shadow-md overflow-hidden py-4">
      <CardContent className="px-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-primary/10">
                <Download className="size-4 text-primary" />
              </div>
              <span className="text-[13px] font-bold text-foreground/90">
                Export
              </span>
            </div>

            <ExportControls />
          </div>

          {showPreview && <ExportPreview />}

          <ExportActions />
        </div>
      </CardContent>
    </Card>
  );
}
