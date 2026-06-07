import { useEntryPointStore } from "@/store/entry-point";
import { selectExportUrl } from "@/store/entry-point/selectors/select-export-url";
import { Loader2 } from "lucide-react";

export function ExportPreview() {
  const exportUrl = useEntryPointStore(selectExportUrl);

  return (
    <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-border/50 bg-muted/20 group/preview flex items-center justify-center animate-in fade-in zoom-in-95 duration-200">
      {exportUrl ? (
        <>
          <img
            src={exportUrl}
            alt="Tree Preview"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">
              Preview
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Loader2 className="size-6 animate-spin opacity-50" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Generating...
          </span>
        </div>
      )}
    </div>
  );
}
