import { AppState } from '../../ReduxStore';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SalesDumpView } from './SalesDumpView';
import { compose, withHandlers, lifecycle, setDisplayName } from 'recompose';
import { SalesItem } from '../../Models/Models';
import { changeSelection, svResetLoadingStatus } from '../../ReduxStore/SalesViewSection/actions';
import { LoadingWindowHoc } from '../../HelperComponents/HocComponents/LoadingWindowHoc';

export interface SalesViewComponentState {
    match: any;
    salesData: SalesItem[];
    isLoading: boolean;
    error: string;
    callLoadSales: () => void;
    dispatch: Dispatch;
    selectedChart : string;
    changeSelection: (props : SalesViewComponentState, selectedChart : string) => void;
    resetLoadingStatus: (props : SalesViewComponentState) => void;
}

interface AdditionalSalesViewState {
    match: any;
}

const mapStateToProps = (state: AppState, additionalState: AdditionalSalesViewState) => ({
    salesData: state.salesReducer.salesData,
    isLoading: state.salesReducer.isLoading,
    error: state.salesReducer.error,
    match: additionalState.match,
    selectedChart : state.salesReducer.selectedChart
});

const myHandlers = withHandlers({
    callLoadSales: (props: SalesViewComponentState) => (event: any) => {
        props.dispatch({ type: "LOAD_SALES" });
    },

    changeSelection : (props : SalesViewComponentState) => (event : any, selectedChart : string) => {
        props.dispatch(changeSelection(selectedChart))
    },

    resetLoadingStatus : (props : SalesViewComponentState) => (event : any) => {
        props.dispatch(svResetLoadingStatus())
    }
})

const onComponentDidMount = lifecycle<SalesViewComponentState, {}, {}>({
    componentDidMount() {
        //Reset loading status
        if(!this.props.isLoading) {
            this.props.resetLoadingStatus(this.props);
        }

        this.props.callLoadSales();
    }
})

const onComponentDidUpdate = lifecycle<SalesViewComponentState, {}, {}> ({
    componentDidUpdate() {
        this.props.changeSelection(this.props, this.props.selectedChart);
    }
})

const SalesViewInitializer = compose<SalesViewComponentState, AdditionalSalesViewState>(
    setDisplayName('SalesView'),
    connect(mapStateToProps),
    myHandlers,
    onComponentDidMount,
    onComponentDidUpdate,
    LoadingWindowHoc
)(SalesDumpView);

export default SalesViewInitializer;
