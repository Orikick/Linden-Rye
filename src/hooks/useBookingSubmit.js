import { useCallback, useState } from "react";
import { createReference, toIsoDate } from "../utils/format.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class BookingError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

// There is no booking backend. This stands in for the request so the form has
// real pending and failure states: it waits briefly, fails when the browser is
// offline, and otherwise resolves with the booking as a server would return it.
async function sendBooking(values) {
  await wait(900);

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    throw new BookingError("offline");
  }

  return {
    reference: createReference(),
    date: toIsoDate(values.date),
    time: values.time,
    guests: values.guests,
    name: values.name,
    phone: values.phone,
    comment: values.comment,
  };
}

// `error` is a code ("offline" or "generic"); the form turns it into text.
export default function useBookingSubmit() {
  const [error, setError] = useState(null);

  const submit = useCallback(async (values) => {
    setError(null);
    try {
      return await sendBooking(values);
    } catch (cause) {
      setError(cause instanceof BookingError ? cause.code : "generic");
      return null;
    }
  }, []);

  return { submit, error };
}
