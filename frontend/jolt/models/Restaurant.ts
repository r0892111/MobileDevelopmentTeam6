
import { Dish } from "./Dish";

export interface Restaurant {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  rating: number;
  cost: number;
  dishes: Dish[];
  categories?: string[];
  address: string;
  priceLevel: number;
  createdAt: string;
  updatedAt: string;
}
