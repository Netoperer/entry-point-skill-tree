import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export function ModeCard({
  title,
  to,
  bgImage,
}: {
  title: string;
  to: string;
  bgImage: string;
}) {
  return (
    <Card className="relative overflow-hidden group bg-card/40 border-border/40 hover:border-primary/50 transition-all duration-300 min-h-150 flex flex-col">
      <img
        src={bgImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 z-1 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />

      <div className="relative z-10 flex flex-col flex-1">
        <CardHeader className="p-12 pb-8 text-center flex-1 flex flex-col justify-center">
          <CardTitle className="text-4xl font-bold tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-12 pt-0">
          <Button
            asChild
            size="lg"
            className="w-full font-bold shadow-lg shadow-primary/20 h-16 text-xl"
          >
            <Link to={to}>Open Editor</Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
