<template>
  <breadcrumb-vue
    :totalPage="2"
    currentPage="Data Petugas"
    :childrenPage="petugas.nama_petugas"
  />
  <h1 class="m-7 font-semibold text-3xl">Detail Petugas</h1>
  <div class="contentBx m-7">
    <div class="flex justify-between">
      <h2 class="text-2xl font-semibold leading-tight">
        {{ petugas.nama_petugas }}
      </h2>
      <transition name="fading">
        <button
          class="h-5 w-5"
          @click.prevent="toggleEditable()"
          v-if="!isEditable"
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
        <div class="flex flex-col justify-between md:flex-row">
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Nama Petugas</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <input
                type="text"
                :class="
                  error.nama_petugas ? 'border-red-600' : 'border-gray-300'
                "
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200 disabled:dark:bg-gray-600"
                placeholder="Nama Petugas"
                :disabled="isEditable ? false : true"
                v-model="editedPetugas.nama_petugas"
              />
              <div class="absolute left-3 top-2 h-6 w-6">
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
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p
                class="text-red-600 text-xs font-semibold ml-2"
                v-if="error.nama_petugas"
              >
                {{ error.nama_petugas[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Username</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <input
                type="text"
                :class="error.username ? 'border-red-600' : 'border-gray-300'"
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200"
                placeholder="Username"
                :disabled="isEditable ? false : true"
                v-model="editedPetugas.username"
              />
              <div class="absolute left-3 top-2 h-6 w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p
                class="text-red-600 text-xs font-semibold ml-2"
                v-if="error.username"
              >
                {{ error.username[0] }}
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
    <table-vue
      :name="`Histori Penjualan ${petugas.nama_petugas}`"
      :column="column"
      :row="petugas.pembayaran"
    />
  </div>
</template>

<script>
import BreadcrumbVue from "../../../components/Breadcrumb.vue";
import Api from "@/Api";
import Swal from "sweetalert2";
import TableVue from "../../../components/Table.vue";
export default {
  components: {
    BreadcrumbVue,
    TableVue,
  },
  props: ["id"],
  data() {
    return {
      petugas: {},
      editedPetugas: {
        nama_petugas: "",
        username: "",
      },
      isEditable: false,
      error: {},
      column: [
        { name: "Nama Siswa", rowModel: "nama_siswa" },
        { name: "Jumlah Bayar", rowModel: "jumlah_bayar" },
        { name: "Kembalian", rowModel: "kembalian" },
        { name: "Tanggal Bayar", rowModel: "tgl_bayar" },
      ],
    };
  },
  methods: {
    getData() {
      Api.getData(`petugas/${this.id}`).then((data) => {
        this.petugas = data.data;
        this.editedPetugas.nama_petugas = data.data.nama_petugas;
        this.editedPetugas.username = data.data.username;
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
      Api.putData(`petugas/${this.id}`, this.editedPetugas)
        .then((data) => {
          Swal.fire({
            title: data.message,
            icon: "success",
          });
          this.$router.push({ name: "petugas" });
        })
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: "error",
          });
          this.error = error.data;
        });
    },
  },
  beforeMount() {
    this.getData();
  },
};
</script>

<style>
</style>