export type LoginValues = {
  email: string;
  password: string;
} & Record<string, string>; // {string : string}
