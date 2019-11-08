//Describing the State for the Product List part
import { SalesItem } from '../../Models/Models';

export interface SalesViewState {
    salesData: SalesItem[];
    isLoading: boolean;
    error: string;
    selectedChart : string;
}

export const LOAD_SALES = "LOAD_SALES";
export const LOAD_SALES_ASYNC = "LOAD_SALES_ASYNC";
export const CHANGE_SELECTION = "CHANGE_SELECTION";
export const SV_RESET_LOADING_STATUS = "SV_RESET_LOADING_STATUS";

interface LoadSalesAction {
    type : typeof LOAD_SALES_ASYNC;
    salesData : SalesItem[];
    isLoading : boolean;
    error : string;
}

interface SVChangeSelectionAction {
    type : typeof CHANGE_SELECTION;
    selectedChart : string;
}

interface SVResetLoadingStatus {
    type : typeof SV_RESET_LOADING_STATUS;
}

export type SalesViewActionTypes = LoadSalesAction | SVChangeSelectionAction | SVResetLoadingStatus;
