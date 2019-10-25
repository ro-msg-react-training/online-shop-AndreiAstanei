import { IProduct } from '../../Models/Models';

import { LOAD_PRODUCTS_ASYNC , ProductListActionTypes } from './types';

export function loadProducts(data : IProduct[], isLoading : boolean, error : string) : ProductListActionTypes {
    return {
        type : LOAD_PRODUCTS_ASYNC,
        data : data,
        isLoading : isLoading,
        error : error
    };
}