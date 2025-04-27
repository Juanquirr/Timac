export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  checkbox: boolean;
  currency: string;
  availability: {
    in_store: boolean;
    delivery: boolean;
  };
  brand: string;
  category: string;
  description: string[];
  image: string;
  offer: boolean;
  new: boolean;
  on_sale: boolean;
  subcategory: string;
  trending: boolean;
}
