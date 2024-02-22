import { Category, SortBy, Column } from "./typings/Typings";

export const VALID_IMG_TYPES = ["image/jpeg", "image/png", "image/jpg"];
export const CATEGORIES: Category[] = [
  {
    name: "All Items",
    value: "all",
  },
  {
    name: "Salads",
    value: "salad",
  },
  {
    name: "Burgers",
    value: "burger",
  },
  {
    name: "Sides",
    value: "side",
  },
  {
    name: "Pizza",
    value: "pizza",
  },
  {
    name: "Beverages",
    value: "beverage",
  },
  {
    name: "Desserts",
    value: "dessert",
  },
];

export const TABLE_COLUMNS: Column[] = [
  {
    name: "Product",
    className: "w-[350px]",
  },
  {
    name: "Category",
    className: "",
  },
  {
    name: "Price",
    className: "",
  },
  {
    name: "Cost",
    className: "",
  },
  {
    name: "Stock",
    className: "",
  },
  {
    name: "Date Created",
    className: "",
  },
  {
    name: "Options",
    className: "w-[200px]",
  },
  {
    name: "Actions",
    className: "",
  },
];

export const SORT_BY: SortBy[] = [
  {
    name: "Default",
    value: "default",
  },
  {
    name: "Name",
    value: "name",
  },
  {
    name: "Category",
    value: "category",
  },
  {
    name: "Price",
    value: "price",
  },
  {
    name: "Cost",
    value: "cost",
  },
];
