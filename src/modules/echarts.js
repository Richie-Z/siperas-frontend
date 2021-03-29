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
import store from "@/vuex"
import Api from "@/Api"
let week, petugas;
// const dataSet = async () => {
//         petugas = store.getters.perPetugas
//         week = getVal(store.getters.perWeek)

//     if (!store.getters.perWeek) {
//         Api.getData("rekap/per_minggu").then((data) => {
//             store.dispatch("perWeek", data.data);
//             week = getVal(data.data);
//         });
//     } else {
//         week = getVal(store.getters.perWeek)
//     }
//     if (!store.getters.perPetugas) {
//         Api.getData("rekap/per_petugas").then((data) => {
//             store.dispatch("perPetugas", data.data);
//             petugas = data.data;
//         });
//     } else {
//         petugas = store.getters.perPetugas
//     }
// }

function getVal(data) {
    let onlyVal = [];
    for (let i in data.days) {
        onlyVal.push(data.days[i].value);
    }
    return onlyVal;
}
// dataSet();
export default {
    week: (data) => {
        const option = {
            xAxis: {
                type: "category",
                data: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"]
            },
            yAxis: {
                type: "value",
            },
            series: [{
                data: getVal(data),
                type: "line",
                smooth: true,
                areaStyle: {},
            }, ],
        }
        return option
    },
    petugasSale: (data) => {
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
                data: data,
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