import * as EPTypes from './types';
import { IProduct } from '../../Models/Models';

const initialState: EPTypes.EditProductPageState = {
    productInEditStage : {
        id: 0,
        name: "Unknown",
        category: "Not specified",
        image: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png",
        price: 0,
        description: "No description provided"
    },
    isLoading : true,
    submitChangesResponse : 0,
    temporaryValuesForProduct : {
        id: 0,
        name: "Unknown",
        category: "Not specified",
        image: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1150x647.png",
        price: 0,
        description: "No description provided"
    }
};

export function editProductPageReducer(state: EPTypes.EditProductPageState = initialState, action: EPTypes.EditProductPageActionTypes): EPTypes.EditProductPageState {
    switch(action.type) {
        case EPTypes.LOAD_PRODUCT_DETAILS_FOR_EDIT_ASYNC: {
            return {
                productInEditStage : {...action.product},
                isLoading : false,
                submitChangesResponse : action.submitChangesResponse,
                temporaryValuesForProduct : state.temporaryValuesForProduct
            };
        }

        case EPTypes.EDIT_PRODUCT_ASYNC: {
            return {
                productInEditStage : action.product,
                isLoading : false,
                submitChangesResponse : action.submitChangesResponse,
                temporaryValuesForProduct : state.temporaryValuesForProduct
            };
        }

        case EPTypes.INITIAL_PRPODUCT_DETAILS_LOAD: {
            return {
                productInEditStage : state.productInEditStage,
                isLoading : true,
                submitChangesResponse : 0,
                temporaryValuesForProduct : state.temporaryValuesForProduct
            };
        }

        case EPTypes.UPDATE_TEMPORARY_PRODUCT: {
            let values : IProduct =  action ? action.newTemporaryProductValues : state.temporaryValuesForProduct;

            return {
                ...state,
                temporaryValuesForProduct: values
            };
        }

        case EPTypes.EP_RESET_LOADING_STATUS: {
            return {
                ...state,
                isLoading : true
            }
        }

        default:
            return state;
    }
}