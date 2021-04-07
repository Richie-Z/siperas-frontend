<template>
  <slot name="drop-bg"></slot>
  <div v-if="isOpen" class="flex justify-center items-center">
    <div class="flex items-center justify-center z-50 fixed top-48">
      <div class="max-w-xs">
        <div class="bg-white dark:bg-gray-900 shadow-xl rounded-lg py-3">
          <div class="photo-wrapper p-2">
            <div
              class="w-32 h-32 rounded-full mx-auto bg-gray-200 text-center dark:text-black flex justify-center items-center"
            >
              <slot name="nickname"></slot>
            </div>
          </div>
          <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
              {{ profileInfo.nama_petugas || profileInfo.nama }}
            </h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
              <p>
                {{ profileInfo?.level }}
              </p>
            </div>
            <table class="text-xs my-3">
              <tbody v-if="profileInfo?.level">
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">
                    Nama Petugas
                  </td>
                  <td class="px-2 py-2">
                    <input
                      type="text"
                      class="border"
                      v-model="form.nama_petugas"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">
                    Username
                  </td>
                  <td class="px-2 py-2">
                    <input type="text" class="border" v-model="form.username" />
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Nama</td>
                  <td class="px-2 py-2">
                    <input type="text" class="border" v-model="form.nama" />
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="text-center my-3">
              <button
                class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                @click="save()"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Api from "../Api";
export default {
  props: {
    isOpen: Boolean,
    profileInfo: {
      type: Object,
      default: () => {
        return {
          nama_petugas: "",
          username: "",
          nama: "",
        };
      },
    },
  },
  data() {
    return {
      form: {
        nama_petugas: "",
        username: "",
        nama: "",
      },
    };
  },
  watch: {
    async profileInfo(val) {
      this.form.nama_petugas = await val?.nama_petugas;
      this.form.username = await val?.username;
      this.form.nama = await val?.nama;
    },
  },
  methods: {
    save() {
      const info = {
        uri: this.profileInfo?.level ? "auth/update" : "auth/siswa/update",
        form: !this.profileInfo?.level
          ? { nama: this.form.nama }
          : delete this.form.nama
          ? this.form
          : this.form,
      };
      Swal.fire({
        title: "Loading",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      Api.putData(info.uri, info.form)
        .then((data) => {
          Swal.fire(data.message, "", "success");
          this.$router.go(0);
          //   const userState = this.$store.getters.user;
          //   userState.nama = this.form.nama;
          //   userState.nama_petugas = this.form.nama_petugas;
          //   userState.username = this.form.username;
          //   this.$store.dispatch("user", userState);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>