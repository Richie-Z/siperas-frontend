<template>
  <breadcrumb-vue page="Data Siswa" />
  <h1 class="m-7 font-semibold text-3xl">Data Siswa</h1>
  <div class="contentBx m-7">
    <table-vue
      name="Siswa"
      :column="column"
      :row="row"
      :isAddable="true"
      :isEditable="true"
      deleteMessageModel="nama"
    />
  </div>
</template>

<script>
import BreadcrumbVue from "../../../components/Breadcrumb.vue";
import TableVue from "../../../components/Table.vue";
import Api from "@/Api";
export default {
  components: {
    BreadcrumbVue,
    TableVue,
  },
  props: ["query"],
  data() {
    return {
      column: [
        { name: "Nama Siswa", rowModel: "nama" },
        { name: "NISN", rowModel: "nisn" },
        { name: "NIS", rowModel: "nis" },
        { name: "Alamat", rowModel: "alamat" },
        { name: "Kelas", rowModel: "kelas_jurusan" },
      ],
      row: {},
    };
  },
  methods: {
    getSiswa() {
      Api.getData("siswa").then((data) => (this.row = data.data));
    },
  },
  watch: {
    query() {
      this.getSiswa();
      this.$router.push({ name: "siswa" });
    },
  },
  mounted() {
    Api.tokenChecker();
    this.getSiswa();
  },
};
</script>

<style>
</style>