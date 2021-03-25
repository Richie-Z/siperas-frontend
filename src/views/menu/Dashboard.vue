<template>
  <breadcrumb-vue current-page="Dashboard"></breadcrumb-vue>
  <h1 class="m-7 font-semibold text-3xl">Dashboard</h1>
  <div class="flex-none md:flex justify-between m-7">
    <div
      class="pl-4 pr-20 w-full pt-3 pb-10 text-left m-2 bg-white dark:bg-gray-200 rounded-md shadow-lg text-black"
      v-for="(n, i) in stat"
      :key="i"
    >
      <h5 class="leading-tight tracking-tight font-semibold">
        {{
          i === "today"
            ? "Pembayaran hari ini"
            : i === "week"
            ? "Pembayaran minggu ini"
            : i === "month"
            ? "Pembayaran bulan ini"
            : "Jumlah Petugas"
        }}
      </h5>
      <div class="mt-4 pl-2 font-bold" v-if="i === 'petugas'">
        {{ n }} Petugas
      </div>
      <div class="mt-4 pl-2 font-bold" v-else>
        <span class="text-xl">Rp.</span> {{ formatRupiah(n) }}
      </div>
    </div>
  </div>
  <div class="flex-none md:flex -mt-2 m-7">
    <div class="contentBx w-2/3 relative">
      <h3 class="font-bold">Pembayaran minggu ini</h3>
      <v-chart class="w-full mx-2" :option="week" style="height: 350px" />
    </div>
    <div class="contentBx ml-7 w-1/3 relative">
      <h3 class="font-bold mb-4">Penjualan Petugas</h3>
      <v-chart class="w-full -mb-2" :option="petugasSale" />
    </div>
  </div>
</template>

<script>
import BreadcrumbVue from "../../components/Breadcrumb.vue";
import { ref, defineComponent } from "vue";
import VChart from "vue-echarts";
import Echarts from "@/modules/echarts";
export default defineComponent({
  name: "dashboard",
  components: {
    VChart,
    BreadcrumbVue,
  },
  data() {
    return {
      stat: {
        today: "30000000",
        week: "4000000",
        month: "7000000",
        petugas: 3,
      },
    };
  },
  setup: () => {
    const week = ref(Echarts.week());
    const petugasSale = ref(Echarts.petugasSale());
    return { week, petugasSale };
  },
  methods: {
    formatRupiah: (money) => {
      const moneyIdr = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(money);
      return moneyIdr.split("Rp")[1];
    },
  },
});
</script>
