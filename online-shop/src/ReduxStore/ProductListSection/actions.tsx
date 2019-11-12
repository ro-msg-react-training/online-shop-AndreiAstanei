import { IProduct } from '../../Models/Models';
import { LOAD_PRODUCTS_ASYNC , ProductListActionTypes } from './types';
import * as PLTypes from './types';

export function loadProducts(data : IProduct[], isLoading : boolean, error : string) : ProductListActionTypes {
    return {
        type : LOAD_PRODUCTS_ASYNC,
        data : data,
        isLoading : isLoading,
        error : error
    };
}

export function activateLoadingWindow(loadingStatus : boolean) : PLTypes.ProductListActionTypes {
    return {
        type : PLTypes.PL_ACTIVATE_LOADING_WINDOW,
        isLoading : loadingStatus
    };
}