import { Card, CardContent } from "@/components/ui/card";
import { useEntryPointStore } from "@/store/entry-point";
import { Download } from "lucide-react";
import { selectUnlockedClassPerks } from "@/store/entry-point/selectors";
import { useState, useEffect, useRef } from "react";
import {
  preloadImages,
  renderTreeToCanvas,
  downloadCanvas,
  copyCanvasToClipboard,
} from "./utils";
import { ExportControls } from "./controls";
import { ExportPreview } from "./preview";
import { ExportActions } from "./actions";

export default function ExportSettings() {
  const unlockedNodes = useEntryPointStore((state) => state.unlockedNodes);
  const unlockedClassPerks = useEntryPointStore(selectUnlockedClassPerks);

  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

  // Pre-load images
  useEffect(() => {
    preloadImages(imageCache).then(() => setIsReady(true));
  }, []);

  // Sync canvas and preview
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current || document.createElement("canvas");
    if (!canvasRef.current) canvasRef.current = canvas;

    renderTreeToCanvas(
      canvas,
      unlockedNodes,
      withBackground,
      imageCache.current,
    );
    setPreviewUrl(canvas.toDataURL("image/png"));
  }, [unlockedNodes, withBackground, isReady]);

  const handleExport = () => {
    if (canvasRef.current) {
      downloadCanvas(canvasRef.current, unlockedClassPerks, unlockedNodes.size);
    }
  };

  const handleCopy = async () => {
    if (canvasRef.current) {
      const success = await copyCanvasToClipboard(canvasRef.current);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <Card className="bg-card/60 backdrop-blur-md border-border/50 ring-1 ring-primary/5 hover:ring-primary/10 transition-all rounded-xl shadow-md overflow-hidden">
      <CardContent className="px-4 py-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-primary/10">
                <Download className="size-4 text-primary" />
              </div>
              <span className="text-[13px] font-bold text-foreground/90">
                Export Tree
              </span>
            </div>

            <ExportControls
              showPreview={showPreview}
              setShowPreview={setShowPreview}
              withBackground={withBackground}
              setWithBackground={setWithBackground}
            />
          </div>

          {showPreview && <ExportPreview previewUrl={previewUrl} />}

          <ExportActions
            isReady={isReady}
            copied={copied}
            onExport={handleExport}
            onCopy={handleCopy}
          />
        </div>
      </CardContent>
    </Card>
  );
}
