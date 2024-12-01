import { Dish } from "./Dish";

export interface CartItem {
  dish: Dish;
  quantity: number;
}
