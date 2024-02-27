import { Category, SortBy, Column, Options } from "./typings/Typings";

export const VALID_IMG_TYPES = ["image/jpeg", "image/png", "image/jpg"];
export const COLSPAN = 9;
export const CATEGORIES: Category[] = [
  {
    name: "Salad",
    value: "salad",
  },
  {
    name: "Burger",
    value: "burger",
  },
  {
    name: "Side",
    value: "side",
  },
  {
    name: "Pizza",
    value: "pizza",
  },
  {
    name: "Beverage",
    value: "beverage",
  },
  {
    name: "Dessert",
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
    name: "Last Modified",
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
    value: "productName",
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

export const OPTIONS: Options[] = [
  {
    name: "Small",
    value: "small",
  },
  {
    name: "Regular",
    value: "regular",
  },
  {
    name: "Large",
    value: "large",
  },
  {
    name: "Not applicable",
    value: "N/A",
  },
];
