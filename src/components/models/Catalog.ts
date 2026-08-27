import { IProduct } from "@/types/index";
import { IEvents } from "../base/Events";

export class Catalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(private events: IEvents) {}

  public setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit("catalog:changed");
  }

  public getProducts(): IProduct[] {
    return this.products;
  }

  public findProductsById(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id);
  }

  public setSelectedProduct(selectedProduct: IProduct): void {
    this.selectedProduct = selectedProduct;
    this.events.emit("catalog:selected");
  }

  public getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}