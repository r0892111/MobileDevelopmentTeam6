// models/restaurant.ts



export interface Restaurant {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  rating: number;
  cost: number; // Updated type to match provided data
  categories?: string[]; // Optional if categories are not always present
  address: string;
  createdAt: string;
  updatedAt: string;
}
