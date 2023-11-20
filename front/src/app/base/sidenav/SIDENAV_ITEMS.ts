import { SidenavItem } from "app/base/sidenav/sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: "menu-item-products",
    labels: {
      en: "Products",
      fr: "Produits",
    },
    link: "/products",
  },
  {
    id: "menu-item-admin",
    labels: {
      en: "Admin",
      fr: "Admin",
    },
    link: "/admin",
  },
];
