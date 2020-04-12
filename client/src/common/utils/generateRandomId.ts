export function generateRandomId(): string {
  return Math.random().toString(16).substring(2);
}
