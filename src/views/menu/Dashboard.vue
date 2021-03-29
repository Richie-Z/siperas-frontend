<template>
  <breadcrumb-vue current-page="Dashboard"></breadcrumb-vue>
  <h1 class="m-7 font-semibold text-3xl">Dashboard</h1>
  <div class="flex-none md:flex justify-between m-7">
    <div
      class="pl-4 pr-20 w-full pt-3 pb-10 text-left m-2 bg-white dark:bg-gray-200 rounded-md shadow-lg text-black"
      v-for="(n, i) in rekap"
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
    <div class="contentBx w-2/3">
      <div class="flex justify-between">
        <h3 class="font-bold">Pembayaran minggu ini</h3>
        <button @click="refresh('week')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-5 w-5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      <v-chart
        class="w-auto h-80"
        :option="week"
        autoresize
        :loading="weekLoading"
        :loadingOptions="chartLoadingOptions"
      />
    </div>
    <div class="contentBx ml-7 w-1/3">
      <div class="flex justify-between">
        <h3 class="font-bold mb-4">Penjualan Petugas</h3>
        <button @click="refresh('petugas')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-5 w-5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      <v-chart
        class="w-auto -mb-2"
        :option="petugasSale"
        autoresize
        :loading="petugasLoading"
        :loadingOptions="chartLoadingOptions"
      />
    </div>
  </div>
</template>

<script>
import BreadcrumbVue from "../../components/Breadcrumb.vue";
import VChart from "vue-echarts";
import Api from "@/Api";
import Echarts from "@/modules/echarts";
export default {
  name: "dashboard",
  components: {
    VChart,
    BreadcrumbVue,
  },
  data() {
    return {
      rekap: {
        today: 0,
        week: 0,
        month: 0,
        petugas: 0,
      },
      data: {
        week: 0,
        days: [
          {
            day: 0,
            value: 0,
          },
        ],
      },
      week: null,
      weekLoading: false,
      petugasSale: null,
      petugasLoading: false,
      chartLoadingOptions: {
        text: "Loading…",
        color: "#4ea397",
        maskColor: "rgba(255, 255, 255, 0.4)",
      },
      seconds: 0,
    };
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

    getWeek(data) {
      return Echarts.week(data);
    },
    getPetugas(data) {
      return Echarts.petugasSale(data);
    },
    refresh(identity) {
      this.seconds = 3;
      identity == "week"
        ? (this.weekLoading = true)
        : (this.petugasLoading = true);
      const timer = setInterval(() => {
        this.seconds--;
        if (this.seconds === 0) {
          clearTimeout(timer);
          if (identity == "week") {
            this.weekLoading = false;
            this.week = this.getWeek();
          } else {
            this.petugasLoading = false;
            this.petugasSale = this.getPetugas();
          }
        }
      }, 1000);
    },
  },
  mounted() {
    Api.getData("rekap/per_minggu").then((data) => {
      this.$store.dispatch("perWeek", data.data);
      this.week = this.getWeek(data.data);
    });
    Api.getData("rekap/per_petugas").then((data) => {
      this.$store.dispatch("perPetugas", data.data);
      this.petugasSale = this.getPetugas(data.data);
    });
    if (!this.$store.getters.rekap) {
      Api.getData("rekap").then((data) => {
        this.rekap = data.data;
        this.$store.dispatch("rekap", data.data);
      });
    } else {
      this.rekap = this.$store.getters.rekap;
    }
  },
};
</script>
