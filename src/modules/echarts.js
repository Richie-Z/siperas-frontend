import {
    use
} from "echarts/core";
import {
    CanvasRenderer
} from "echarts/renderers";
import {
    PieChart,
    LineChart,
} from "echarts/charts";
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
} from "echarts/components";
use([
    CanvasRenderer,
    PieChart,
    LineChart,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

export default {
    week: () => {
        const option = {
            xAxis: {
                type: "category",
                data: ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"],
            },
            yAxis: {
                type: "value",
            },
            series: [{
                data: [900000, 0, 100000, 400000, 1290, 1330, 2000],
                type: "line",
                smooth: true,
                areaStyle: {},
            }, ],
        }
        return option
    },
    petugasSale: () => {
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                type: 'scroll',
            },
            series: [{
                name: 'Pembayaran',
                type: 'pie',
                radius: '50%',
                data: [{
                        value: 1048,
                        name: 'Immanuel Richie'
                    },
                    {
                        value: 580,
                        name: 'Gintoki'
                    },
                    {
                        value: 484,
                        name: 'Kagura'
                    },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        return option
    }
}