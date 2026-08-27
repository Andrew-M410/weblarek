import { IProduct } from "@/types/index";
import { IEvents } from "../base/Events";

export class Cart {
  private products: IProduct[] = [];

  constructor(private events: IEvents) {}

  getCart(): IProduct[] {
    return [...this.products];
  }

  addProduct(product: IProduct): void {
    this.products.push(product);
    this.events.emit("cart:changed");
  }

  delProduct(id: string): void {
    this.products = this.products.filter((product) => product.id !== id);
    this.events.emit("cart:changed");
  }

  clearCart(): void {
    this.products = [];
    this.events.emit("cart:changed");
  }

  getAllPrice(): number {
    return this.products.reduce((acc, product) => {
      return acc + (product.price ?? 0);
    }, 0);
  }

  getQuantity(): number {
    return this.products.length;
  }

  isInCart(id: string): boolean {
    return this.products.some((product) => product.id === id);
  }
}