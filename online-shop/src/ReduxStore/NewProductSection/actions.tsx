import * as NPTypes from './types';
import { IProduct } from '../../Models/Models';

export function createNewProduct(serverResponse : number): NPTypes.NewProductActionTypes {
    return {
        type: NPTypes.CREATE_PRODUCT_ASYNC,
        createProductServerResponse : serverResponse
    };
}

export function updateToBeCreatedProductData(newProductValues : IProduct) : NPTypes.NewProductActionTypes {
    return {
        type : NPTypes.UPDATE_TO_BE_CREATED_PRODUCT_DATA,
        toBeCreatedProductData : newProductValues
    };
}

export function NPResetLoadingStatus() : NPTypes.NewProductActionTypes {
    return {
        type : NPTypes.NP_RESET_LOADING_STATUS
    };
}