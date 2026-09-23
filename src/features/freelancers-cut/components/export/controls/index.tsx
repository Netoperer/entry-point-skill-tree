import { Eye, EyeOff, Image as ImageIcon, ImageOff, List } from "lucide-react";
import { ExportIconToggle, type ExportIconToggleOption } from "./icon-toggle";

const EXPORT_ICON_TOGGLES: ExportIconToggleOption[] = [
	{
		key: "showPreview",
		titleOn: "Hide Preview",
		titleOff: "Show Preview",
		selectValue: (s) => s.showPreview,
		selectSetter: (s) => s.setShowPreview,
		activeIcon: Eye,
		inactiveIcon: EyeOff,
	},
	{
		key: "withMajorPerks",
		titleOn: "Hide Major Perks",
		titleOff: "Show Major Perks",
		selectValue: (s) => s.withMajorPerks,
		selectSetter: (s) => s.setWithMajorPerks,
		activeIcon: List,
		inactiveIcon: List,
	},
	{
		key: "withBackground",
		titleOn: "Hide Background",
		titleOff: "Show Background",
		selectValue: (s) => s.withBackground,
		selectSetter: (s) => s.setWithBackground,
		activeIcon: ImageIcon,
		inactiveIcon: ImageOff,
	},
];

export function ExportControls() {
	return (
		<div className="flex items-center gap-2">
			{EXPORT_ICON_TOGGLES.map((option) => (
				<ExportIconToggle key={option.key} option={option} />
			))}
		</div>
	);
}
