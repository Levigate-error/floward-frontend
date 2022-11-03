import { SelectOption } from './types';

const optiontify = (obj: Record<string, string>): SelectOption[] => (
  Object.entries(obj).map(([key, value]) => ({
    id: key,
    label: value,
    value: key,
  }))
);

export { optiontify };
