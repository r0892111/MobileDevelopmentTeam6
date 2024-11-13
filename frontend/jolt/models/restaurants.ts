// models/restaurant.ts
export interface Restaurant {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  priceLevel: string;
  categories: string[];
}
