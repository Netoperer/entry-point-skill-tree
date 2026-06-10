import ExportSettings from "./export";
import PerkLimit from "./perk-limit";
import StarterClassSettings from "./starter-class";

export default function Settings() {
  return (
    <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <StarterClassSettings />
      <PerkLimit />
      <ExportSettings />
    </div>
  );
}

