export const cloneObject = <T>(data: any) =>
  JSON.parse(JSON.stringify(data)) as T;
