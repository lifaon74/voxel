export interface ptr<GValue> {
  value: GValue;
}

export function ptr_create<GValue>(value: GValue): ptr<GValue> {
  return {
    value,
  };
}

export function ptr_get<GValue>(p: ptr<GValue>): GValue {
  return p.value;
}

export function ptr_set<GValue>(p: ptr<GValue>, value: GValue): void {
  p.value = value;
}
