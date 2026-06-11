// formats 4242424242424242 into 4242 4242 4242 4242
export function formatPhone(value: string): string {
  "worklet";
  if (!value) return "";

  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
