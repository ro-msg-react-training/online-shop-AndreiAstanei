import * as NPTypes from './types';

export function createNewProduct(serverResponse : number): NPTypes.NewProductActionTypes {
    return {
        type: NPTypes.CREATE_PRODUCT,
        createProductServerResponse : serverResponse
    };
}