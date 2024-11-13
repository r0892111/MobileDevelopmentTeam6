// data/mockRestaurants.ts
import { Restaurant } from '../models/restaurants';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Pasta Palace',
    image: 'https://example.com/pasta.jpg',
    description: 'Delicious Italian pastas',
    rating: 4.5,
    priceLevel: '$$',
    categories: ['Italian', 'Pasta'],
  },
  {
    id: 2,
    name: 'Burger Barn',
    image: 'https://example.com/burger.jpg',
    description: 'Classic American burgers',
    rating: 4.7,
    priceLevel: '$',
    categories: ['American', 'Burgers'],
  },
  // Add more restaurants here...
];
