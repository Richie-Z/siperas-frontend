<template>
  <nav
    class="text-black dark:text-gray-100 font-bold m-7"
    aria-label="Breadcrumb"
  >
    <ol class="list-none p-0 inline-flex">
      <li class="flex items-center">
        <router-link :to="{ name: 'dashboard' }"> Home </router-link>
        <svg
          class="fill-current w-3 h-3 mx-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
          />
        </svg>
      </li>
      <li class="flex items-center" v-for="n in totalPage" :key="n">
        <router-link
          v-if="n == 1"
          :to="difineTo(n)"
          :class="{ 'text-gray-500 dark:text-gray-900': totalPage == 1 }"
          >{{ typeof page == "object" ? page[0] : page }}</router-link
        >
        <div class="flex items-center" v-if="totalPage > 1">
          <svg
            v-if="n != totalPage"
            class="fill-current w-3 h-3 mx-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
            />
          </svg>
          <span v-if="nestedRouterLink && n == totalPage + 1 - totalPage">
            <router-link
              :to="{
                name: nestedRouterLink,
                params: { id: this.$route.query.siswa_id },
              }"
              :class="{
                'text-gray-500 dark:text-gray-900': n == totalPage - 1,
              }"
              aria-current="page"
              class="disabled:cursor-default"
              >{{ page[n] }}</router-link
            >
          </span>
          <span v-else>
            <a
              href="#"
              :class="{
                'text-gray-500 dark:text-gray-900': n == totalPage - 1,
              }"
              >{{ page[n] }}</a
            >
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  props: {
    page: [String, Array],
    nestedRouterLink: [String, Array],
  },
  computed: {
    totalPage() {
      if (typeof this.page === "string") return 1;
      return this.page.length;
    },
  },
  methods: {
    difineTo(n) {
      let page = this.page;
      let to = {};
      if (typeof page === "object" && n == 1) {
        let split = page[0].split(" ");
        to = {
          name:
            split.length > 1 ? split[1].toLowerCase() : split[0].toLowerCase(),
        };
      } else {
        let split = page.split(" ");
        to = {
          name:
            split.length > 1 ? split[1].toLowerCase() : split[0].toLowerCase(),
        };
      }

      return to;
    },
  },
};
</script>

<style>
</style>