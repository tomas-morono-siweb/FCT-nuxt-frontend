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
  <div class="border-secondary-200 rounded-xl border bg-white shadow-lg">
    <!-- Desktop Table View -->
    <div class="hidden lg:block">
      <div class="overflow-x-auto">
        <table class="divide-secondary-200 min-w-full divide-y">
          <thead class="from-secondary-50 to-secondary-100 bg-gradient-to-r">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                class="text-secondary-700 px-6 py-4 text-left text-xs font-semibold tracking-wider uppercase"
              >
                {{ column.label }}
              </th>
              <th class="text-secondary-700 px-6 py-4 text-right text-xs font-semibold tracking-wider uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-secondary-100 divide-y bg-white">
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
        class="divide-secondary-200 divide-y"
      >
        <slot name="mobile" />
      </div>
    </div>
  </div>
</template>
