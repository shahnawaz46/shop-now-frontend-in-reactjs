export function getKeyType<T, K extends keyof T>(obj: T, key: K): string {
  const value = obj[key];

  // because i am using null as a initial value only for number type
  if (value === null) return 'number';
  return typeof obj[key];
}
