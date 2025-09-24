<script setup lang="ts">
interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  showInfo?: boolean;
  color?: "blue" | "green" | "orange" | "gray";
}

const props = withDefaults(defineProps<Props>(), {
  showInfo: true,
  color: "blue",
});

const emit = defineEmits<{
  "page-change": [page: number];
}>();

// Calcular información de paginación
const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1);
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems));

// Generar páginas a mostrar
const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;

  if (props.totalPages <= maxVisible) {
    // Mostrar todas las páginas si son pocas
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Lógica para mostrar páginas con elipsis
    const start = Math.max(1, props.currentPage - 2);
    const end = Math.min(props.totalPages, props.currentPage + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("...");
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < props.totalPages) {
      if (end < props.totalPages - 1) {
        pages.push("...");
      }
      pages.push(props.totalPages);
    }
  }

  return pages;
});

// Funciones de navegación
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("page-change", page);
  }
};

const goToPrevious = () => {
  if (props.currentPage > 1) {
    emit("page-change", props.currentPage - 1);
  }
};

const goToNext = () => {
  if (props.currentPage < props.totalPages) {
    emit("page-change", props.currentPage + 1);
  }
};

// Clases de color dinámicas
const colorClasses = computed(() => {
  const colors = {
    blue: {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-blue-100 hover:bg-blue-200 text-blue-800",
      current: "bg-blue-600 text-white",
      disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
    },
    green: {
      primary: "bg-green-600 hover:bg-green-700 text-white",
      secondary: "bg-green-100 hover:bg-green-200 text-green-800",
      current: "bg-green-600 text-white",
      disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
    },
    orange: {
      primary: "bg-orange-600 hover:bg-orange-700 text-white",
      secondary: "bg-orange-100 hover:bg-orange-200 text-orange-800",
      current: "bg-orange-600 text-white",
      disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
    },
    gray: {
      primary: "bg-gray-600 hover:bg-gray-700 text-white",
      secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
      current: "bg-gray-600 text-white",
      disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
    },
  };

  return colors[props.color];
});
</script>

<template>
  <div
    class="border-secondary-200 to-secondary-50 flex items-center justify-between border-t bg-gradient-to-r from-white px-4 py-4 sm:px-6"
  >
    <!-- Información de elementos -->
    <div
      v-if="showInfo"
      class="flex flex-1 justify-between sm:hidden"
    >
      <p class="text-secondary-600 text-sm">
        Mostrando
        <span class="text-secondary-800 font-semibold">{{ startItem }}</span>
        a
        <span class="text-secondary-800 font-semibold">{{ endItem }}</span>
        de
        <span class="text-secondary-800 font-semibold">{{ totalItems }}</span>
        resultados
      </p>
    </div>

    <!-- Paginación para móvil -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        :disabled="currentPage <= 1"
        :class="[
          'relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium',
          currentPage <= 1 ? colorClasses.disabled : 'bg-white text-gray-700 hover:bg-gray-50',
        ]"
        @click="goToPrevious"
      >
        Anterior
      </button>
      <button
        :disabled="currentPage >= totalPages"
        :class="[
          'relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium',
          currentPage >= totalPages ? colorClasses.disabled : 'bg-white text-gray-700 hover:bg-gray-50',
        ]"
        @click="goToNext"
      >
        Siguiente
      </button>
    </div>

    <!-- Paginación para desktop -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-secondary-600 text-sm">
          Mostrando
          <span class="text-secondary-800 font-semibold">{{ startItem }}</span>
          a
          <span class="text-secondary-800 font-semibold">{{ endItem }}</span>
          de
          <span class="text-secondary-800 font-semibold">{{ totalItems }}</span>
          resultados
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <!-- Botón Anterior -->
          <button
            :disabled="currentPage <= 1"
            :class="[
              'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
              currentPage <= 1 ? colorClasses.disabled : 'hover:text-gray-500',
            ]"
            @click="goToPrevious"
          >
            <span class="sr-only">Anterior</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!-- Números de página -->
          <template
            v-for="(pageNum, index) in visiblePages"
            :key="index"
          >
            <button
              v-if="pageNum !== '...'"
              :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                pageNum === currentPage ? colorClasses.current : 'text-gray-900 hover:text-gray-500',
              ]"
              @click="goToPage(pageNum as number)"
            >
              {{ pageNum }}
            </button>
            <span
              v-else
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
            >
              ...
            </span>
          </template>

          <!-- Botón Siguiente -->
          <button
            :disabled="currentPage >= totalPages"
            :class="[
              'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
              currentPage >= totalPages ? colorClasses.disabled : 'hover:text-gray-500',
            ]"
            @click="goToNext"
          >
            <span class="sr-only">Siguiente</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
