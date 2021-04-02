<template>
  <breadcrumb-vue
    :totalPage="2"
    currentPage="Data Kelas"
    childrenPage="Tambah Kelas"
  />
  <h1 class="m-7 font-semibold text-3xl">Tambah Kelas</h1>
  <div class="contentBx m-7">
    <div class="flex justify-between">
      <h2 class="text-2xl font-semibold leading-tight"></h2>
      <label class="inline-flex">
        <input
          type="checkbox"
          class="h-5 w-5"
          name="pilihan"
          v-model="isAutoFill"
        />
        <span class="ml-2 text-gray-700 text-sm"> Auto Fill </span>
      </label>
    </div>
    <div class="divide-y divide-gray-200">
      <div
        class="pb-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div class="flex flex-col md:justify-between items-center md:flex-row">
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Kompetensi Keahlian</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <input
                type="text"
                :class="
                  error.kompetensi_keahlian
                    ? 'border-red-600'
                    : 'border-gray-300'
                "
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200"
                placeholder="Kompetensi Keahlian"
                v-model="form.kompetensi_keahlian"
                autocomplete="new-password"
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
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              </div>
              <p
                class="text-red-600 text-xs font-semibold ml-2"
                v-if="error.kompetensi_keahlian"
              >
                {{ error.kompetensi_keahlian[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Kelas</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <select
                :class="error.kelas ? 'border-red-600' : 'border-gray-300'"
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200 disabled:dark:bg-gray-600"
                v-model="form.kelas"
                :disabled="isAutoFill"
              >
                <option value="" selected disabled>Pilih Kelas</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
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
        </div>
      </div>
      <div class="pt-4 flex justify-center space-x-4">
        <button
          @click="this.$router.push({ name: 'kelas' })"
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
          @click.prevent="store()"
          :disabled="error.confirm ? true : false"
          class="bg-blue-500 disabled:bg-blue-900 flex justify-center items-center w-auto text-white px-4 py-3 rounded-md focus:outline-none"
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
    </div>
  </div>
</template>

<script>
import BreadcrumbVue from "../../../components/Breadcrumb.vue";
import Api from "@/Api";
import Swal from "sweetalert2";
export default {
  components: {
    BreadcrumbVue,
  },
  data() {
    return {
      error: {},
      form: {
        kompetensi_keahlian: "",
        kelas: "",
      },
      isAutoFill: false,
    };
  },
  methods: {
    store() {
      Swal.fire({
        title: "Loading",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      Api.postData(`kelas${this.isAutoFill ? "?auto=true" : ""}`, this.form)
        .then((data) => {
          Swal.fire(data.message, "", "success");
          this.$router.push({ name: "kelas" });
        })
        .catch((error) => {
          Swal.fire(error.message, "", "error");
          this.error = error.data;
        });
    },
  },
};
</script>

<style>
</style>