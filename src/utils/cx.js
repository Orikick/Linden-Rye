// Joins class names, skipping anything falsy.
export default function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
