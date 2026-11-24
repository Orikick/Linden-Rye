import { galleryPhotos } from "./gallery.js";

// Dishes featured on the home page. Names, descriptions and prices match menu.json.
export const highlights = [
  {
    id: "soft-egg-rye",
    name: { en: "Soft egg on toasted rye", uk: "Яйце в мішечок на житньому тості" },
    description: {
      en: "Six-minute egg, watercress, pickled mustard seeds and brown butter crumbs.",
      uk: "Яйце шість хвилин, крес-салат, мариновані гірчичні зерна й крихта з топленим маслом.",
    },
    price: 17,
    photo: galleryPhotos[4],
  },
  {
    id: "pan-roasted-salmon",
    name: { en: "Pan-roasted salmon", uk: "Смажений лосось" },
    description: {
      en: "Crisp-skinned salmon on braised greens with a brown butter and lemon sauce.",
      uk: "Лосось із хрусткою шкіркою на тушкованій зелені, із соусом з топленого масла й лимона.",
    },
    price: 35.5,
    photo: galleryPhotos[5],
  },
  {
    id: "buttermilk-panna-cotta",
    name: { en: "Buttermilk panna cotta", uk: "Панакота на маслянці" },
    description: {
      en: "Set buttermilk cream with strawberries and a spoonful of their syrup.",
      uk: "Вершки з маслянкою з полуницею й ложкою полуничного сиропу.",
    },
    price: 12.5,
    photo: galleryPhotos[8],
  },
];
