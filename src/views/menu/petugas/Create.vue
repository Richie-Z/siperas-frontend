<template>
  <breadcrumb-vue
    :totalPage="2"
    currentPage="Data Petugas"
    childrenPage="Tambah Petugas"
  />
  <h1 class="m-7 font-semibold text-3xl">Tambah Petugas</h1>
  <div class="contentBx m-7">
    <div class="divide-y divide-gray-200">
      <div
        class="pb-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div class="flex flex-col md:justify-between items-center md:flex-row">
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
                v-model="form.nama_petugas"
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
                v-model="form.username"
                autocomplete="new-password"
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
        <div class="flex flex-col md:justify-between items-center md:flex-row">
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Password</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <input
                type="password"
                :class="error.password ? 'border-red-600' : 'border-gray-300'"
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200 disabled:dark:bg-gray-600"
                placeholder="Password"
                v-model="form.password"
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
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <p
                class="text-red-600 text-xs font-semibold ml-2"
                v-if="error.password"
              >
                {{ error.password[0] }}
              </p>
            </div>
          </div>
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Password Confirmation</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <input
                type="password"
                :class="error.confirm ? 'border-red-600' : 'border-gray-300'"
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200"
                placeholder="Password Confirmation"
                v-model="form.confirm"
              />
              <div class="absolute left-3 top-2 h-6 w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <p
                class="text-red-600 text-xs font-semibold ml-2"
                v-if="error.confirm"
              >
                {{ error.confirm }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-4 flex justify-center space-x-4">
        <button
          @click="this.$router.push({ name: 'petugas' })"
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
        nama_petugas: "",
        username: "",
        password: "",
        confirm: "",
      },
    };
  },
  watch: {
    "form.confirm": {
      handler: function () {
        this.isDifferent();
      },
      deep: true,
    },
    "form.password": {
      handler: function () {
        this.isDifferent();
      },
      deep: true,
    },
  },
  methods: {
    isDifferent() {
      if (this.form.password != this.form.confirm)
        this.error.confirm = "Pasword tidak sesuai";
      else delete this.error.confirm;
    },
    store() {
      Swal.fire({
        title: "Loading",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      Api.postData("petugas", this.form)
        .then((data) => {
          Swal.fire(data.message, "", "success");
          this.$router.push({ name: "petugas" });
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