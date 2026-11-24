import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";

// The home page ships in the main bundle so it paints quickly.
// Every other page loads on demand, which keeps Swiper, the date picker
// and the form libraries out of the first download.
const Menu = lazy(() => import("./pages/Menu/Menu.jsx"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery.jsx"));
const Booking = lazy(() => import("./pages/Booking/Booking.jsx"));
const BookingConfirmation = lazy(
  () => import("./pages/BookingConfirmation/BookingConfirmation.jsx"),
);
const Contacts = lazy(() => import("./pages/Contacts/Contacts.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="booking" element={<Booking />} />
        <Route path="booking/confirmation" element={<BookingConfirmation />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
