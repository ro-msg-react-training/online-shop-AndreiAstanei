import React from 'react';
import { SalesViewComponentState } from "./SalesSmartView";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { SalesTabBuilder, getChartDataByType } from './ChartsHelper';
import { ErrorComponent } from '../../HelperComponents/ErrorComponent';

export const SalesDumpView: React.FC<SalesViewComponentState> = (props: SalesViewComponentState) => {
     if (!props.isLoading && props.error !== "No errors found") {
        return (
            <ErrorComponent />
        );
    } else {
        return (
            <div className="container box is-centered">
                <div className="tabs is-centered is-boxed is-medium">
                    <SalesTabBuilder {...props}/>
                </div>
                
                <HighchartsReact highcharts={Highcharts} title={"Sales Chart"} options={getChartDataByType(props, props.selectedChart)} />
            </div>
        );
    }
}