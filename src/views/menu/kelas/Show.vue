<template>
  <breadcrumb-vue
    :page="['Data Kelas', `${kelas.kelas} ${kelas.kompetensi_keahlian}`]"
  />
  <h1 class="m-7 font-semibold text-3xl">Detail Kelas</h1>
  <div class="contentBx m-7">
    <div class="flex justify-between">
      <h2 class="text-2xl font-semibold leading-tight">
        {{ `${kelas.kelas} ${kelas.kompetensi_keahlian}` }}
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
                :disabled="isEditable ? false : true"
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
                :disabled="isEditable ? false : true"
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
      v-if="kelas.siswa"
      :name="`Data Siswa ${kelas.kelas} ${kelas.kompetensi_keahlian}`"
      :column="column"
      :row="kelas.siswa"
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
      kelas: {},
      form: {
        kompetensi_keahlian: "",
        kelas: "",
      },
      isEditable: false,
      error: {},
      column: [
        { name: "Nama Siswa", rowModel: "nama" },
        { name: "NISN", rowModel: "nisn" },
        { name: "NIS", rowModel: "nis" },
        { name: "Alamat", rowModel: "alamat" },
      ],
    };
  },
  methods: {
    getData() {
      Api.getData(`kelas/${this.id}`).then((data) => {
        this.kelas = data.data;
        this.form.kompetensi_keahlian = data.data.kompetensi_keahlian;
        this.form.kelas = data.data.kelas;
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
      Api.putData(`kelas/${this.id}`, this.form)
        .then((data) => {
          Swal.fire({
            title: data.message,
            icon: "success",
          });
          this.$router.push({ name: "kelas" });
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