// Content for the extra sections on the home page. Text is in both languages;
// components pick one with pick().

export const heroBackdrop = {
  id: "1590846406792-0adc7f938f1d",
  alt: {
    en: "A warmly lit dining room with pendant lamps over the bar and tables",
    uk: "Тепло освітлена зала з підвісними лампами над баром і столами",
  },
};

// What the kitchen is cooking with right now, and where it comes from.
export const seasonalProduce = [
  {
    id: "roots",
    icon: "beet",
    name: { en: "Celeriac and beetroot", uk: "Селера й буряк" },
    source: { en: "From two farms on Zealand", uk: "З двох ферм на Зеландії" },
  },
  {
    id: "fish",
    icon: "fish",
    name: { en: "Fish and oysters", uk: "Риба й устриці" },
    source: { en: "Off the boats at Gilleleje and from Limfjorden", uk: "З човнів у Гіллелеє та з Лім-фіорду" },
  },
  {
    id: "pork",
    icon: "flame",
    name: { en: "Free-range pork", uk: "Свинина вільного випасу" },
    source: { en: "From Jutland, cooked over beech", uk: "З Ютландії, готуємо на буку" },
  },
  {
    id: "rye",
    icon: "rye",
    name: { en: "Rye", uk: "Жито" },
    source: { en: "Baked in our oven every day at four", uk: "Печемо в нашій печі щодня о четвертій" },
  },
  {
    id: "apples",
    icon: "apple",
    name: { en: "Apples", uk: "Яблука" },
    source: { en: "From an orchard on Funen", uk: "Із саду на острові Фюн" },
  },
  {
    id: "mushrooms",
    icon: "mushroom",
    name: { en: "Forest mushrooms", uk: "Лісові гриби" },
    source: { en: "Picked in the woods of North Zealand", uk: "Зібрані в лісах Північної Зеландії" },
  },
];

// The order of a dinner here. A real sequence, so it is numbered on the page.
export const eveningSteps = [
  {
    icon: "bread",
    title: { en: "Bread first", uk: "Спершу хліб" },
    text: {
      en: "Warm rye bread and whipped brown butter arrive as you sit down.",
      uk: "Теплий житній хліб і збите топлене масло з'являються, щойно ви сідаєте.",
    },
  },
  {
    icon: "plates",
    title: { en: "Plates to share", uk: "Страви на компанію" },
    text: {
      en: "Order two or three starters for the table. They come out as they are ready.",
      uk: "Замовте дві-три закуски на стіл. Ми приносимо їх, щойно вони готові.",
    },
  },
  {
    icon: "flame",
    title: { en: "Off the fire", uk: "Просто з вогню" },
    text: {
      en: "Mains come from the beech-wood grill or the old bread oven.",
      uk: "Основні страви — з гриля на буковому дереві або зі старої хлібної печі.",
    },
  },
  {
    icon: "cup",
    title: { en: "Something to finish", uk: "Щось на завершення" },
    text: {
      en: "Dessert, coffee from the roastery down the street, or a cold glass of house aquavit.",
      uk: "Десерт, кава з обсмажувальні на сусідній вулиці або келих холодного домашнього аквавіту.",
    },
  },
];

// Photo strip between sections. `wide` photos take two columns on large screens.
export const photoStrip = [
  {
    id: "1551218808-94e220e084d2",
    wide: true,
    alt: { en: "A cook chopping fresh herbs on a wooden board", uk: "Кухар нарізає свіжу зелень на дерев'яній дошці" },
  },
  {
    id: "1509440159596-0249088772ff",
    alt: {
      en: "Two dark rye loaves dusted with flour, lying beside ears of wheat",
      uk: "Дві темні житні хлібини, присипані борошном, поруч із колосками пшениці",
    },
  },
  {
    id: "1432139555190-58524dae6a55",
    alt: {
      en: "A grilled pork chop with roasted greens on a plate",
      uk: "Свиняча відбивна на грилі з печеною зеленню на тарілці",
    },
  },
  {
    id: "1510812431401-41d2bd2722f3",
    alt: { en: "Guests raising glasses of red wine in a toast", uk: "Гості піднімають келихи з червоним вином" },
  },
  {
    id: "1470337458703-46ad1756a187",
    wide: true,
    alt: { en: "A cocktail being strained into a glass at the bar", uk: "Бармен проціджує коктейль у келих" },
  },
  {
    id: "1488477181946-6428a0291777",
    alt: {
      en: "Small glass jars of panna cotta topped with chopped strawberries",
      uk: "Скляні баночки з панакотою й нарізаною полуницею",
    },
  },
];

export const longTablePhoto = {
  id: "1528605248644-14dd04022da1",
  alt: {
    en: "A group of friends talking and laughing around a long, busy dinner table",
    uk: "Компанія друзів розмовляє й сміється за довгим накритим столом",
  },
};

export const longTableFacts = [
  { icon: "table", text: { en: "Seats 10 to 18 guests", uk: "Від 10 до 18 гостей" } },
  { icon: "plates", text: { en: "Set seasonal menu from €65 per person", uk: "Сезонне сет-меню від 65 € з особи" } },
  { icon: "glass", text: { en: "Wine pairing €45 per person", uk: "Підбір вин — 45 € з особи" } },
  { icon: "clock", text: { en: "Book at least a week ahead", uk: "Бронюйте щонайменше за тиждень" } },
];
