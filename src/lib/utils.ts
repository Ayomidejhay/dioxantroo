export type ClassDictionary = Record<string, boolean | number | string | null | undefined>;
export type ClassArray = ClassValue[];
export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | bigint
  | ClassDictionary
  | ClassArray;

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input as ClassDictionary)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(" ");
}

export function formatNumber(num: number): string {
  if (typeof num !== "number" || Number.isNaN(num)) {
    throw new TypeError(`formatNumber expects a valid finite number, received: ${String(num)}`);
  }
  return new Intl.NumberFormat("en-US", { notation: "compact", compactDisplay: "short" }).format(num);
}
