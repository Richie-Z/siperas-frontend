<template>
  <div class="mx-auto">
    <div class="flex justify-between">
      <h2 class="text-2xl font-semibold leading-tight">{{ name }}</h2>
      <router-link
        v-if="nestedRouter && row.length == 3 ? false : isAddable"
        :to="{ name: `tambah${nestedRouter ?? name}`, query: defineQuery }"
        class="h-6 w-6"
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
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </router-link>
    </div>
    <div class="my-2 flex sm:flex-row flex-col">
      <div class="flex flex-row mb-1 sm:mb-0">
        <div class="relative" v-if="isSortEntriesEnable">
          <select
            class="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option>10</option>
            <option>20</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
        <div class="relative" v-if="isFilterable">
          <select
            class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
          >
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="block relative" v-if="isSearchable">
        <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
          <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
            <path
              d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
            ></path>
          </svg>
        </span>
        <input
          placeholder="Search"
          class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
        />
      </div>
    </div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal" v-if="column && row">
          <thead
            class="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-100 border-b-2 border-gray-200 dark:border-gray-800"
          >
            <tr>
              <th
                class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                #
              </th>
              <th
                v-for="c in columnModel"
                :key="c"
                class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              >
                {{ c }}
              </th>
              <th
                v-if="isEditable || isCetak"
                class="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider"
              >
                Opsi
              </th>
            </tr>
          </thead>
          <tbody v-if="row.length <= 0" class="tbody">
            <tr>
              <td
                :colspan="columnModel.length + 1"
                class="px-5 py-5 text-sm text-center"
              >
                <p class="text-gray-900 whitespace-no-wrap">Tidak ada Data</p>
              </td>
            </tr>
          </tbody>
          <tbody class="tbody" v-else>
            <tr v-for="(row, i) in row" :key="i">
              <td class="px-5 py-5 text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{ isPaginated ? paginationInfo.from + i : i + 1 }}
                </p>
              </td>
              <td class="px-5 py-5 text-sm" v-for="r in rowModel" :key="r">
                <p class="text-gray-900 whitespace-no-wrap">
                  {{
                    typeof row[r] == "boolean"
                      ? checkIfLunas(row[r])
                      : 0 >= row[r]
                      ? "-"
                      : row[r]
                  }}
                </p>
              </td>
              <td class="px-5 py-5 text-sm text-center" v-if="isCetak">
                <router-link
                  :to="{ name: 'detailPembayaran', params: { id: row.id } }"
                  class="btn-table bg-blue-500 ring-blue-300"
                  target="_blank"
                  >Cetak</router-link
                >
              </td>
              <td class="px-5 py-5 text-sm text-center" v-if="isEditable">
                <router-link
                  :to="detailLink(row.id)"
                  class="btn-table bg-yellow-500 ring-yellow-300"
                >
                  Detail
                </router-link>
                <button
                  v-if="checkIfEditable(row?.editable) && isDeleteable"
                  class="btn-table bg-red-500 ring-red-300"
                  @click.prevent="deleteData(row.id)"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="isPaginated"
      class="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between"
    >
      <span class="text-xs xs:text-sm text-gray-900">
        Menunjukan {{ paginationInfo.from }} sampai
        {{
          paginationInfo.current_page == paginationInfo.last_page
            ? paginationInfo.to
            : paginationInfo.from - 1 + paginationInfo.per_page
        }}
        dari {{ paginationInfo.total }} Data
      </span>
      <div class="inline-flex mt-2 xs:mt-0">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Api from "@/Api";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    column: {
      type: Array,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
    isSearchable: {
      type: Boolean,
      required: false,
      default: false,
    },
    isSortEntriesEnable: {
      type: Boolean,
      required: false,
      default: false,
    },
    isFilterable: {
      type: Boolean,
      required: false,
      default: false,
    },
    isPaginated: {
      type: Boolean,
      required: false,
      default: false,
    },
    isAddable: {
      type: Boolean,
      required: false,
      default: false,
    },
    isEditable: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDeleteable: {
      type: Boolean,
      required: false,
      default: true,
    },
    deleteMessageModel: String,
    nestedRouter: String,
    paginationInfo: Object,
    isCetak: Boolean,
  },
  computed: {
    columnModel() {
      return this.column.map((a) => a.name);
    },
    rowModel() {
      return this.column.map((a) => a.rowModel);
    },
    defineQuery() {
      if (this.nestedRouter) {
        const query = {
          siswa_id: this.$route.params.id,
        };
        return query;
      }
      return "";
    },
  },
  methods: {
    detailLink(id) {
      const name = `detail${this.nestedRouter ?? this.name}`;
      if (this.nestedRouter) {
        const query = {
          name,
          query: {
            siswa_id: this.$route.params.id,
            spp_id: id,
          },
        };
        return query;
      }
      const params = {
        name,
        params: { id: id },
      };
      return params;
    },
    checkIfLunas(n) {
      return n ? "Lunas" : "Belum Lunas";
    },
    checkIfEditable(editable) {
      return editable ?? true;
    },

    deleteData(id) {
      let name = this.row.find((r) => r.id == id);
      const uri = this.nestedRouter
        ? `siswa/${this.$route.params.id}/spp/${id}`
        : `${this.name.toLowerCase()}/${id}`;
      const routerTo = () => {
        let router = { query: { status: "deleted" } };
        if (!this.nestedRouter) {
          return Object.assign(router, {
            name: this.name.toLowerCase(),
          });
        }
        return Object.assign(router, {
          name: "detailSiswa",
          params: { id: this.$route.params.id },
        });
      };
      Swal.fire({
        title: "Yakin, Hapus data?",
        text: `Jika kamu hapus, maka semua data yang berelasi dengan nama ${
          this.name
        } '${name[this.deleteMessageModel]}' akan terhapus.`,
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Ga Jadi",
      }).then((result) => {
        if (result.isConfirmed) {
          Api.deleteData(uri)
            .then(() => {
              Swal.fire("Data berhasil dihapus!", "", "success");
              this.$router.push(routerTo());
            })
            .catch((error) => Swal.fire(error.message, "", "error"));
        }
      });
    },
  },
};
</script>

<style>
</style>