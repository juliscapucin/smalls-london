export const componentStates = [
  "default",
  "hover",
  "active",
  "focus",
  "disabled",
] as const;

export const statePrefixMap: Record<
  Exclude<(typeof componentStates)[number], "default">,
  string
> = {
  hover: "hover:",
  active: "active:",
  focus: "focus-visible:",
  disabled: "disabled:",
};
export const stateDataPrefixMap: Record<
  Exclude<(typeof componentStates)[number], "default">,
  string
> = {
  hover: "data-[state=hover]:",
  active: "data-[state=active]:",
  focus: "data-[state=focus]:",
  disabled: "data-[state=disabled]:",
};
