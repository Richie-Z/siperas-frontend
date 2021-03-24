import {
    use
} from "echarts/core";
import {
    CanvasRenderer
} from "echarts/renderers";
import {
    PieChart,
    LineChart,
    BarChart
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
    }
}