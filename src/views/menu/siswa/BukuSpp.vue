<template>
  <breadcrumb-vue page="Buku Spp" />
  <h1 class="m-7 font-semibold text-3xl">Buku Spp</h1>
  <div class="contentBx m-7">
    <table-vue
      v-if="siswa.spp"
      :name="`Buku SPP ${profile.nama}`"
      :column="column"
      :row="siswa.spp"
      :isEditable="true"
      :isDeleteable="false"
      nestedRouter="Spp"
    />
  </div>
</template>

<script>
import Api from "../../../Api";
import BreadcrumbVue from "../../../components/Breadcrumb.vue";
import TableVue from "../../../components/Table.vue";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  components: {
    TableVue,
    BreadcrumbVue,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      profile: {},
      siswa: {},
      column: [
        { name: "Tahun Ajaran", rowModel: "tahun_ajaran" },
        { name: "Nominal", rowModel: "nominal" },
        { name: "Status", rowModel: "is_lunas" },
      ],
    };
  },
  methods: {
    getData() {
      Api.getData(`siswa/${this.profile.id}`).then(
        (data) => (this.siswa = data.data)
      );
    },
  },
  mounted() {
    if (this.user) {
      this.profile = this.user;
      this.getData();
    } else {
      Api.getData("auth/profile")
        .then((data) => {
          this.profile = data.data;
          this.$store.dispatch("user", data.data);
        })
        .then(() => this.getData())
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: "error",
          });
          Api.deleteAuthorization();
          localStorage.removeItem("siperas_key");
          this.$store.dispatch("resetState");
          this.$router.push({ name: "landing" });
        });
    }
  },
};
</script>

<style>
</style>