import { Editor } from "@/features/freelancers-cut/components/editor";
import { Sidebar } from "@/features/freelancers-cut/components/sidebar";
import { UrlSync } from "@/features/freelancers-cut/components/url-sync";
import { Header } from "@/shared/components/header";

export function FreelancersCut() {
	return (
		<div className="flex h-svh flex-col overflow-hidden bg-background">
			<Header title="Freelancer's Cut" />
			<UrlSync />

			<main className="mx-auto flex h-full min-h-0 w-full max-w-475 flex-1 flex-col px-3 py-2 md:px-6 md:py-4">
				<div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(360px,48svh)_minmax(0,1fr)] gap-3 lg:grid-cols-[minmax(0,1fr)_360px] lg:grid-rows-1 lg:gap-4 xl:grid-cols-[minmax(0,1fr)_420px] 2xl:grid-cols-[minmax(0,1fr)_460px]">
					<div className="h-full min-h-0 lg:self-start">
						<Editor />
					</div>

					<Sidebar />
					{/* <BuildPanel
            allocated={allocated}
            selected={selected}
            onSelect={handleSelect}
            spent={spent}
            ownedPerks={ownedPerks}
          /> */}
				</div>
			</main>
		</div>
	);
}
