import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { bookingRules, getSlotsForDate } from "../../../data/timeSlots.js";
import { restaurant } from "../../../data/restaurant.js";
import useBookingSubmit from "../../../hooks/useBookingSubmit.js";
import { useLanguage } from "../../../i18n/LanguageContext.jsx";
import { bookingDefaults, createBookingSchema } from "../../../schemas/bookingSchema.js";
import Button from "../../ui/Button/Button.jsx";
import Spinner from "../../ui/Spinner/Spinner.jsx";
import StatusMessage from "../../ui/StatusMessage/StatusMessage.jsx";
import DateField from "../DateField/DateField.jsx";
import FormField from "../FormField/FormField.jsx";
import GuestStepper from "../GuestStepper/GuestStepper.jsx";
import TimeSlotPicker from "../TimeSlotPicker/TimeSlotPicker.jsx";
import styles from "./BookingForm.module.scss";

// Field order here is the order of the form, and of the error summary.
const FIELDS = [
  { name: "date", id: "booking-date" },
  { name: "time", id: "booking-time" },
  { name: "guests", id: "booking-guests" },
  { name: "name", id: "booking-name" },
  { name: "phone", id: "booking-phone" },
  { name: "comment", id: "booking-comment" },
];
const fieldId = Object.fromEntries(FIELDS.map((field) => [field.name, field.id]));

// The booking form. Validation runs on submit (and then live, as fields are
// corrected). `onBooked` receives the confirmed booking.
export default function BookingForm({ onBooked }) {
  const { t, lang } = useLanguage();
  // The schema carries translated messages; the resolver always reads the
  // latest one, so switching language mid-form uses the new wording.
  const schemaRef = useRef(null);
  schemaRef.current = useMemo(() => createBookingSchema(t), [t]);
  const resolver = useCallback((...args) => zodResolver(schemaRef.current)(...args), []);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting, submitCount },
  } = useForm({
    resolver,
    defaultValues: bookingDefaults,
    shouldFocusError: false,
  });
  const { submit, error: submitError } = useBookingSubmit();
  const summaryRef = useRef(null);

  const date = watch("date");
  const time = watch("time");
  const slots = getSlotsForDate(date);

  // Messages already on screen switch language with the rest of the page.
  useEffect(() => {
    if (submitCount > 0) trigger();
    // Only when the language changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // A time chosen for one date may not exist on another (lunch is weekends only).
  useEffect(() => {
    if (time && !getSlotsForDate(date).includes(time)) {
      setValue("time", "", { shouldValidate: submitCount > 0 });
    }
  }, [date, time, setValue, submitCount]);

  const errorList = FIELDS.filter((field) => errors[field.name]).map((field) => ({
    id: field.id,
    message: errors[field.name].message,
  }));
  const hasErrors = errorList.length > 0;

  // After a failed submit, move focus to the summary so the errors are announced
  // and keyboard users can jump straight to each field.
  useEffect(() => {
    if (submitCount > 0 && hasErrors) summaryRef.current?.focus();
    // Only when a new submit attempt happens, not on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount]);

  const focusField = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "center" });
  };

  const onValid = async (values) => {
    const booking = await submit(values);
    if (booking) onBooked(booking);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onValid)} noValidate>
      {hasErrors && submitCount > 0 && (
        <div ref={summaryRef} className={styles.summary} role="alert" tabIndex={-1}>
          <h2 className={styles.summaryTitle}>{t("booking.fix", { count: errorList.length })}</h2>
          <ul className={styles.summaryList}>
            {errorList.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(event) => focusField(event, item.id)}>
                  {item.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <DateField id={fieldId.date} value={field.value} onChange={field.onChange} error={errors.date?.message} />
        )}
      />

      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <TimeSlotPicker
            id={fieldId.time}
            slots={slots}
            hasDate={Boolean(date)}
            value={field.value}
            onChange={field.onChange}
            error={errors.time?.message}
          />
        )}
      />

      <Controller
        name="guests"
        control={control}
        render={({ field }) => (
          <GuestStepper
            id={fieldId.guests}
            value={field.value}
            onChange={field.onChange}
            min={bookingRules.minGuests}
            max={bookingRules.maxGuests}
          />
        )}
      />

      <FormField id={fieldId.name} label={t("booking.name")} error={errors.name?.message}>
        {(props) => <input type="text" autoComplete="name" aria-required="true" {...props} {...register("name")} />}
      </FormField>

      <FormField
        id={fieldId.phone}
        label={t("booking.phone")}
        hint={t("booking.phoneHint")}
        error={errors.phone?.message}
      >
        {(props) => (
          <input type="tel" inputMode="tel" autoComplete="tel" aria-required="true" {...props} {...register("phone")} />
        )}
      </FormField>

      <FormField
        id={fieldId.comment}
        label={t("booking.note")}
        hint={t("booking.noteHint")}
        error={errors.comment?.message}
        optional
      >
        {(props) => <textarea rows={4} {...props} {...register("comment")} />}
      </FormField>

      {submitError && (
        <StatusMessage tone="error" title={t("booking.notBooked")} as="h2">
          <p>
            {t(`booking.errors.${submitError}`)} <a href={restaurant.phone.href}>{restaurant.phone.display}</a>
          </p>
        </StatusMessage>
      )}

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting} className={styles.submit}>
          {isSubmitting ? <Spinner label={t("booking.submitting")} /> : t("booking.submit")}
        </Button>
      </div>
    </form>
  );
}
