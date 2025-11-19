// Merge class names conditionally (used by shadcn UI components)
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
