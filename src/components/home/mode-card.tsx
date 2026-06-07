import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

export function ModeCard({
  title,
  to,
  bgImage,
  isReady,
}: {
  title: string;
  to: string;
  bgImage: string;
  isReady: boolean;
}) {
  return (
    <Card
      className={`relative overflow-hidden group bg-card/40 border-border/40 hover:border-primary/50 transition-all duration-300 min-h-150 flex flex-col ${!isReady ? "opacity-60 grayscale-[0.8]" : ""}`}
    >
      <img
        src={bgImage}
        alt={title}
        className={cn(
          "absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000",
          isReady ? "group-hover:scale-110" : "",
        )}
      />
      <div className="absolute inset-0 z-1 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />

      <div className="relative z-10 flex flex-col flex-1">
        <CardHeader className="p-12 pb-8 text-center flex-1 flex flex-col justify-center">
          <CardTitle
            className={cn(
              "text-4xl font-bold tracking-tight",
              !isReady ? "text-muted-foreground" : "",
            )}
          >
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-12 pt-0">
          {isReady ? (
            <Button
              asChild
              size="lg"
              className="w-full font-bold shadow-lg shadow-primary/20 h-16 text-xl"
            >
              <Link to={to}>Open Editor</Link>
            </Button>
          ) : (
            <>
              <div className="w-full font-bold h-16 text-xl flex items-center justify-center border-2 border-dashed border-border/40 text-muted-foreground rounded-md">
                Coming Soon
              </div>
            </>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
