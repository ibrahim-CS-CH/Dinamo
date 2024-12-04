export function toSnakeCase(input: string): string {
  // camelCase or PascalCase
  let snakeCase = input.replace(/([a-z])([A-Z])/g, "$1_$2");
  // kebab-case and spaces
  snakeCase = snakeCase.replace(/[-\s]/g, "_");
  return snakeCase.toLowerCase();
}
