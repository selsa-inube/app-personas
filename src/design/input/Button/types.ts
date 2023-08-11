const buttonTypes = ["submit", "button", "link", "reset"] as const;
type ButtonTypesType = (typeof buttonTypes)[number];
export { buttonTypes };
export type { ButtonTypesType };
