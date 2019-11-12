export interface IProduct {
    id: number,
    name: string,
    category: string,
    image: string,
    price: number,
    description: string
}

export interface CheckoutArrayItem {
    productId: number,
    quantity: number
}

export interface SalesItem {
    category: string;
    sales: number;
}

export interface BarChartItem {
    name: string;
    data: number;
}

export interface ShopUserInfo {
    username: string;
    fullName: string;
    roles: string[];
}

export let emptyLoginUser: ShopUserInfo = {
    username: "Unknown",
    fullName: "Unknown",
    roles: []
}

export interface LoginEntity {
    username : string;
    password : string;
}