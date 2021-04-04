<template>
  <div class="mx-auto">
    <h2 class="text-2xl font-semibold leading-tight">{{ name }}</h2>
  </div>
  <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead
          class="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-100 border-b-2 border-gray-200 dark:border-gray-800"
        >
          <tr>
            <th
              class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
            >
              Bulan
            </th>
            <th
              class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
            >
              Jumlah Pembayaran
            </th>
            <th
              class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="({ bulan, jumlah }, i) in row" :key="i">
            <td class="px-5 py-5 text-sm">
              <p class="text-gray-900 whitespace-no-wrap">{{ bulan }}</p>
            </td>
            <td class="px-5 py-5 text-sm">
              <p class="text-gray-900 whitespace-no-wrap">
                {{ typeof jumlah == "string" ? "-" : jumlah }}
              </p>
            </td>
            <td class="px-5 py-5 text-sm">
              <p class="text-gray-900 whitespace-no-wrap">
                {{ jumlah != nominal ? "Belum Lunas" : "Lunas" }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    row: [Array, Object],
    nominal: Number,
  },
};
</script>

<style>
</style>