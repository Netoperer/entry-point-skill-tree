import { classes } from "./classes";
import { minors } from "./minors";
import { uniques } from "./uniques";
import { weaponMasteries } from "./weapon-masteries";

export const Perks = {
  ...classes,
  ...weaponMasteries,
  ...uniques,
  ...minors,
} as const;

