<template>
  <breadcrumb-vue
    :totalPage="2"
    currentPage="Data Petugas"
    childrenPage="Tambah Petugas"
  />
  <h1 class="m-7 font-semibold text-3xl">Tambah Petugas</h1>
  <div class="contentBx m-7"></div>
</template>

<script>
import BreadcrumbVue from "../../../components/Breadcrumb.vue";
export default {
  components: {
    BreadcrumbVue,
  },
};
</script>

<style>
</style>