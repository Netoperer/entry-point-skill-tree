import { Editor } from "@/features/entry-point/components/editor";
import { Sidebar } from "@/features/entry-point/components/sidebar";
import { UrlSync } from "@/features/entry-point/components/url-sync";
import { useEntryPointStore } from "@/features/entry-point/store";
import { Header } from "@/shared/components/header";
import { cn } from "@/shared/lib/utils";

function SkillTreeEditor() {
	const editorPinned = useEntryPointStore((s) => s.editorPinned);

	return (
		<main
			className={cn(
				"mx-auto flex size-full min-h-0 flex-1",
				editorPinned ? "overflow-hidden" : "overflow-y-auto lg:overflow-hidden",
				"gap-3 px-3 py-4",
				"max-w-full flex-col",
				"md:px-6",
				"lg:flex-row lg:gap-4",
			)}
		>
			<div className="aspect-square flex-1 lg:h-full lg:w-auto lg:self-start">
				<Editor />
			</div>

			<div
				className={cn(
					"mx-auto flex h-full w-full flex-col gap-3 rounded-xl",
					editorPinned
						? "scrollbar-none overflow-y-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
						: "",
					"lg:scrollbar-none lg:w-120 lg:overflow-y-auto lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden",
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
