import { ProductListState, LOAD_PRODUCTS, ProductListActionTypes } from './types';

const initialState: ProductListState = {
    data: [],
    isLoading: true,
    error: "No errors found"
};

export function productListReducer(state : ProductListState = initialState, action: ProductListActionTypes): ProductListState {

    switch (action.type) {
        case LOAD_PRODUCTS:
            return {
                data: action.data,
                isLoading : action.isLoading,
                error : action.error
            };

        default:
            return state;
    }
}