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
export const LOAD_PRODUCT_DETAILS_ASYNC = "LOAD_PRODUCT_DETAILS_ASYNC";
export const ACTIVATE_REDIRECT = "ACTIVATE_REDIRECT";
export const DEACTIVATE_REDIRECT = "DEACTIVATE_REDIRECT";
export const TOGGLE_CONFIRMATION_DIALOG = "TOGGLE_CONFIRMATION_DIALOG";

interface LoadProductDetailsAction {
    type: typeof LOAD_PRODUCT_DETAILS_ASYNC;
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

interface ActivateRedirectAction {
    type : typeof ACTIVATE_REDIRECT;
}

interface DeactivateRedirectAction {
    type : typeof DEACTIVATE_REDIRECT;
}

interface ToggleConfirmationDialogAction {
    type : typeof TOGGLE_CONFIRMATION_DIALOG;
}

export type ProductDetailsActionTypes = LoadProductDetailsAction | DeleteProductFromStoreAction | ActivateModalRedirectToProductsAction | ActivateRedirectAction | DeactivateRedirectAction | ToggleConfirmationDialogAction;