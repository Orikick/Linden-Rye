import { isSameDay } from "../utils/format.js";

export const bookingRules = {
  minGuests: 1,
  maxGuests: 10,
  // How far ahead a table can be booked.
  windowDays: 60,
  // Date.getDay() values for days the restaurant is closed. 1 is Monday.
  closedWeekdays: [1],
  // Same-day bookings need at least this much notice.
  leadMinutes: 60,
};

const LUNCH = ["12:00", "12:30", "13:00", "13:30"];
const DINNER = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
// The kitchen closes earlier on Sundays.
const SUNDAY_LAST_SLOT = "20:00";

function toMinutes(slot) {
  const [hours, minutes] = slot.split(":").map(Number);
  return hours * 60 + minutes;
}

export function isClosedOn(date) {
  return bookingRules.closedWeekdays.includes(date.getDay());
}

// Bookable times for a calendar date. Returns an empty list for closed days
// and drops times that have passed (or are too soon) when the date is today.
export function getSlotsForDate(date, now = new Date()) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return [];
  if (isClosedOn(date)) return [];

  const weekday = date.getDay();
  let slots = weekday === 0 || weekday === 6 ? [...LUNCH, ...DINNER] : DINNER;

  if (weekday === 0) {
    slots = slots.filter((slot) => toMinutes(slot) <= toMinutes(SUNDAY_LAST_SLOT));
  }

  if (isSameDay(date, now)) {
    const earliest = now.getHours() * 60 + now.getMinutes() + bookingRules.leadMinutes;
    slots = slots.filter((slot) => toMinutes(slot) >= earliest);
  }

  return slots;
}
