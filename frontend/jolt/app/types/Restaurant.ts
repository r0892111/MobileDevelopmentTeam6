import { Dish } from './Dish';

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  cost: number;
  description: string;
  rating: number;
  imageUrl: string;
  dishes: Dish[];
}
