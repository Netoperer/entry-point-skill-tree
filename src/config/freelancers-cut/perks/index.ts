import { majors } from "./majors";
import { minors } from "./minors";
import { specialistaions } from "./specialisations";

export const ROOT_NODES = [173, 129, 2, 84, 27];

export const Perks = {
  ...minors,
  ...majors,
  ...specialistaions,
} as const;
