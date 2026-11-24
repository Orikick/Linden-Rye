import { z } from "zod";
import { bookingRules, getSlotsForDate, isClosedOn } from "../data/timeSlots.js";
import { addDays, startOfToday } from "../utils/format.js";

const isDate = (value) => value instanceof Date && !Number.isNaN(value.getTime());

// Built with the current language's t(), so every error message is translated.
export function createBookingSchema(t) {
  const { minGuests, maxGuests, windowDays } = bookingRules;

  return z
    .object({
      date: z
        .custom(isDate, t("booking.errors.date"))
        .refine((date) => date >= startOfToday(), t("booking.errors.past"))
        .refine((date) => date <= addDays(startOfToday(), windowDays), t("booking.errors.far", { days: windowDays }))
        .refine((date) => !isClosedOn(date), t("booking.errors.closed")),
      time: z.string().min(1, t("booking.errors.time")),
      guests: z
        .number()
        .int()
        .min(minGuests, t("booking.errors.guestsMin"))
        .max(maxGuests, t("booking.errors.guestsMax", { max: maxGuests })),
      name: z.string().trim().min(2, t("booking.errors.name")).max(80, t("booking.errors.nameLong")),
      phone: z
        .string()
        .trim()
        .min(1, t("booking.errors.phone"))
        .regex(/^\+?[\d\s().-]+$/, t("booking.errors.phoneChars"))
        .refine((value) => {
          const digits = value.replace(/\D/g, "").length;
          return digits >= 7 && digits <= 15;
        }, t("booking.errors.phoneLength")),
      comment: z.string().trim().max(300, t("booking.errors.note")),
    })
    .superRefine((values, context) => {
      // A time is only valid for the chosen date: lunch is weekends only,
      // and today's earlier times drop away as the day goes on.
      if (!isDate(values.date) || !values.time) return;
      if (!getSlotsForDate(values.date).includes(values.time)) {
        context.addIssue({ code: "custom", path: ["time"], message: t("booking.errors.timeUnavailable") });
      }
    });
}

export const bookingDefaults = {
  date: undefined,
  time: "",
  guests: 2,
  name: "",
  phone: "",
  comment: "",
};
