import { IProduct } from "@/types/index";

export class Catalog {
    private products: IProduct[] = [];
    private selectedProduct: IProduct | null = null;

    public setProducts(products: IProduct[]): void {
        this.products = products;
    }

    public getProducts(): IProduct[] {
        return this.products;
    }

    public findProductsById(id: string): IProduct | undefined {
        return this.products.find((product) => product.id === id);
    }

    public setSelectedProduct(selectedProduct: IProduct): void {
        this.selectedProduct = selectedProduct;
    }

    public getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}