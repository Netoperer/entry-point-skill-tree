import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Details from "./details";
import { LayoutGrid, Settings2, Share2 } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="mx-auto w-full h-full flex flex-col">
      <Tabs
        defaultValue="details"
        className="flex-1 flex flex-col gap-4 w-full h-full min-h-0"
      >
        <TabsList className="bg-muted/40 backdrop-blur-md gap-1 border-border/50 border w-full p-1.5 h-12 2xl:h-14 rounded-2xl shadow-inner shrink-0">
          <TabsTrigger
            key={"details"}
            value={"details"}
            className="rounded-xl data-active:bg-primary data-active:text-primary-foreground data-active:shadow-lg transition-all duration-300 font-bold"
          >
            <LayoutGrid className="size-4 mr-2" />
            Details
          </TabsTrigger>

          <TabsTrigger
            key={"settings"}
            value={"settings"}
            className="rounded-xl data-active:bg-primary data-active:text-primary-foreground data-active:shadow-lg transition-all duration-300 font-bold"
          >
            <Settings2 className="size-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent
          key={"details"}
          value={"details"}
          className="flex-1 outline-none overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-1 min-h-0"
        >
          <Details />
        </TabsContent>

        <TabsContent
          key={"settings"}
          value={"settings"}
          className="flex-1 outline-none overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-1 min-h-0"
        >
          <div className="p-6 border-border/50 border rounded-3xl bg-card/30 backdrop-blur-md flex flex-col gap-4 shadow-xl">
            <h3 className="font-bold text-xl flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Share2 className="size-5 text-primary" />
              </div>
              Settings & Export
            </h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
