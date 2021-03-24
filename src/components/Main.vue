<template>
  <!-- component -->
  <div class="dark:text-white" id="main" @click="closeDropdown">
    <div class="flex h-screen overflow-y-hidden bg-white dark:bg-gray-900">
      <!-- Sidebar backdrop -->
      <div
        v-if="isSidebarOpen"
        @click="toggleSidebarMenu()"
        class="fixed inset-0 z-10 bg-black bg-opacity-20 lg:hidden"
        style="backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px)"
      ></div>

      <!-- Sidebar -->
      <transition
        name="custom-classes-transition"
        enter-from-class="transition transform duration-300"
        enter-active-class="-translate-x-full opacity-30  ease-in"
        enter-to-class="translate-x-0 opacity-100 ease-out"
        leave-from-class="transition transform duration-300"
        leave-active-class="translate-x-0 opacity-100 ease-out"
        leave-to-class="-translate-x-full opacity-0 ease-in"
      >
        <aside
          class="fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform border-r bg-white dark:bg-gray-900 shadow-lg lg:z-auto lg:static lg:shadow-none"
          :class="{
            '-translate-x-full lg:translate-x-0 lg:w-20': !isSidebarOpen,
          }"
        >
          <!-- sidebar header -->
          <div
            class="flex items-center flex-shrink-0 p-2 justify-center"
            :class="{ 'lg:justify-center': !isSidebarOpen }"
          >
            <span
              class="p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap"
            >
              S<span :class="{ 'lg:hidden': !isSidebarOpen }">iperas</span>
            </span>
            <button
              @click="toggleSidebarMenu()"
              class="p-2 rounded-md lg:hidden"
            >
              <svg
                class="w-6 h-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <!-- Sidebar links -->
          <nav class="flex-1 overflow-hidden hover:overflow-y-auto">
            <ul class="p-2 overflow-hidden">
              <li class="menu">
                <router-link
                  :to="{ name: 'dashboard' }"
                  class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                  :class="{ 'justify-center': !isSidebarOpen }"
                >
                  <span>
                    <svg
                      class="w-6 h-6 text-gray-400"
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
                  </span>
                  <span :class="{ 'lg:hidden': !isSidebarOpen }"
                    >Dashboard</span
                  >
                </router-link>
              </li>
              <!-- Sidebar Links... -->
            </ul>
          </nav>
          <!-- Sidebar footer -->
          <div class="flex-shrink-0 p-2 border-t max-h-14">
            <button
              @click="logout"
              class="flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 dark:bg-gray-900 border rounded-md focus:outline-none focus:ring"
            >
              <span>
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
              <span :class="{ 'lg:hidden': !isSidebarOpen }"> Logout </span>
            </button>
          </div>
        </aside>
      </transition>

      <div class="flex flex-col flex-1 h-full overflow-hidden">
        <!-- Navbar -->
        <header
          class="flex-shrink-0 border-b-4 border-indigo-200 dark:border-indigo-600"
        >
          <div class="flex items-center justify-between p-2">
            <!-- Navbar left -->
            <div class="flex items-center space-x-3">
              <span
                class="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden"
                >Siperas</span
              >
              <!-- Toggle sidebar button -->
              <button
                @click="toggleSidebarMenu()"
                class="p-2 rounded-md focus:outline-none focus:ring"
              >
                <svg
                  class="w-4 h-4 text-gray-600"
                  :class="{
                    'transform transition-transform -rotate-180': isSidebarOpen,
                  }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Mobile search box -->
            <div
              v-if="isSearchBoxOpen"
              class="fixed inset-0 z-10 bg-black bg-opacity-20"
              style="
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
              "
            >
              <div
                @click.prevent="isSearchBoxOpen = false"
                class="absolute inset-x-0 flex items-center justify-between p-2 bg-white shadow-md"
              >
                <div class="flex items-center flex-1 px-2 space-x-2">
                  <!-- search icon -->
                  <span>
                    <svg
                      class="w-6 h-6 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    class="w-full px-4 py-3 text-gray-600 rounded-md focus:bg-gray-100 focus:outline-none"
                  />
                </div>
                <!-- close button -->
                <button
                  @click="isSearchBoxOpen = false"
                  class="flex-shrink-0 p-4 rounded-md"
                >
                  <svg
                    class="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Desktop search box -->
            <div
              class="items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5"
            >
              <!-- search icon -->
              <span>
                <svg
                  class="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search"
                class="px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-600 dark:hover:bg-gray-700 hover:bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border dark:text-gray-100 dark:focus:bg-gray-700"
              />
            </div>

            <!-- Navbar right -->
            <div class="relative flex items-center space-x-3">
              <!-- Search button -->
              <button
                @click="isSearchBoxOpen = true"
                class="p-2 bg-gray-100 rounded-full md:hidden focus:outline-none focus:ring hover:bg-gray-200"
              >
                <svg
                  class="w-6 h-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <!-- avatar button -->
              <div class="relative" v-if="isLoaded">
                <button
                  @click="isDropdownOpen = !isDropdownOpen"
                  id="avatar"
                  class="p-1 bg-gray-200 rounded-full focus:outline-none focus:ring"
                >
                  <div class="profile dark:text-black">
                    {{ nicknameMaker() }}
                  </div>
                </button>
                <!-- green dot -->
                <div
                  class="absolute right-0 p-1 bg-green-400 rounded-full top-5 animate-ping"
                ></div>
                <div
                  class="absolute right-0 p-1 bg-green-400 border border-white rounded-full top-5"
                ></div>

                <!-- Dropdown card -->
                <transition name="fading">
                  <div
                    v-if="isDropdownOpen"
                    id="dropdown-content"
                    class="absolute left-9 mt-2 px-6 transform -translate-x-full bg-white dark:bg-gray-900 rounded-md shadow-lg min-w-max"
                  >
                    <div class="flex flex-col p-4 space-y-1 font-medium">
                      <span class="text-gray-800 dark:text-white">{{
                        profile.nama_petugas
                      }}</span>
                    </div>
                    <ul class="flex flex-col p-2 space-y-1 eas">
                      <li>
                        <a
                          href="#"
                          class="block px-2 py-1 transition rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                          >Pengaturan</a
                        >
                      </li>
                    </ul>
                    <div
                      class="flex items-center justify-center p-4 text-gray-900 dark:text-white border-t cursor-pointer"
                    >
                      <a
                        @click="logout"
                        class="block px-2 py-1 transition rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                        >Logout</a
                      >
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </header>
        <!-- Main content -->

        <!-- Start Content -->
        <div
          class="bg-gray-200 dark:bg-gray-600 flex-1 overflow-x-hidden overflow-y-scroll"
        >
          <router-view></router-view>
        </div>

        <ToggleDark />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Api from "@/Api";
import Swal from "sweetalert2";
import ToggleDark from "../components/ToggleDark.vue";
export default {
  components: {
    ToggleDark,
  },
  computed: {
    ...mapGetters(["user", "getTheme"]),
  },
  data() {
    return {
      isSidebarOpen: false,
      isSearchBoxOpen: false,
      isDropdownOpen: false,
      isLoaded: false,
    };
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
  mounted() {
    if (this.user) {
      this.profile = this.user;
      this.isLoaded = true;
    } else {
      Api.getData("auth/profile")
        .then((data) => {
          this.profile = data.data;
          this.$store.dispatch("user", data.data);
          this.isLoaded = true;
        })
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: "error",
          });
          localStorage.removeItem("siperas_key");
          this.$store.dispatch("resetState");
          this.$router.push({ name: "landing" });
        });
    }
  },
  methods: {
    toggleSidebarMenu() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    nicknameMaker() {
      let profile = this.profile.nama_petugas;
      let arrayName = profile.split(/[-:]|[ :]/g);
      if (arrayName.length == 1) {
        return arrayName[0];
      }
      let firstLetter = new Array();
      for (let index = 0; index < arrayName.length; index++) {
        firstLetter.push(arrayName[index][0]);
      }
      return firstLetter.join("");
    },
    checkParent(t, elm) {
      while (t.parentNode) {
        if (t == elm) {
          return true;
        }
        t = t.parentNode;
      }
      return false;
    },
    closeDropdown(e) {
      let dropdownContent = document.getElementById("dropdown-content"),
        mainContent = document.getElementById("main"),
        avatar = document.getElementById("avatar"),
        target = e && e.target;
      if (!this.checkParent(target, dropdownContent)) {
        if (this.checkParent(target, avatar)) {
          this.isDropdownOpen = true;
        } else if (this.checkParent(target, mainContent)) {
          this.isDropdownOpen = false;
        }
      }
    },
    logout() {
      Api.deleteData("auth/logout", true)
        .then(() => {
          Swal.fire({
            title: "Logout Berhasil",
            icon: "success",
          });
          localStorage.removeItem("siperas_key");
          this.$store.dispatch("resetState");
          this.$router.push({ name: "landing" });
        })
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.profile {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
}
</style>