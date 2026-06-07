import type { Description } from "@/types/freelancers-cut";

export function description(data: string): Description {
  return (_) => data;
}

function replace(pattern: string, multipliers: number[], value: number) {
  let result = pattern;

  for (let i = 0; i < multipliers.length; i++) {
    result = result.replace("{}", `${multipliers[i] * value}`);
  }

  return result;
}

export function multiplicativeAbility(
  pattern: string,
  ...multipliers: number[]
): Description {
  return (level) => replace(pattern, multipliers, level);
}

export function setAbility(array: string[]): Description {
  return (level) => {
    return array[Math.min(level, array.length - 1)];
  };
}
