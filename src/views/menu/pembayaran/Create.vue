<template>
  <breadcrumb-vue :page="['Pembayaran', 'Buat Pembayaran']" />
  <h1 class="m-7 font-semibold text-3xl">Buat Pembayaran</h1>
  <div class="contentBx m-7">
    <h2 class="text-2xl font-semibold leading-tight my-2">
      Silahkan Pilih Siswa
    </h2>
    <div class="divide-y divide-gray-200">
      <div
        class="pb-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div class="flex flex-col md:justify-between items-center md:flex-row">
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Pilih Kelas</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <select
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200 disabled:dark:bg-gray-600"
                v-model="option.kelas"
                :disabled="isConfirmed"
              >
                <option value="" selected disabled>Pilih Kelas</option>
                <option
                  v-for="({ kelas, kompetensi_keahlian, id }, i) in kelas"
                  :key="i"
                  :value="id"
                >
                  {{ kelas }} {{ kompetensi_keahlian }}
                </option>
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
          <transition name="fading">
            <div class="flex flex-col w-1/2 mx-2" v-if="option.kelas">
              <label class="leading-loose">Pilih Siswa</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <select
                  class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200 disabled:dark:bg-gray-600"
                  v-model="option.siswa"
                  :disabled="isConfirmed"
                >
                  <option value="" selected disabled>Pilih Siswa</option>
                  <option
                    v-for="({ nama, id }, i) in siswa"
                    :key="i"
                    :value="id"
                  >
                    {{ nama }}
                  </option>
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
          </transition>
          <transition name="fading">
            <div class="relative w-1/2 mx-2" v-if="option.siswa && option.spp">
              <label class="leading-loose">Pilih Buku Spp</label>
              <div class="relative focus-within:text-gray-600 text-gray-400">
                <select
                  class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200 disabled:dark:bg-gray-600"
                  v-model="option.spp"
                  :disabled="isConfirmed"
                >
                  <option value="" selected disabled>Pilih Buku Spp</option>
                  <option
                    v-for="({ tahun_ajaran, id, is_lunas }, i) in spp"
                    :key="i"
                    :value="id"
                    :disabled="is_lunas"
                    class="disabled:bg-gray-100"
                  >
                    <span v-if="!is_lunas">
                      {{ tahun_ajaran }}
                    </span>
                    <span v-else> Spp {{ tahun_ajaran }} sudah lunas </span>
                  </option>
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
          </transition>
        </div>
        <transition name="fading">
          <div
            class="pt-4 flex justify-center space-x-4"
            v-if="typeof option.spp == 'number'"
          >
            <button
              v-if="isConfirmed"
              @click.prevent="isConfirmed = !isConfirmed"
              class="flex justify-center items-center w-auto text-white px-4 py-3 rounded-md focus:outline-none bg-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
              Edit
            </button>
            <button
              v-if="!isConfirmed"
              @click.prevent="isConfirmed = !isConfirmed"
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
              Konfirmasi Data
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <transition name="fading">
    <div class="contentBx m-7" v-if="isConfirmed">
      <h2 class="text-2xl font-semibold leading-tight my-2">
        Siswa {{ getSiswaInfo(1, form.siswa_id) }} Buku Spp
        {{ getSiswaInfo(2, form.spp_id) }}
      </h2>
      <div
        class="pb-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div class="flex flex-col md:justify-between items-center md:flex-row">
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Nominal</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <input
                type="number"
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200 disabled:dark:bg-gray-600"
                placeholder="Nominal"
                v-model="nominal"
                readonly
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-1/2 mx-2">
            <label class="leading-loose">Jumlah Bayar</label>
            <div class="relative focus-within:text-gray-600 text-gray-400">
              <input
                type="number"
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200 disabled:dark:bg-gray-600"
                placeholder="Jumlah Bayar"
                v-model="form.jumlah_bayar"
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
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between" v-if="form.jumlah_bayar > 1">
          <h2 class="text-2xl font-semibold leading-tight"></h2>
          <label class="inline-flex">
            <input
              type="checkbox"
              class="h-5 w-5"
              name="pilihan"
              v-model="form.is_specific"
            />
            <span class="ml-2 text-gray-700 text-sm"> Spesifik? </span>
          </label>
        </div>
      </div>
      <transition name="fading">
        <div class="contentBx m-7" v-if="form.is_specific">
          <h1 class="m-7 font-semibold text-3xl">Pembayaran Secara Spesifik</h1>
          <div
            class="flex justify-between m-7"
            v-for="(n, i) in defineCapable()"
            :key="n"
          >
            <label for="">Pembayaran Untuk Bulan </label>
            <div class="w-1/2">
              <select
                v-model="form.pembayaran_untuk[i]"
                class="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm rounded-md focus:outline-none text-gray-600 disabled:bg-gray-200 disabled:dark:bg-gray-600"
              >
                <option v-for="(month, i) in month" :key="i" :value="i + 1">
                  {{ month }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </transition>
      <div class="flex justify-center">
        <button
          @click.prevent="store()"
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
          Proses
        </button>
      </div>
    </div>
  </transition>
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
        siswa_id: null,
        spp_id: null,
        jumlah_bayar: 0,
        is_specific: false,
        pembayaran_untuk: [],
      },
      option: {
        kelas: null,
        siswa: null,
        spp: false,
      },
      isConfirmed: false,
      siswa: {},
      kelas: {},
      spp: {},
      nominal: 0,
      month: [
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
      ],
    };
  },
  watch: {
    "option.kelas": {
      handler(val) {
        this.getSiswa(val);
        this.option.siswa = null;
        this.option.spp = false;
      },
      deep: true,
    },
    "option.siswa": {
      handler(val) {
        this.form.siswa_id = val;
        this.option.spp = true;
        this.getSpp(val);
      },
      deep: true,
    },
    "option.spp": {
      handler(val) {
        this.form.spp_id = val;
      },
      deep: true,
    },
    "form.jumlah_bayar": {
      handler(val) {
        let bagi = Math.ceil(val / this.nominal);
        if (bagi >= 1) {
          for (let index = 0; index < bagi; index++) {
            if (this.form.pembayaran_untuk.length != bagi)
              this.form.pembayaran_untuk.push([""]);
          }
        } else {
          this.form.pembayaran_untuk = [];
        }
      },
      deep: true,
    },
  },
  methods: {
    getKelas() {
      Api.getData("kelas").then((data) => (this.kelas = data.data));
    },
    getSiswa(id) {
      Api.getData(`kelas/${id}`).then((data) => {
        this.siswa = data.data.siswa;
      });
    },
    getSpp(id) {
      Api.getData(`siswa/${id}`).then((data) => (this.spp = data.data.spp));
    },
    store() {
      Swal.fire({
        title: "Loading",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      Api.postData("pembayaran", this.form)
        .then((data) => {
          this.$store.dispatch("rekap", null);
          Swal.fire(data.message, "", "success");
          this.$router.push({ name: "pembayaran" });
        })
        .catch((error) => {
          Swal.fire(error.message, "", "error");
          console.log(error);
        });
    },
    getSiswaInfo(opsi, id) {
      if (opsi == 1) {
        let siswa = this.siswa.find((x) => x.id == id);
        return siswa.nama;
      }
      let spp = this.spp.find((r) => r.id == id);
      this.nominal = spp.nominal;
      return spp.tahun_ajaran;
    },
    defineCapable() {
      let bagi = Math.ceil(this.form.jumlah_bayar / this.nominal);
      return bagi;
    },
  },
  beforeMount() {
    Api.tokenChecker();
    this.getKelas();
  },
};
</script>

<style>
</style>