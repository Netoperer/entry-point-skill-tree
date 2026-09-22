import { Editor } from "@/features/freelancers-cut/components/editor";
import { Sidebar } from "@/features/freelancers-cut/components/sidebar";
import { UrlSync } from "@/features/freelancers-cut/components/url-sync";
import { Header } from "@/shared/components/header";
import { Tabs, TabsContent } from "@/shared/components/ui/tabs";
import { cn } from "@/shared/lib/utils";

function SkillTreeEditor() {
	return (
		<main
			className={cn(
				"mx-auto flex size-full min-h-0 flex-1 overflow-y-auto lg:overflow-hidden",
				"gap-3",
				"w-full flex-col",
				"lg:flex-row lg:gap-4",
			)}
		>
			<div className="aspect-square flex-1 lg:h-full lg:w-auto lg:self-start">
				<Editor />
			</div>

			<div
				className={cn(
					"mx-auto flex h-full w-full flex-col gap-3 overflow-y-auto rounded-xl",
					"scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
					"lg:w-100",
					"xl:w-115",
					"2xl:w-120",
				)}
			>
				<Sidebar />
			</div>
		</main>
	);
}

export function FreelancersCut() {
	return (
		<div className="flex h-svh flex-col overflow-hidden bg-background">
			<Header title="Freelancer's Cut" />
			<UrlSync />
			<Tabs
				defaultValue="skill"
				className="mx-auto flex h-full min-h-0 w-full max-w-500 flex-1 flex-col px-3 py-2 md:px-6 md:py-4"
			>
				<TabsContent value="skill" className="flex h-full min-h-0 w-full">
					<SkillTreeEditor />
				</TabsContent>
			</Tabs>
		</div>
	);
}
