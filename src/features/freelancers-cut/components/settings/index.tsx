import PerkLimit from "./perk-limit";
import RootNodeSelector from "./root-node-selector";
import ExportSettings from "./export";

export default function Settings() {
  return (
    <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
      <RootNodeSelector />
      <PerkLimit />
      <ExportSettings />
    </div>
  );
}
