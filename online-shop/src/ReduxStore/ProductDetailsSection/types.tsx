import { IProduct } from "../../Models/Models";

export interface ProductDetailsState {
    toBeReceivedData: IProduct;
    isLoading: boolean;
    error?: string;
    isDeleteModalOpen: boolean;
    shouldRedirectToShoppingCart: boolean;
    shouldRedirectFromModalDelete : boolean;
}

export const LOAD_PRODUCT_DETAILS = "LOAD_PRODUCT_DETAILS";
export const DELETE_PRODUCT_FROM_STORE = "DELETE_PRODUCT_FROM_STORE";
export const ACTIVATE_MODAL_REDIRECT_TO_PRODUCTS = "ACTIVATE_MODAL_REDIRECT_TO_PRODUCTS";

interface LoadProductDetailsAction {
    type: typeof LOAD_PRODUCT_DETAILS;
    toBeReceivedData: IProduct;
    isLoading: boolean;
    error?: string;
    isDeleteModalOpen: boolean;
    shouldRedirectToShoppingCart: boolean;
}

interface DeleteProductFromStoreAction {
    type : typeof DELETE_PRODUCT_FROM_STORE;
    productID : number;
}

interface ActivateModalRedirectToProductsAction {
    type : typeof ACTIVATE_MODAL_REDIRECT_TO_PRODUCTS;
}

export type ProductDetailsActionTypes = LoadProductDetailsAction | DeleteProductFromStoreAction | ActivateModalRedirectToProductsAction;