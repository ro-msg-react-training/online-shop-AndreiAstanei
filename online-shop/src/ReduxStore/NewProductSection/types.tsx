export interface NewProductState {
    createProductServerResponse : number;
}

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const CREATE_PRODUCT_ASYNC = "CREATE_PRODUCT_ASYNC";

export interface NPCreateNewProductAction {
    type : typeof CREATE_PRODUCT_ASYNC;
    createProductServerResponse : number;
}

export type NewProductActionTypes = NPCreateNewProductAction;