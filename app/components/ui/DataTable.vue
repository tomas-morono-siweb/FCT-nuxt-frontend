<script setup lang="ts">
interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface Props {
  columns: Column[];
  loading?: boolean;
  error?: string | null;
  loadingMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  loadingMessage: "Cargando datos...",
});
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
    <!-- Desktop Table View -->
    <div class="hidden lg:block">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
              >
                {{ column.label }}
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <!-- Loading State -->
            <UiLoadingState
              v-if="loading"
              variant="table"
              :message="loadingMessage"
            />

            <!-- Error State -->
            <UiErrorState
              v-else-if="error"
              variant="table"
              :message="error"
            />

            <!-- Data Rows -->
            <slot v-else />
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Card View -->
    <div class="lg:hidden">
      <!-- Loading State -->
      <UiLoadingState
        v-if="loading"
        variant="inline"
        :message="loadingMessage"
      />

      <!-- Error State -->
      <UiErrorState
        v-else-if="error"
        variant="inline"
        :message="error"
      />

      <!-- Mobile Cards -->
      <div
        v-else
        class="divide-y divide-gray-200"
      >
        <slot name="mobile" />
      </div>
    </div>
  </div>
</template>
