import {
  IApi,
  IOrderRequest,
  IOrderResponse,
  IProductsResponse,
} from "@/types/index";

export class ApiWebLarek {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<IProductsResponse> {
    return this.api.get<IProductsResponse>("/product/");
  }

  postOrder(data: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>("/order/", data);
  }
}