export interface MenuItem {
  id: number;
  name: string;
  price: number;
  restaurantId: number;  // Link each menu item to a restaurant ID
  description?: string;  // Optional field for item description
  imageUrl?: string;     // Optional field for item image
  createdAt?: string;    // Optional field for created timestamp
  updatedAt?: string;    // Optional field for updated timestamp
}
