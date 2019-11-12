import { SalesViewComponentState } from "./SalesSmartView";
import React from "react";

export const PIE_CHART = "Pie chart";
export const BAR_CHART = "Bar chart";

interface ChartOptionsTypes {
    chartType: string;
    initializer: Highcharts.Options;
}

interface IconArrayType {
    chartType: string;
    iconType: string;
}

let chartInitializersArray: ChartOptionsTypes[];

//Generating the data for each chart
function initializeChartArray(props : SalesViewComponentState) {
    //Initializing chart components
    let pieChartType: ChartOptionsTypes = {
        chartType: PIE_CHART,
        initializer: {
            chart: {
                type: "pie"
            },
            title: {
                text: 'Online shop sales'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}: {point.percentage:.1f} %</b>'
                    }
                }
            },
            series: [{
                type: "pie",
                name: "Sales",
                data: [...props.salesData].map(
                    (sales, key) => (
                        {
                            name: sales.category,
                            y: sales.sales
                        }
                    )
                )
            }]
        }
    }

    let barChartType: ChartOptionsTypes = {
        chartType: BAR_CHART,
        initializer: {
            chart: {
                type: "bar"
            },
            title: {
                text: 'Online shop sales'
            },
            xAxis: {
                categories: [...props.salesData].map((sales) => sales.category)
            },
            yAxis: {
                title: {
                    text: ''
                }
            },            
            series: [
                {
                    type: "bar",
                    name: "Sales by category",
                    colorByPoint: true,
                    data: [...props.salesData].map((sale) => sale.sales)
                }
            ]
        }
    }

    //Creating array and adding the chartTypes
    chartInitializersArray = [];
    chartInitializersArray.push(pieChartType);
    chartInitializersArray.push(barChartType);
}

//Fetching the appropriate chart data by selected chart type
export function getChartDataByType(props: SalesViewComponentState, chartType: string): Highcharts.Options {
    //Default return value
    let selectedChartType: Highcharts.Options = {};

    //Initializing chart data
    initializeChartArray(props);

    //Looking for the right type of chart and returning it
    chartInitializersArray.forEach((currentChart) => {
        if (currentChart.chartType === chartType) {
            selectedChartType = currentChart.initializer;
        }
    });

    return selectedChartType;
}

//Check for currently active tab/chart
function isTabActive(chartType: string, currentActiveChartType: string): boolean {
    if (chartType === currentActiveChartType) {
        return true;
    }

    return false;
}

//Get the appropriate icon for chart type
function getTabIcon(chartType: string): string {
    let iconType: string = "fa-spinner";
    let iconTypesArray: IconArrayType[] = [];
    iconTypesArray.push({ chartType: BAR_CHART, iconType: "fa-chart-bar" });
    iconTypesArray.push({ chartType: PIE_CHART, iconType: "fa-chart-pie" });

    iconTypesArray.forEach((currentIcon) => {
        if (currentIcon.chartType === chartType) {
            iconType = currentIcon.iconType;
        }
    })

    return iconType;
}

//Generating the tab menu for chart type selection
export const SalesTabBuilder: React.FC<SalesViewComponentState> = (props: SalesViewComponentState) => {
    if(!chartInitializersArray) {
        initializeChartArray(props);
    }

    let generatedTabsOptions = chartInitializersArray.map(
        (currentChart) =>
            <li className={isTabActive(currentChart.chartType, props.selectedChart) ? "is-active" : ""} key={currentChart.chartType + " key"} onClick={() => props.changeSelection(props, currentChart.chartType)}>
                <a>
                    <span className="icon is-small"><i className={"fas " + getTabIcon(currentChart.chartType)} aria-hidden="true"></i></span>
                    <span>{currentChart.chartType}</span>
                </a>
            </li>

    );

    return (
        <ul>
            {generatedTabsOptions}
        </ul>
    );
}