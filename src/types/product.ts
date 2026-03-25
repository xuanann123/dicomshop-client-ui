export interface Product {
  id: number;
  name: string;
  breed: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: ProductCategory;
  age: string;
  gender: 'male' | 'female';
  color: string;
  weight: string;
  origin: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

export type ProductCategory =
  | 'racing'
  | 'fancy'
  | 'homing'
  | 'tumbler'
  | 'carrier';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProductFilter {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  gender?: 'male' | 'female';
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
