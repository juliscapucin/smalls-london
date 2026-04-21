export type StateStyleMap<
  TVariant extends string,
  TState extends string,
> = Record<TVariant, Record<TState, string>>;

export function getForcedStateClassname<
  TVariant extends string,
  TState extends string,
>(args: {
  stateStylesByVariant: StateStyleMap<TVariant, TState>;
  variant: TVariant;
  state: TState | "default";
}) {
  const { stateStylesByVariant, variant, state } = args;
  if (state === "default") {
    return "";
  }

  return stateStylesByVariant[variant][state];
}
