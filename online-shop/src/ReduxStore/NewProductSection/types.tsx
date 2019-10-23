export interface NewProductState {
    createProductServerResponse : number;
}

export const CREATE_PRODUCT = "CREATE_PRODUCT";

export interface NPCreateNewProductAction {
    type : typeof CREATE_PRODUCT;
    createProductServerResponse : number;
}

export type NewProductActionTypes = NPCreateNewProductAction;