import { Button } from "@/shared/components/ui/button";
import { Check, Copy, Download } from "lucide-react";
import { downloadImage, copyImageToClipboard } from "./utils";
import { useEntryPointStore } from "@/features/entry-point/store";
import { selectUnlockedClassPerks } from "@/features/entry-point/store/selectors";
import { selectExportUrl } from "@/features/entry-point/store/selectors/select-export-url";
import { useState, useEffect } from "react";
import { initCache } from "@/features/entry-point/config/image-cache";

export function ExportActions() {
  const [copied, setCopied] = useState(false);
  const isCacheInitialized = useEntryPointStore((s) => s.isCacheInitialized);
  const setIsCacheInitialized = useEntryPointStore((s) => s.setIsCacheInitialized);

  const unlockedNodes = useEntryPointStore((s) => s.unlockedNodes);
  const unlockedClassPerks = useEntryPointStore(selectUnlockedClassPerks);
  const exportUrl = useEntryPointStore(selectExportUrl);

  useEffect(() => {
    initCache().then(() => setIsCacheInitialized(true));
  }, [setIsCacheInitialized]);

  const handleExport = () => {
    downloadImage(exportUrl, unlockedClassPerks, unlockedNodes.size);
  };

  const handleCopy = async () => {
    const success = await copyImageToClipboard(exportUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-[11px] font-bold uppercase tracking-tight"
        onClick={handleExport}
        disabled={!isCacheInitialized}
      >
        <Download className="size-3 mr-1" />
        Save PNG
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-[11px] font-bold uppercase tracking-tight"
        onClick={handleCopy}
        disabled={!isCacheInitialized}
      >
        {copied ? (
          <Check className="size-3 mr-1 text-green-500" />
        ) : (
          <Copy className="size-3 mr-1" />
        )}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  );
}
