<template>
  <breadcrumb-vue page="Pembayaran" />
  <h1 class="m-7 font-semibold text-3xl">Histori Pembayaran</h1>
  <div class="contentBx m-7">
    <table-vue
      :column="column"
      :row="row"
      name="Pembayaran"
      :isPaginated="true"
      :paginationInfo="paginationInfo"
      :isAddable="true"
    >
      <button
        v-for="({ active, label, url }, i) in paginationInfo.links"
        :key="i"
        class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l disabled:bg-gray-400"
        :disabled="active || url == null"
        @click="goTo(url)"
      >
        {{ typeof label == "string" ? label.split(".")[1] : label }}
      </button>
    </table-vue>
  </div>
</template>

<script>
import BreadcrumbVue from "../../../components/Breadcrumb.vue";
import Api from "../../../Api";
import TableVue from "../../../components/Table.vue";
export default {
  components: {
    BreadcrumbVue,
    TableVue,
  },
  data() {
    return {
      column: [
        { name: "Nama Siswa", rowModel: "nama_siswa" },
        { name: "Jumlah Bayar", rowModel: "jumlah_bayar" },
        { name: "Kembalian", rowModel: "kembalian" },
        { name: "Tanggal Bayar", rowModel: "tgl_bayar" },
      ],
      row: [],
      paginationInfo: {},
    };
  },
  methods: {
    getData() {
      Api.getData("pembayaran/history").then((data) => {
        this.row = data.data.data;
        this.paginationInfo = data.data;
      });
    },
    goTo(url) {
      Api.getData(url, true).then((data) => {
        this.row = data.data.data;
        this.paginationInfo = data.data;
        console.log(data.data);
      });
    },
  },
  beforeMount() {
    Api.tokenChecker();

    this.getData();
  },
};
</script>

<style>
</style>