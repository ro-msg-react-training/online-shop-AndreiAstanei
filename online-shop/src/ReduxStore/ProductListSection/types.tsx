//Describing the State for the Product List part
import { IProduct } from '../../Models/Models';

export interface ProductListState {
    data: IProduct[];
    isLoading: boolean;
    error: string;
}

export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const LOAD_PRODUCTS_ASYNC = "LOAD_PRODUCTS_ASYNC";

interface LoadProductsAction {
    type : typeof LOAD_PRODUCTS_ASYNC;
    data : IProduct[];
    isLoading : boolean;
    error : string;
}

export type ProductListActionTypes = LoadProductsAction;
