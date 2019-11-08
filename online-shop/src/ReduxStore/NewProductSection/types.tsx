import { IProduct } from "../../Models/Models";

export interface NewProductState {
    createProductServerResponse : number;
    toBeCreatedProductData : IProduct;
    isLoading : boolean;
}

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const CREATE_PRODUCT_ASYNC = "CREATE_PRODUCT_ASYNC";
export const UPDATE_TO_BE_CREATED_PRODUCT_DATA = "UPDATE_TO_BE_CREATED_PRODUCT_DATA";
export const NP_RESET_LOADING_STATUS = "NP_RESET_LOADING_STATUS";

export interface NPCreateNewProductAction {
    type : typeof CREATE_PRODUCT_ASYNC;
    createProductServerResponse : number;
}

export interface NPUpdateToBeCreatedProductDataAction {
    type : typeof UPDATE_TO_BE_CREATED_PRODUCT_DATA;
    toBeCreatedProductData : IProduct;
}

export interface NPResetLoadingStatusAction {
    type : typeof NP_RESET_LOADING_STATUS;
}

export type NewProductActionTypes = NPCreateNewProductAction | NPUpdateToBeCreatedProductDataAction | NPResetLoadingStatusAction;