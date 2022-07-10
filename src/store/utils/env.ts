export const env = (name: string, defaultValue?: string) =>
  // @ts-ignore
  window?.[name] || defaultValue;
