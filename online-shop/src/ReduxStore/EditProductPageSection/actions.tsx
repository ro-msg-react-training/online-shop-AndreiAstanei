import { IProduct } from '../../Models/Models';
import * as EPTypes from './types';

export function loadProductData(productDetails: IProduct): EPTypes.EditProductPageActionTypes {
    return {
        type: EPTypes.LOAD_PRODUCT_DETAILS_FOR_EDIT,
        product: productDetails
    };
}

export function editProduct(productDetails: IProduct, serverResponse : number): EPTypes.EditProductPageActionTypes {
    return {
        type: EPTypes.EDIT_PRODUCT,
        product: productDetails,
        submitChangesResponse: serverResponse
    };
}

export function initialProductDetailsLoad() : EPTypes.EditProductPageActionTypes {
    return {
        type : EPTypes.INITIAL_PRPODUCT_DETAILS_LOAD
    };
}