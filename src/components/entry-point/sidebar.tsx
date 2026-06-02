import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Details from "./details";

export default function Sidebar() {
  return (
    <div className="max-w-250 mx-auto w-full flex flex-1 flex-col">
      <Tabs defaultValue="details" className="gap-4 w-full">
        <TabsList className="bg-background gap-1 border w-full p-1 2xl:group-data-horizontal/tabs:h-14 group-data-horizontal/tabs:h-12">
          <TabsTrigger
            key={"details"}
            value={"details"}
            className="data-active:bg-primary! data-active:text-primary-foreground! dark:data-active:border-transparent!"
          >
            Details
          </TabsTrigger>

          <TabsTrigger
            key={"settings"}
            value={"settings"}
            className="data-active:bg-primary! data-active:text-primary-foreground! dark:data-active:border-transparent!"
          >
            Settings & Export
          </TabsTrigger>
        </TabsList>

        <TabsContent key={"details"} value={"details"}>
          <Details />
        </TabsContent>

        <TabsContent key={"settings"} value={"settings"}>
          <p className="text-muted-foreground text-sm">dd2</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
