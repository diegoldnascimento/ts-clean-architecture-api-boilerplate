export interface ProductDTO {
  id: null | string;
  title: string;
  price: number;
  currency: string;
  storage: number;
  manufacturer: string;
  in_stock: boolean;
  last_update: Date;
}
