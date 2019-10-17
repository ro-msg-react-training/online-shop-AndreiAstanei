import { IProduct } from '../../Models/Models';
import { LOAD_PRODUCT_DETAILS, ProductDetailsActionTypes } from './types';

export function loadProductDetails(toBeReceivedData: IProduct, isLoading: boolean, isDeleteModalOpen: boolean, shouldRedirectToShoppingCart: boolean, error?: string) : ProductDetailsActionTypes {
    return {
        type : LOAD_PRODUCT_DETAILS,
        toBeReceivedData : toBeReceivedData,
        isLoading : isLoading,
        isDeleteModalOpen : isDeleteModalOpen,
        shouldRedirectToShoppingCart : shouldRedirectToShoppingCart,
        error : error
    };
}