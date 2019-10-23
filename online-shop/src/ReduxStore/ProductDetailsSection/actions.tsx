import { IProduct } from '../../Models/Models';
import * as SCTypes from './types';

export function loadProductDetails(toBeReceivedData: IProduct, isLoading: boolean, isDeleteModalOpen: boolean, shouldRedirectToShoppingCart: boolean, error?: string) : SCTypes.ProductDetailsActionTypes {
    return {
        type : SCTypes.LOAD_PRODUCT_DETAILS,
        toBeReceivedData : toBeReceivedData,
        isLoading : isLoading,
        isDeleteModalOpen : isDeleteModalOpen,
        shouldRedirectToShoppingCart : shouldRedirectToShoppingCart,
        error : error
    };
}

export function deleteProductFromStore(productID : number) : SCTypes.ProductDetailsActionTypes {
    return {
       type : SCTypes.DELETE_PRODUCT_FROM_STORE,
       productID : productID 
    };
}

export function activateModalRedirectToProducts() : SCTypes.ProductDetailsActionTypes {
    return {
        type : SCTypes.ACTIVATE_MODAL_REDIRECT_TO_PRODUCTS
    };
}