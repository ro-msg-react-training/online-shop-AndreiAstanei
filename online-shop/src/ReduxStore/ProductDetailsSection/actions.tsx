import { IProduct } from '../../Models/Models';
import * as PDTypes from './types';

export function loadProductDetails(toBeReceivedData: IProduct, isDeleteModalOpen: boolean, shouldRedirectToShoppingCart: boolean, error?: string) : PDTypes.ProductDetailsActionTypes {
    return {
        type : PDTypes.LOAD_PRODUCT_DETAILS_ASYNC,
        toBeReceivedData : toBeReceivedData,
        isDeleteModalOpen : isDeleteModalOpen,
        shouldRedirectToShoppingCart : shouldRedirectToShoppingCart,
        error : error
    };
}

export function deleteProductFromStore(productID : number) : PDTypes.ProductDetailsActionTypes {
    return {
       type : PDTypes.DELETE_PRODUCT_FROM_STORE,
       productID : productID 
    };
}

export function activateModalRedirectToProducts() : PDTypes.ProductDetailsActionTypes {
    return {
        type : PDTypes.ACTIVATE_MODAL_REDIRECT_TO_PRODUCTS
    };
}

export function activateRedirect() : PDTypes.ProductDetailsActionTypes {
    return {
        type : PDTypes.ACTIVATE_REDIRECT
    };
}

export function deactivateRedirect() : PDTypes.ProductDetailsActionTypes {
    return {
        type : PDTypes.DEACTIVATE_REDIRECT
    };
}

export function toggleConfirmationDialog() : PDTypes.ProductDetailsActionTypes {
    return {
        type : PDTypes.TOGGLE_CONFIRMATION_DIALOG
    };
}

export function PDResetLoadingStatus() : PDTypes.ProductDetailsActionTypes {
    return {
        type : PDTypes.PD_RESET_LOADING_STATUS
    };
}