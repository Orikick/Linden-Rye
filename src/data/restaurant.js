export const restaurant = {
  name: "Linden & Rye",
  address: {
    street: "Værnedamsvej 14",
    postalCode: "1619",
    city: "København V",
  },
  phone: {
    display: "+45 33 55 01 42",
    href: "tel:+4533550142",
  },
  email: "table@lindenandrye.example",
  coordinates: { lat: 55.6736, lon: 12.5499 },
  timeZone: "Europe/Copenhagen",
};

// `day` follows Date.getDay(): 0 is Sunday. Listed Monday first for display.
// Day names come from the dictionaries ("days").
export const openingHours = [
  { day: 1, periods: [] },
  { day: 2, periods: [["17:30", "23:00"]] },
  { day: 3, periods: [["17:30", "23:00"]] },
  { day: 4, periods: [["17:30", "23:00"]] },
  { day: 5, periods: [["17:30", "00:00"]] },
  {
    day: 6,
    periods: [
      ["12:00", "15:00"],
      ["17:30", "00:00"],
    ],
  },
  {
    day: 0,
    periods: [
      ["12:00", "15:00"],
      ["17:30", "22:00"],
    ],
  },
];

// "17:30–23:00, …" or null when closed (the caller shows its own "Closed").
export function formatPeriods(periods) {
  if (periods.length === 0) return null;
  return periods.map(([open, close]) => `${open}–${close}`).join(", ");
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Today's entry, judged by the date in Copenhagen rather than the visitor's own time zone.
export function getTodayHours(now = new Date()) {
  let day = now.getDay();
  try {
    const short = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: restaurant.timeZone,
    }).format(now);
    if (WEEKDAYS.includes(short)) day = WEEKDAYS.indexOf(short);
  } catch {
    // Older browsers without time zone support use the visitor's own day.
  }
  return openingHours.find((entry) => entry.day === day);
}

export function getMapLinks({ lat, lon } = restaurant.coordinates) {
  const span = { lat: 0.002, lon: 0.005 };
  const bbox = [lon - span.lon, lat - span.lat, lon + span.lon, lat + span.lat]
    .map((value) => value.toFixed(4))
    .join(",");
  return {
    embed: `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lon}`,
    view: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
  };
}
