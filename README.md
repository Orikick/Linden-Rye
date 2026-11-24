# Linden & Rye

Developed by **Orest Labiak**.

**Live demo:** _link coming soon_ <!-- replace with the Vercel or Netlify URL -->

<!-- Screenshots: save them to the docs/ folder with these names, then delete this comment's first and last lines.
![Desktop view](docs/screenshot-desktop.png)
![Mobile view](docs/screenshot-mobile.png)
-->

Website for Linden & Rye, a fictional modern European restaurant in Copenhagen. It has five pages: home, menu, gallery, booking and contacts, in English and Ukrainian. Guests can browse the menu by category, look through photos of the room, and book a table through a validated form that ends in a confirmation screen.

The restaurant, its address, phone number and bookings are invented for this project. There is no backend: the booking request is simulated in the browser and nothing is sent anywhere.

## Stack

- [Vite](https://vite.dev/) and React 19 (JavaScript)
- React Router for the pages
- SCSS modules for styling, one module per component
- [Swiper](https://swiperjs.com/) for the gallery slider
- [React Day Picker](https://daypicker.dev/) for the booking calendar
- [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for form validation
- Fontsource for the self-hosted font (Archivo, using its width axis: wide for headings, normal for text)
- A small built-in translation layer (React context, no extra library)
- Photos from [Unsplash](https://unsplash.com/), map from [OpenStreetMap](https://www.openstreetmap.org/)

## How to run

You need Node.js 20.19 or newer (or 22.12 or newer).

```bash
npm install
npm run dev
```

The site opens at `http://localhost:5173`.

To make a production build and preview it:

```bash
npm run build
npm run preview
```

Run Lighthouse against the preview build, not the dev server, since the dev server serves unminified code.

The site uses client-side routing. When you deploy it, configure the host to serve `index.html` for every path (most static hosts have a "single-page app" setting for this).

## Features

**Languages and prices**

- English and Ukrainian, switched with the EN / UA control in the header. English is the default; a visitor's choice is remembered in the browser.
- Everything is translated: interface text, menu, photo captions and alt text, validation messages, dates, the calendar and plural forms (1 гість, 2 гості, 5 гостей).
- Prices are in euros and formatted for the language: €35.50 in English, 35,50 € in Ukrainian.
- The page's `lang` attribute follows the language, so screen readers switch voice.

**Pages**

- **Home**: a full-width photo hero with the headline on a cobalt panel and a round stamp; a band with today's hours, address and phone; the restaurant's story; what is in season and where it comes from; three dishes from the menu; how an evening goes, step by step; a photo strip; the long table for groups; and a booking call to action.
- **Menu**: category tabs backed by `src/data/menu.json` (name, description, price in euros, dietary tags). The tabs and the diet filter (vegetarian, vegan, gluten-free) stay pinned under the header while you scroll, each tab shows how many dishes match the filter, and the list starts with a count. The open category is kept in the URL (`/menu?category=mains`).
- **Gallery**: Swiper slider with captions, previous and next buttons, a photo counter and thumbnails.
- **Booking**: calendar with past dates, Mondays and dates more than 60 days ahead disabled; time slots that depend on the chosen date (lunch at weekends only, and no times that have already passed today); guest counter; name, phone and an optional note.
- **Booking confirmation**: summary of the booking with a reference code.
- **Contacts**: address, click-to-call phone link, email, opening hours with today marked, and an embedded map with directions links.
- **Not found**: shown for any unknown address.

**Form validation**

- React Hook Form with a Zod schema (`src/schemas/bookingSchema.js`).
- Errors appear next to each field and in a summary at the top of the form. After a failed submit, focus moves to the summary, and each entry links to its field.
- The chosen time is checked against the chosen date, so a time cannot be submitted for a day it does not exist on.

**Loading, empty and error states**

| Where | Loading | Empty | Error |
|---|---|---|---|
| Menu | Skeleton while `menu.json` loads | No categories, or no dishes match the filter | The file fails to load, with a retry button |
| Gallery | Image placeholders | No photos | A photo fails to load |
| Booking times | | No date chosen, or no tables left that day | Invalid time for the date |
| Booking submit | Spinner in the button | | Request fails (try it by going offline in DevTools) |
| Confirmation | | Opened directly, without a booking | |
| Map | Spinner until the map loads | | Browser is offline |
| Any page | Spinner while the page's code loads | | The page fails to load or render |

**Decoration**

- A line pattern of linden leaves and ears of rye on the coloured sections, page headers and footer (`pattern` mixin in `src/styles/_mixins.scss`).
- Wavy edges between sections, small line icons and a round stamp (`src/components/decor`).
- Dishes with a photo show it beside their name on the menu page.

**Responsive layout**

- Designed at 360px, with layout changes at 768px and 1280px.
- Below 768px the navigation collapses into a panel opened from a button in the header.

**Accessibility**

- Semantic landmarks, one `h1` per page, and a "Skip to main content" link.
- Every form control has a label; hints and errors are linked to their fields.
- Visible focus rings on every interactive element, on light and dark backgrounds.
- Menu tabs follow the WAI-ARIA tabs pattern (arrow keys, Home, End).
- On each page change, focus moves to the main content and the page title updates.
- All photos have alt text. Dietary tags are text, not colour codes.
- Text and interface colours meet WCAG AA contrast.
- Animation is reduced when the system asks for reduced motion.

**Performance**

- Every page except home is loaded on demand, so Swiper, the calendar and the form libraries are not in the first download.
- Photos are requested from Unsplash at the size the layout needs (`srcset` and `sizes`), with fixed aspect ratios to prevent layout shift. Only the first visible photo loads eagerly.
- Fonts are self-hosted and swap in without blocking text.

## Folder structure

```
src/
├─ main.jsx            entry point
├─ App.jsx             routes
├─ styles/             variables, mixins, global styles
├─ data/               menu.json, photos, restaurant details, time slots
├─ hooks/              useMenu, useBookingSubmit, useDocumentTitle
├─ i18n/               LanguageContext, en.js, uk.js
├─ schemas/            Zod schema for the booking form
├─ utils/              formatting helpers
├─ components/
│  ├─ layout/          Layout, Header, MobileNav, LanguageSwitcher, Footer,
│  │                   SkipLink, ScrollToTop
│  ├─ decor/           Wave, Icon, Stamp
│  ├─ ui/              Button, Container, PageHeader, SectionHeading, Picture,
│  │                   ChoiceChips, Tag, Spinner, StatusMessage, ErrorBoundary
│  ├─ menu/            MenuTabs, MenuList, MenuItem, MenuSkeleton
│  ├─ gallery/         GallerySlider
│  ├─ booking/         BookingForm, FormField, DateField, TimeSlotPicker,
│  │                   GuestStepper, BookingSummary
│  └─ contacts/        ContactDetails, OpeningHours, MapEmbed
└─ pages/              Home, Menu, Gallery, Booking, BookingConfirmation,
                       Contacts, NotFound
```

## Changing the content

- **Menu**: edit `src/data/menu.json`. Names, descriptions and category labels have an `en` and a `uk` version; prices are in euros. Tags must be ids from `src/data/dietaryTags.js`.
- **Interface text**: edit `src/i18n/en.js` and `src/i18n/uk.js`. Both files have the same keys; a key missing in Ukrainian falls back to English.
- **Photos**: edit `src/data/gallery.js` and `src/data/highlights.js`. Each photo is an Unsplash photo id plus alt text and a caption in both languages.
- **Address, phone, hours, map position**: edit `src/data/restaurant.js`.
- **Booking rules** (closed days, time slots, group size, booking window): edit `src/data/timeSlots.js`.
- **Colours and type**: edit the custom properties at the top of `src/styles/global.scss`. The palette is cream (`--cream`), cobalt (`--cobalt`), mustard (`--mustard`) and ink (`--ink`). Shapes, borders and the offset behind framed photos are in `src/styles/_variables.scss`.

## Code quality

```bash
npm run lint          # check the code with ESLint
npm run lint:fix      # fix what ESLint can fix automatically
npm run format        # format every file with Prettier
npm run format:check  # check formatting without changing files
```

ESLint uses the recommended JavaScript rules plus the React Hooks rules (`eslint.config.js`).
Prettier settings are in `.prettierrc.json`.
