import type { Product, ProductFilter } from '../types/product';
import { mockProducts } from '../mock/products';
import { delay } from '../utils/helpers';

// Mock product service - sẽ thay bằng API thật sau
export const productService = {
  getAll: async (filter?: ProductFilter): Promise<Product[]> => {
    await delay(500);

    let products = [...mockProducts];

    if (filter?.category) {
      products = products.filter((p) => p.category === filter.category);
    }
    if (filter?.gender) {
      products = products.filter((p) => p.gender === filter.gender);
    }
    if (filter?.minPrice) {
      products = products.filter((p) => p.price >= filter.minPrice!);
    }
    if (filter?.maxPrice) {
      products = products.filter((p) => p.price <= filter.maxPrice!);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.breed.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (filter?.sortBy) {
      switch (filter.sortBy) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          products.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
      }
    }

    return products;
  },

  getById: async (id: number): Promise<Product | undefined> => {
    await delay(300);
    return mockProducts.find((p) => p.id === id);
  },

  getFeatured: async (): Promise<Product[]> => {
    await delay(400);
    return mockProducts.filter((p) => p.featured);
  },
};
