// Dietary tags used in menu.json. Their labels live in the dictionaries under "dietary".
export const dietaryTagIds = ["vegetarian", "vegan", "gluten-free", "dairy-free", "contains-nuts"];

// Options for the filter on the menu page; labels are under "menu.filters".
// A vegan dish also counts as vegetarian.
export const dietFilters = [
  { value: "all", matches: () => true },
  { value: "vegetarian", matches: (tags) => tags.includes("vegetarian") || tags.includes("vegan") },
  { value: "vegan", matches: (tags) => tags.includes("vegan") },
  { value: "gluten-free", matches: (tags) => tags.includes("gluten-free") },
];
