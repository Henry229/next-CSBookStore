export interface Product {
  id: string;
  category?: Category | null;
  title: string;
  price: string;
  isFeatured: boolean;
  item?: Item | null;
  subject?: Subject | null;
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
