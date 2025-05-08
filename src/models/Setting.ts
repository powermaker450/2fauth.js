export interface Setting<
  V extends string | boolean | number = string | boolean | number,
> {
  key: string;
  value: V;
  locked: boolean;
}
