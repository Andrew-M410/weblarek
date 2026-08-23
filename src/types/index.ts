export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(url: string): Promise<T>;
    post<T extends object>(url: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}

export interface IOrderRequest extends IBuyer {
    total: number;
    items: string[];
}

export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export type TPayment = "card" | "cash";

export type TValidateErrors = Partial<Record<keyof IBuyer, string>>;