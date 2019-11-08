import { SalesItem } from '../../Models/Models';

import * as SVTypes from './types';

export function loadSales(salesData : SalesItem[], isLoading : boolean, error : string) : SVTypes.SalesViewActionTypes {
    return {
        type : SVTypes.LOAD_SALES_ASYNC,
        salesData : salesData,
        isLoading : isLoading,
        error : error
    };
}

export function changeSelection(selectedChart : string) : SVTypes.SalesViewActionTypes {
    return {
        type : SVTypes.CHANGE_SELECTION,
        selectedChart : selectedChart
    };
}

export function svResetLoadingStatus() : SVTypes.SalesViewActionTypes {
    return {
        type : SVTypes.SV_RESET_LOADING_STATUS
    };
}