import * as NPTypes from './types';

const initialState: NPTypes.NewProductState = {
    createProductServerResponse : 0,
    toBeCreatedProductData : {
        id: 0,
        name: "Unknown",
        category: "Laptops",
        image: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png",
        price: 0,
        description: "No description provided"
    },
    isLoading : false
};

export function newProductReducer(state: NPTypes.NewProductState = initialState, action: NPTypes.NewProductActionTypes): NPTypes.NewProductState {
    switch(action.type) {
        case NPTypes.CREATE_PRODUCT_ASYNC: {
            return {
                createProductServerResponse : action.createProductServerResponse,
                toBeCreatedProductData : state.toBeCreatedProductData,
                isLoading : false
            };
        }

        case NPTypes.UPDATE_TO_BE_CREATED_PRODUCT_DATA: {
            return {
                createProductServerResponse : state.createProductServerResponse,
                toBeCreatedProductData : action.toBeCreatedProductData,
                isLoading : state.isLoading
            };
        }

        case NPTypes.NP_RESET_LOADING_STATUS: {
            return {
                ...state,
                isLoading : true
            };
        }

        default:
            return state;
    }
}