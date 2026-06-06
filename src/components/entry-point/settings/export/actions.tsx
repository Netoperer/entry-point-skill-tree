import { Button } from "@/components/ui/button";
import { Check, Copy, Download } from "lucide-react";

interface Props {
  isReady: boolean;
  copied: boolean;
  onExport: () => void;
  onCopy: () => void;
}

export function ExportActions({ isReady, copied, onExport, onCopy }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={!isReady}
        className="h-8 text-[11px] font-bold uppercase tracking-tight"
        onClick={onExport}
      >
        <Download className="size-3 mr-1" />
        Save PNG
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={!isReady}
        className="h-8 text-[11px] font-bold uppercase tracking-tight"
        onClick={onCopy}
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
