import { IProduct } from "../../Models/Models";

export interface ProductDetailsState {
    toBeReceivedData: IProduct;
    isLoading: boolean;
    error?: string;
    isDeleteModalOpen: boolean;
    shouldRedirectToShoppingCart: boolean;
}

export const LOAD_PRODUCT_DETAILS = "LOAD_PRODUCT_DETAILS";

interface LoadProductDetailsAction {
    type: typeof LOAD_PRODUCT_DETAILS;
    toBeReceivedData: IProduct;
    isLoading: boolean;
    error?: string;
    isDeleteModalOpen: boolean;
    shouldRedirectToShoppingCart: boolean;
}

export type ProductDetailsActionTypes = LoadProductDetailsAction;