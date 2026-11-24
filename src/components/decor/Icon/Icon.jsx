// Small line icons drawn for this site. Decorative by default (hidden from
// screen readers); the text next to an icon always carries the meaning.
const paths = {
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3.5 2",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  phone:
    "M6.6 3h3l1.5 4.5-2 1.5a12 12 0 0 0 5.9 5.9l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z",
  rye: "M12 22V4M12 8c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zm0 0c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4zM12 13c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zm0 0c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4zM12 18c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zm0 0c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4z",
  leaf: "M12 4c5 0 7.5 4.5 6.5 9-.8 3.5-4 5.5-6.5 7.5C9.5 18.5 6.3 16.5 5.5 13c-1-4.5 1.5-9 6.5-9zM12 4v16.5M12 9l3.5-2M12 9 8.5 7M12 13.5l4-1.5M12 13.5 8 12M12 4c.5-1.2 1.5-2 3-2.3",
  flame:
    "M12 22c4 0 7-2.8 7-6.8 0-3.7-2.6-6.2-4.4-8.6-.4 2.1-1.6 3.4-3 3.9.2-3-1-5.8-3.6-8.5C8 5.6 5 9.4 5 15.2 5 19.2 8 22 12 22z",
  fish: "M5 12c3-4 6.5-6 10-6 3 0 5.5 2.4 7 6-1.5 3.6-4 6-7 6-3.5 0-7-2-10-6zM5 12 2 8.5v7zM17 10.5v.01",
  apple:
    "M12 7.5c-1.5-1.2-4-1.5-5.8 0C4 9.3 4 13 5.6 16.3c1.4 3 3.6 5 5.2 4.4.6-.2.9-.4 1.2-.4s.6.2 1.2.4c1.6.6 3.8-1.4 5.2-4.4 1.6-3.3 1.6-7-.6-8.8-1.8-1.5-4.3-1.2-5.8 0zM12 7.5c0-2 1-3.5 3-4.5",
  mushroom: "M3.5 12a8.5 7.5 0 0 1 17 0zM9 12v6a3 3 0 0 0 6 0v-6M8 8.5h.01M13 6.5h.01M16 9h.01",
  beet: "M12 9c3.9 0 6 2.6 6 5.5 0 3.6-3 6.5-6 8.5-3-2-6-4.9-6-8.5C6 11.6 8.1 9 12 9zM12 9V6M12 6C10.5 4 8.5 3 7 3c0 2 1.5 3.5 5 3zm0 0c1.5-2 3.5-3 5-3 0 2-1.5 3.5-5 3z",
  bread:
    "M4 11c0-3.3 3.6-5 8-5s8 1.7 8 5c0 1.2-.8 2-2 2v6H6v-6c-1.2 0-2-.8-2-2zM9 9l1 2M12 8.5l1 2M15 9l1 2",
  plates: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  cup: "M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3c0 1.5 1.5 2 1.5 4M12 3c0 1.5 1.5 2 1.5 4",
  glass: "M7 3h10l-1 6a4 4 0 0 1-8 0L7 3zM12 13v8M8 21h8",
  table: "M3 10h18M6 10v9M18 10v9M7 7a1.5 1.5 0 1 0 0-.01M12 7a1.5 1.5 0 1 0 0-.01M17 7a1.5 1.5 0 1 0 0-.01",
};

export default function Icon({ name, size = 24, className, strokeWidth = 1.75 }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
