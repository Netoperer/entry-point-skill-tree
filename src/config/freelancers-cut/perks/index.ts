import { majors } from "./majors";
import { minors } from "./minors";

export const ROOT_NODES = [0, 87, 126, 84, 65];

export const Perks = {
  ...minors,
  ...majors,
} as const;
