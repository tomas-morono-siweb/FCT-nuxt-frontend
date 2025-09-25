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
  <div class="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
    <!-- Desktop Table View -->
    <div class="hidden lg:block">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="from-secondary-50 to-secondary-50 bg-gradient-to-r via-white">
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                class="border-secondary-100/50 text-secondary-700 border-r px-8 py-6 text-left text-xs font-bold tracking-wider uppercase last:border-r-0"
              >
                <div class="flex items-center space-x-2">
                  <div class="bg-primary-500 h-2 w-2 rounded-full"></div>
                  <span>{{ column.label }}</span>
                </div>
              </th>
              <th class="text-secondary-700 px-8 py-6 text-right text-xs font-bold tracking-wider uppercase">
                <div class="flex items-center justify-end space-x-2">
                  <span>Acciones</span>
                  <div class="bg-accent-500 h-2 w-2 rounded-full"></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-secondary-100/30 divide-y bg-white">
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
        class="space-y-3 p-4"
      >
        <slot name="mobile" />
      </div>
    </div>
  </div>
</template>
