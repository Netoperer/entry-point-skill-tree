import { Editor } from "@/features/entry-point/components/editor";
import { Sidebar } from "@/features/entry-point/components/sidebar";
import { UrlSync } from "@/features/entry-point/components/url-sync";
import { Header } from "@/shared/components/header";

function SkillTreeEditor() {
	return (
		<main className="mx-auto grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(360px,48svh)_minmax(0,1fr)] gap-3 px-3 py-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_480px] lg:grid-rows-1 lg:gap-4 xl:grid-cols-[minmax(0,1fr)_540px] 2xl:grid-cols-[minmax(0,1fr)_600px]">
			<div className="h-full min-h-0 lg:self-start">
				<Editor />
			</div>

			<Sidebar />
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
