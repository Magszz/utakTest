import { Category, SortBy, Column } from "./typings/Typings";

export const CATEGORIES: Category[] = [
  {
    name: "All Items",
    value: "all",
  },
  {
    name: "Salads",
    value: "salads",
  },
  {
    name: "Burgers",
    value: "burgers",
  },
  {
    name: "Sides",
    value: "sides",
  },
  {
    name: "Beverages",
    value: "beverages",
  },
  {
    name: "Desserts",
    value: "desserts",
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
