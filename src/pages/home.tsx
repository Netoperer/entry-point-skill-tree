import { Link } from "react-router";
import { DiscordLogo, GithubLogo } from "@/shared/components/logos";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

export function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-background text-foreground">
			<header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center border-border/40 border-b bg-background/50 px-6 backdrop-blur-md sm:px-12">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between">
					<div className="flex items-center gap-2.5 truncate font-bold text-[10px] text-muted-foreground/50 tracking-[0.25em]">
						<span className="hidden sm:inline">Skill Tree Editors for</span>
						<span className="text-foreground/70">Entry Point</span>
						<span className="font-normal text-primary/30">&</span>
						<span className="text-foreground/70">Freelancer's Cut</span>
					</div>
					<div className="flex items-center gap-3">
						<GithubLogo />
						<DiscordLogo />
					</div>
				</div>
			</header>

			<main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center p-6 sm:p-12">
				<div className="w-full space-y-16 py-12">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
						<ModeCard
							title="Entry Point"
							to="/entry-point"
							bgImage="/ep.webp"
							isReady={true}
						/>
						<ModeCard
							title="Freelancer's Cut"
							to="/freelancers-cut"
							bgImage="/epfc.htm"
							isReady={true}
						/>
					</div>
				</div>
			</main>

			<footer className="flex h-16 shrink-0 items-center border-border/40 border-t bg-background/50 px-6 sm:px-12">
				<div className="mx-auto flex max-w-5xl items-center justify-center text-center font-bold text-[10px] text-muted-foreground/30 tracking-widest">
					This project is unofficial and has no association with Cishshato.
				</div>
			</footer>
		</div>
	);
}

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
			className={`group relative flex min-h-75 flex-col overflow-hidden border-border/40 bg-card/40 transition-all duration-300 hover:border-primary/50 md:min-h-150 ${isReady ? "" : "opacity-60 grayscale-[0.8]"}`}
		>
			<img
				width="100%"
				height="100%"
				src={bgImage}
				alt={title}
				className={cn(
					"absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-1000",
					isReady ? "group-hover:scale-110" : "",
				)}
			/>
			<div className="absolute inset-0 z-1 bg-black/60 transition-colors duration-500 group-hover:bg-black/40" />

			<div className="relative z-10 flex flex-1 flex-col">
				<CardHeader className="flex flex-1 flex-col justify-center p-12 pb-8 text-center">
					<CardTitle
						className={cn(
							"font-bold text-4xl tracking-tight",
							isReady ? "" : "text-muted-foreground",
						)}
					>
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent className="p-12 pt-0">
					{isReady ? (
						<Button
							asChild={true}
							size="lg"
							className="h-16 w-full font-bold text-xl shadow-lg shadow-primary/20"
						>
							<Link to={to}>Open Editor</Link>
						</Button>
					) : (
						<div className="flex h-16 w-full items-center justify-center rounded-md border-2 border-border/40 border-dashed font-bold text-muted-foreground text-xl">
							Coming Soon
						</div>
					)}
				</CardContent>
			</div>
		</Card>
	);
}
