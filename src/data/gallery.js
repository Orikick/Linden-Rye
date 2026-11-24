// Photos are served from Unsplash. `id` is the part of the image URL after "photo-".
// Alt text and captions come in both languages; components pick one with pick().
export const heroPhoto = {
  id: "1577219491135-ce391730fb2c",
  alt: {
    en: "A chef in a dark apron plating a dish at the pass under copper heat lamps",
    uk: "Кухар у темному фартусі викладає страву на роздачі під мідними лампами",
  },
};

export const storyPhoto = {
  id: "1509440159596-0249088772ff",
  alt: {
    en: "Two dark rye loaves dusted with flour, lying beside ears of wheat",
    uk: "Дві темні житні хлібини, присипані борошном, поруч із колосками пшениці",
  },
};

export const galleryPhotos = [
  {
    id: "1517248135467-4c7edcad34c4",
    alt: {
      en: "A dimly lit dining room with dark wooden tables and chairs set for dinner",
      uk: "Приглушено освітлена зала з темними дерев'яними столами, накритими до вечері",
    },
    caption: {
      en: "The dining room, half an hour before the first seating.",
      uk: "Зала за пів години до перших гостей.",
    },
  },
  {
    id: "1577219491135-ce391730fb2c",
    alt: heroPhoto.alt,
    caption: {
      en: "The pass, where every plate gets a last look.",
      uk: "Роздача, де кожну тарілку оглядають востаннє.",
    },
  },
  {
    id: "1414235077428-338989a2e8c0",
    alt: {
      en: "A plated dish on a table set with wine glasses and cutlery",
      uk: "Страва на столі, сервірованому келихами й приборами",
    },
    caption: {
      en: "Dinner service, a little after eight.",
      uk: "Вечеря, трохи по восьмій.",
    },
  },
  {
    id: "1509440159596-0249088772ff",
    alt: storyPhoto.alt,
    caption: {
      en: "Rye bread, out of the oven at four.",
      uk: "Житній хліб, щойно з печі о четвертій.",
    },
  },
  {
    id: "1482049016688-2d3e1b311543",
    alt: {
      en: "An open sandwich topped with a halved soft-boiled egg and green leaves on a dark plate",
      uk: "Відкритий бутерброд із розрізаним навпіл яйцем і зеленню на темній тарілці",
    },
    caption: {
      en: "Soft egg on toasted rye, on the menu since we opened.",
      uk: "Яйце в мішечок на житньому тості — у меню від самого відкриття.",
    },
  },
  {
    id: "1467003909585-2f8a72700288",
    alt: {
      en: "A roasted salmon fillet on braised greens, served on a white plate",
      uk: "Філе смаженого лосося на тушкованій зелені на білій тарілці",
    },
    caption: {
      en: "Pan-roasted salmon on braised greens.",
      uk: "Смажений лосось на тушкованій зелені.",
    },
  },
  {
    id: "1510812431401-41d2bd2722f3",
    alt: {
      en: "Guests raising glasses of red wine in a toast",
      uk: "Гості піднімають келихи з червоним вином",
    },
    caption: {
      en: "Friday night at the long table.",
      uk: "П'ятничний вечір за довгим столом.",
    },
  },
  {
    id: "1470337458703-46ad1756a187",
    alt: {
      en: "A cocktail being strained into a glass at the bar",
      uk: "Бармен проціджує коктейль у келих",
    },
    caption: {
      en: "A drink at the bar while your table is set.",
      uk: "Напій біля бару, поки накривають ваш стіл.",
    },
  },
  {
    id: "1488477181946-6428a0291777",
    alt: {
      en: "Small glass jars of panna cotta topped with chopped strawberries",
      uk: "Скляні баночки з панакотою й нарізаною полуницею",
    },
    caption: {
      en: "Buttermilk panna cotta with strawberries.",
      uk: "Панакота на маслянці з полуницею.",
    },
  },
];

// Three photos for the strip on the home page.
export const galleryTeaser = [galleryPhotos[0], galleryPhotos[6], galleryPhotos[2]];
