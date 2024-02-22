export interface Category {
  name: string;
  value: string;
}

export interface SortBy extends Category {}

export interface Column {
  name: string;
  className?: string;
}

type Notif = {
  title: string;
  description: string;
};

export type NotifLang<T extends string> = {
  [Key in T]: {
    success?: Notif;
    error: Notif;
  };
};

export interface FormStatus {
  loading: boolean;
  open: boolean;
  disabled: boolean;
}

export interface TProduct {
  category: string;
  cost: string;
  id: string;
  options: string;
  price: string;
  productName: string;
  stockAmount: string;
  image: string;
  dateCreated: string;
}

export interface ImgInfo {
  fileName: string;
  file: File;
}
