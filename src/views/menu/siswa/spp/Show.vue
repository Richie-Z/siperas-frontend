<template>
  <breadcrumb-vue
    :page="[
      'Data Siswa',
      `${spp.nama_siswa}`,
      `Buku Spp Tahun Ajaran ${spp.tahun_ajaran}`,
    ]"
    nested-router-link="detailSiswa"
  />
  <h1 class="m-7 font-semibold text-3xl">Detail Spp</h1>
  <div class="contentBx m-7">
    <div class="flex justify-between">
      <h2 class="text-2xl font-semibold leading-tight">
        {{ ` Buku Spp ${spp.nama_siswa} Tahun Ajaran ${spp.tahun_ajaran}` }}
      </h2>
      <transition name="fading">
        <button
          class="h-5 w-5"
          @click.prevent="toggleEditable()"
          v-if="!isEditable && spp.editable"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </transition>
    </div>
    <div class="divide-y divide-gray-200">
      <div
        class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div class="flex flex-col md:justify-between items-center md:flex-row">
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Tahun Ajaran</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <input
                type="text"
                :class="
                  error.tahun_ajaran ? 'border-red-600' : 'border-gray-300'
                "
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200"
                placeholder="Tahun Ajaran"
                v-model="form.tahun_ajaran"
                maxlength="9"
                onkeyup="this.value=this.value.replace(/[A-Za-z]/,'')"
                :disabled="isEditable ? false : true"
              />
              <div class="absolute left-3 top-2 h-6 w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p
                class="text-red-600 text-xs font-semibold ml-2"
                v-if="error.tahun_ajaran"
              >
                {{ error.tahun_ajaran[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Nominal</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <input
                type="text"
                :class="error.nominal ? 'border-red-600' : 'border-gray-300'"
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200"
                placeholder="Nominal"
                v-model="form.nominal"
                :disabled="isEditable ? false : true"
              />
              <div class="absolute left-3 top-2 h-6 w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p
                class="text-red-600 text-xs font-semibold ml-2"
                v-if="error.nominal"
              >
                {{ error.nominal[0] }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <transition name="fading">
        <div class="pt-4 flex justify-center space-x-4" v-if="isEditable">
          <button
            @click.prevent="toggleEditable"
            class="flex justify-center items-center w-auto text-white px-4 py-3 rounded-md focus:outline-none bg-red-500"
          >
            <svg
              class="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            Cancel
          </button>
          <button
            @click.prevent="edit()"
            class="bg-blue-500 flex justify-center items-center w-auto text-white px-4 py-3 rounded-md focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              class="h-6 w-6 mr-3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3"
              />
            </svg>
            Save
          </button>
        </div>
      </transition>
    </div>
  </div>
  <div class="contentBx m-7">
    <spp-table name="Histori Pembayaran" :nominal="spp.nominal" :row="row" />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import BreadcrumbVue from "@/components/Breadcrumb.vue";
import Api from "@/Api";
import Swal from "sweetalert2";
import SppTable from "@/components/SppTable.vue";
export default {
  components: {
    BreadcrumbVue,
    SppTable,
  },
  props: ["siswa_id", "spp_id"],
  data() {
    return {
      spp: {},
      form: {
        tahun_ajaran: "",
        nominal: "",
      },
      isEditable: false,
      error: {},
      row: {},
    };
  },
  watch: {
    "form.tahun_ajaran": {
      handler(val) {
        if (val.length == 4) this.form.tahun_ajaran = val + "/";
      },
      deep: true,
    },
  },
  methods: {
    getData() {
      Api.getData(`siswa/${this.siswa_id}/spp/${this.spp_id}`).then((data) => {
        this.spp = data.data;
        this.form.tahun_ajaran = data.data.tahun_ajaran;
        this.form.nominal = data.data.nominal;
        this.row = this.rowMaker(data.data.history_pembayaran);
      });
    },
    toggleEditable() {
      this.isEditable = !this.isEditable;
    },
    edit() {
      Swal.fire({
        title: "Loading",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      Api.putData(`siswa/${this.siswa_id}/spp/${this.spp_id}`, this.form)
        .then((data) => {
          Swal.fire({
            title: data.message,
            icon: "success",
          });
          this.$router.push({
            name: "detailSiswa",
            params: { id: this.siswa_id },
          });
        })
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: "error",
          });
          this.error = error.data;
        });
    },
    rowMaker(data) {
      const month = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const array = Object.keys(data).map((val) => {
        return {
          bulan: month[val - 1],
          jumlah: data[val],
        };
      });
      return array;
    },
  },
  beforeMount() {
    this.getData();
  },
};
</script>

<style>
</style>