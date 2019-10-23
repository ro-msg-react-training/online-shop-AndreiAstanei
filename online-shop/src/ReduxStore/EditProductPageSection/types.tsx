import { IProduct } from "../../Models/Models";

export interface EditProductPageState {
    productInEditStage : IProduct;
    isLoading : boolean;
    submitChangesResponse : number;
}

export const LOAD_PRODUCT_DETAILS_FOR_EDIT = "LOAD_PRODUCT_DETAILS_FOR_EDIT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const CHANGE_CAN_APPLY_CHANGES = "CHANGE_CAN_APPLY_CHANGES";
export const INITIAL_PRPODUCT_DETAILS_LOAD = "INITIAL_PRPODUCT_DETAILS_LOAD";

export interface EPLoadProductDetailsAction {
    type : typeof LOAD_PRODUCT_DETAILS_FOR_EDIT;
    product : IProduct;
}

export interface EPInitialLoadAction {
    type : typeof INITIAL_PRPODUCT_DETAILS_LOAD;
}

export interface EPEditProductAction {
    type: typeof EDIT_PRODUCT;
    product : IProduct;
    submitChangesResponse : number;
}

export type EditProductPageActionTypes = EPLoadProductDetailsAction | EPEditProductAction  | EPInitialLoadAction;