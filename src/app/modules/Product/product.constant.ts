export const FilterAbleFields = [
  "searchTerm",
  "categoryId",
  "minPrice",
  "maxPrice",
  "stock",
  "hasOffer",
  "hasFlashSale",
];

export interface IProductFilterRequest {
  searchTerm?: string; // For name, description search
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  stock?: number;
  hasOffer?: boolean;
  hasFlashSale?: boolean;
}
