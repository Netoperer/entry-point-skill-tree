import { Editor } from "@/features/entry-point/components/editor";
import { Sidebar } from "@/features/entry-point/components/sidebar";
import { UrlSync } from "@/features/entry-point/components/url-sync";
import { Header } from "@/shared/components/header";
import { cn } from "@/shared/lib/utils";

function SkillTreeEditor() {
	return (
		<main
			className={cn(
				"mx-auto flex size-full min-h-0 flex-1 overflow-hidden",
				"gap-3 px-3 py-4",
				"max-w-full flex-col",
				"md:px-6",
				"lg:flex-row lg:gap-4",
			)}
		>
			<div className="h-full min-h-0 flex-1 lg:self-start">
				<Editor />
			</div>

			<div
				className={cn(
					"mx-auto flex h-full w-full flex-col gap-3",
					"lg:w-120",
					"xl:w-135",
					"2xl:w-130",
				)}
			>
				<Sidebar />
			</div>
		</main>
	);
}

export function EntryPoint() {
	return (
		<div className="flex h-svh flex-col overflow-hidden bg-background">
			<Header title="Entry Point Skill Tree Editor" />
			<UrlSync />
			<div className="flex min-h-0 flex-1 flex-col">
				<SkillTreeEditor />
			</div>
		</div>
	);
}
