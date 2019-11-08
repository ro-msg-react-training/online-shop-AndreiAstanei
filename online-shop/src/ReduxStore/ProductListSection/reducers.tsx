import { ProductListState, LOAD_PRODUCTS_ASYNC, ProductListActionTypes } from './types';
import * as PLTypes from './types';

const initialState: ProductListState = {
    data: [],
    isLoading: true,
    error: "No errors found"
};

export function productListReducer(state : ProductListState = initialState, action: ProductListActionTypes): ProductListState {    
    switch (action.type) {
        case LOAD_PRODUCTS_ASYNC:
            return {
                data: action.data,
                isLoading : action.isLoading,
                error : action.error
            };

        case PLTypes.PL_ACTIVATE_LOADING_WINDOW:
            return {
                ...state,
                isLoading : action.isLoading
            };

        default:
            return state;
    }
}