import { cn } from "@/lib/utils";
import { useEntryPointStore } from "@/store/entry-point";
import { Eye, EyeOff, Image as ImageIcon, ImageOff } from "lucide-react";

export function ExportControls() {
  const showPreview = useEntryPointStore((s) => s.showPreview);
  const setShowPreview = useEntryPointStore((s) => s.setShowPreview);
  const withBackground = useEntryPointStore((s) => s.withBackground);
  const setWithBackground = useEntryPointStore((s) => s.setWithBackground);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setShowPreview(!showPreview)}
        className={cn(
          "p-1 rounded-md transition-all border border-border/50 bg-muted/30",
          showPreview
            ? "text-primary hover:bg-muted/50"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
        title={showPreview ? "Hide Preview" : "Show Preview"}
      >
        {showPreview ? (
          <Eye className="size-3" />
        ) : (
          <EyeOff className="size-3" />
        )}
      </button>

      <div className="flex items-center gap-1 bg-muted/50 p-0.5 rounded-lg border border-border/50">
        <button
          onClick={() => setWithBackground(false)}
          className={cn(
            "p-1 rounded-md transition-all",
            !withBackground
              ? "bg-background shadow-sm text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
          title="Transparent"
        >
          <ImageOff className="size-3" />
        </button>
        <button
          onClick={() => setWithBackground(true)}
          className={cn(
            "p-1 rounded-md transition-all",
            withBackground
              ? "bg-background shadow-sm text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
          title="With Background"
        >
          <ImageIcon className="size-3" />
        </button>
      </div>
    </div>
  );
}
