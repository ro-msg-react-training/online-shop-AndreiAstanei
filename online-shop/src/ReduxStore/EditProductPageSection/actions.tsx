import { IProduct } from '../../Models/Models';
import * as EPTypes from './types';

export function loadProductData(productDetails: IProduct, serverResponse : number): EPTypes.EditProductPageActionTypes {
    return {
        type: EPTypes.LOAD_PRODUCT_DETAILS_FOR_EDIT_ASYNC,
        product: productDetails,
        submitChangesResponse: serverResponse
    };
}

export function editProduct(productDetails: IProduct, serverResponse : number): EPTypes.EditProductPageActionTypes {
    return {
        type: EPTypes.EDIT_PRODUCT_ASYNC,
        product: productDetails,
        submitChangesResponse: serverResponse
    };
}

export function initialProductDetailsLoad() : EPTypes.EditProductPageActionTypes {
    return {
        type : EPTypes.INITIAL_PRPODUCT_DETAILS_LOAD
    };
}

export function updateTemporaryProduct(newTempProdValues : IProduct) : EPTypes.EPUpdateTemporaryProductAction {
    return {
        type : EPTypes.UPDATE_TEMPORARY_PRODUCT,
        newTemporaryProductValues : newTempProdValues
    };
}

export function EPResetLoadingStatus() : EPTypes.EPResetLoadingStatusAction {
    return {
        type : EPTypes.EP_RESET_LOADING_STATUS
    };
}