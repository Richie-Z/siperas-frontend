<template>
  <div class="overflow-hidden w-auto lg:container">
    <h1 class="mx-15 lg:mx-20 my-5 text-4xl font-bold">
      SIPERAS
      <p class="text-lg font-normal">{{ row.tgl_bayar }}</p>
    </h1>
    <table class="mx-15 lg:mx-20 my-5 w-full p-4 text-lg">
      <tbody>
        <tr class="m-10">
          <td>Nama Siswa</td>
          <td>:</td>
          <td>
            <input type="text" readonly v-model="row.nama_siswa" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mx-15 lg:mx-20 my-5 w-full">
      <table class="border-collapse w-full">
        <thead>
          <tr class="text-left">
            <th
              class="p-3 font-bold uppercase text-gray-600 border-b-2 border-black"
            >
              Deskripsi
            </th>
            <th
              class="p-3 font-bold uppercase text-gray-600 border-b-2 border-black"
            >
              Jumlah Bayar
            </th>
            <th
              class="p-3 font-bold uppercase text-gray-600 border-b-2 border-black"
            >
              Kembalian
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0 text-left"
          >
            <td class="w-auto p-3 text-gray-800">Pembayaran SPP</td>
            <td class="w-auto p-3 text-gray-800">
              {{ formatRupiah(row.jumlah_bayar) }}
            </td>
            <td class="w-auto p-3 text-gray-800">
              {{ 0 >= row.kembalian ? "-" : formatRupiah(row.kembalian) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between mt-5">
      <h1></h1>
      <div>{{ row.nama_petugas }}</div>
    </div>
  </div>
</template>

<script>
import Api from "../../../Api";
export default {
  props: ["id"],
  data() {
    return {
      row: {},
    };
  },
  beforeMount() {
    Api.tokenChecker();
    this.getData();
  },
  methods: {
    getData() {
      Api.getData(`pembayaran/${this.id}`)
        .then(async (data) => {
          this.row = await data.data;
        })
        .then(() => window.print());
    },
    formatRupiah: (money) => {
      const moneyIdr = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(money);
      return moneyIdr;
    },

    print() {
      window.print();
    },
  },
};
</script>

<style>
</style>