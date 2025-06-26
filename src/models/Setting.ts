import { SettingValue } from "./SettingValue";

interface SettingCommons {
  key: string;
  value: SettingValue;
  locked: boolean;
}

interface StringSetting extends SettingCommons {
  value: string;
}

interface BooleanSetting extends SettingCommons {
  value: boolean;
}

interface NumberSetting extends SettingCommons {
  value: number;
}

export type Setting<V extends SettingValue = SettingValue> = V extends string
  ? StringSetting
  : V extends boolean
    ? BooleanSetting
    : V extends number
      ? NumberSetting
      : V extends SettingValue
        ? SettingCommons
        : never;
