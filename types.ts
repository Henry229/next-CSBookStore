export interface Product {
  id: string;
  category: Category;
  title: string;
  price: string;
  isFeatured: boolean;
  item: Item;
  subject: Subject;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  title: string;
}

export interface Item {
  id: string;
  title: string;
  value: string;
}

export interface Subject {
  id: string;
  title: string;
  value: string;
}
