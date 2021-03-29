<template>
  <div
    class="overflow-hidden min-h-screen font-sans bg-white dark:bg-gray-900 text-black dark:text-white"
  >
    <nav class="m-5 md:mx-20 md:my-10 w-full">
      <router-link
        class="text-left font-bold text-lg md:text-4xl mx-auto"
        :to="{ name: 'landing' }"
        >Siperas</router-link
      >
    </nav>
    <div
      class="max-w-max px-16 mx-auto flex flex-wrap flex-col md:flex-row items-center overflow-y-hidden pb-4 mt-0 md:-mt-16"
    >
      <div class="w-0 hidden md:flex mt-16 md:w-3/5 py-6 justify-start w">
        <img class="w-full md:w-4/5 z-1" src="../assets/images/hero.png" />
      </div>
      <!--Left Col-->
      <div class="flex w-full md:w-2/5 justify-center items-end">
        <div class="container mx-auto flex flex-col items-center">
          <form
            method="POST"
            @submit.prevent="login"
            class="shadow-lg w-full p-10 flex flex-col rounded-lg bg-white-gray dark:bg-gray-600"
          >
            <h5 class="font-bold text-center text-xl mt-5 mb-12">
              Selamat datang di Siperas
            </h5>
            <transition name="fade">
              <div v-if="!loginSiswa" class="flex flex-col">
                <label for="username" class="text-center font-semibold my-2"
                  >Username</label
                >
                <input
                  type="text"
                  placeholder="Masukan Username anda"
                  v-model="form.username"
                  class="mb-3 p-2 focus:outline-none rounded-md focus:ring-1 ring-black shadow-sm focus:shadow-lg dark:text-black"
                />
                <label for="password" class="text-center font-semibold my-2"
                  >Password</label
                >
                <input
                  type="password"
                  placeholder="Masukan Password anda"
                  v-model="form.password"
                  class="mb-1 p-2 focus:outline-none rounded-md focus:ring-1 ring-black shadow-sm focus:shadow-lg dark:text-black"
                />
              </div>
              <div v-else class="flex flex-col">
                <label for="nisn" class="text-center font-semibold my-2"
                  >NISN</label
                >
                <input
                  type="number"
                  placeholder="Masukan NISN anda"
                  v-model="form.nisn"
                  class="mb-3 p-2 focus:outline-none rounded-md focus:ring-1 ring-black shadow-sm focus:shadow-lg dark:text-black"
                />
              </div>
            </transition>

            <button class="btn mt-20 mb-10" @click.prevent="login">
              Login
            </button>
            <hr />
            <a
              @click.prevent="changeLoginAs"
              class="text-blue-400 dark:text-indigo-100 text-center my-2 cursor-pointer"
            >
              Login sebagai {{ loginSiswa ? "petugas" : "siswa" }}
            </a>
          </form>
        </div>
      </div>
      <!--Right Col-->
    </div>
    <ToggleDarkVue />
  </div>
</template>

<script>
import Api from "@/Api";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";

import ToggleDarkVue from "../components/ToggleDark.vue";
export default {
  components: {
    ToggleDarkVue,
  },
  data() {
    return {
      loginSiswa: false,
      form: {
        username: "",
        password: "",
        nisn: "",
      },
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  beforeMount() {
    this.$store.dispatch("initTheme");
  },
  watch: {
    getTheme(v) {
      v === "light"
        ? document.querySelector("html").classList.remove("dark")
        : document.querySelector("html").classList.add("dark");
    },
  },
  methods: {
    changeLoginAs() {
      this.loginSiswa = !this.loginSiswa;
    },
    login() {
      let uri = this.loginSiswa ? "auth/siswa/login" : "auth/login";
      if (this.loginSiswa) {
        delete this.form.username;
        delete this.form.password;
      } else {
        delete this.form.nisn;
      }
      Api.postData(uri, this.form)
        .then((data) => {
          Api.setHeaders(data.token);
          localStorage.setItem("siperas_key", data.token);
          Swal.fire({
            title: "Sukses Login",
            icon: "success",
          });
          this.$router.push({ name: "dashboard" });
          this.$store.dispatch("user", data.user);
        })
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: "error",
          });
          this.errors = error.data;
        });

      Swal.fire({
        title: "Loading",
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },
  },
};
</script>