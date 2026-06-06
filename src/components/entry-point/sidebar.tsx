import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Details from "./details";
import Settings from "./settings";
import { LayoutGrid, Settings2 } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="mx-auto w-full h-full flex flex-col">
      <Tabs
        defaultValue="details"
        className="flex-1 flex flex-col gap-3 w-full h-full min-h-0"
      >
        <TabsList className="bg-muted/40 md:backdrop-blur-md gap-1 border-border/50 border w-full p-1 h-10 xl:h-12 rounded-xl shadow-inner shrink-0">
          <TabsTrigger
            key={"details"}
            value={"details"}
            className="rounded-lg data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md transition-all duration-300 font-bold text-sm"
          >
            <LayoutGrid className="size-4 mr-2" />
            Details
          </TabsTrigger>

          <TabsTrigger
            key={"settings"}
            value={"settings"}
            className="rounded-lg data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md transition-all duration-300 font-bold text-sm"
          >
            <Settings2 className="size-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent
          key={"details"}
          value={"details"}
          className="flex-1 outline-none overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-h-0"
        >
          <div className="h-full">
            <Details />
          </div>
        </TabsContent>

        <TabsContent
          key={"settings"}
          value={"settings"}
          className="flex-1 outline-none overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-h-0"
        >
          <div className="h-full">
            <Settings />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
