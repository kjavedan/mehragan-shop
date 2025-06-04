export const categoriesData = {
  categories: [
    {
      name: "برق",
      subcategories: [
        {
          name: "کلید و پریز",
          items: ["کلید تک", "پریز ارت‌دار", "کلید دوپل"],
        },
        {
          name: "سیم و کابل",
          items: ["سیم ۱ در ۱.۵", "کابل ۲ در ۲.۵", "سیم افشان"],
        },
        {
          name: "فیوز و جعبه",
          items: ["فیوز مینیاتوری 16A", "جعبه فیوز ۸ خانه"],
        },
      ],
    },
    {
      name: "لوله",
      subcategories: [
        {
          name: "لوله پنج لایه",
          items: ["لوله ۲۰ پنج لایه", "لوله ۲۵ پنج لایه"],
        },
        {
          name: "اتصالات",
          items: ["زانو ۹۰", "سه‌راهی", "مغزی"],
        },
        {
          name: "چسب و نوار",
          items: ["چسب لوله سبز", "نوار تفلون"],
        },
      ],
    },
    {
      name: "فاضلاب",
      subcategories: [
        {
          name: "لوله و اتصالات",
          items: ["لوله پلیکا ۵ سانت", "زانویی فاضلابی"],
        },
        {
          name: "کف‌شور و سیفون",
          items: ["کف‌شور استیل", "سیفون سینک دوقلو"],
        },
        {
          name: "متعلقات",
          items: ["درپوش فاضلاب", "شترگلویی"],
        },
      ],
    },
    {
      name: "شیر آلات",
      subcategories: [
        {
          name: "شیرآلات بهداشتی",
          items: ["شیر ظرفشویی", "شیر روشویی", "شیر حمام"],
        },
        {
          name: "شلنگ و علم دوش",
          items: ["شلنگ توالت", "علم دوش"],
        },
        {
          name: "قطعات یدکی",
          items: ["کارتریج شیر", "دستگیره شیر"],
        },
      ],
    },
  ],
}

// Generate random prices for items
export function getItemPrice(itemName: string): number {
  const hash = itemName.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
  return Math.abs(hash % 50000) + 10000 // Price between 10,000 and 60,000
}
