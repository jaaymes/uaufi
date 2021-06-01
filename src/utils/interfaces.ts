export function DateFormat(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 11;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  e.currentTarget.value = value;
}