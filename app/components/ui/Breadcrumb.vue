<script setup lang="ts">
interface BreadcrumbItem {
  label: string;
  to?: string;
  icon?: string;
}

interface Props {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  color?: "blue" | "green" | "orange" | "gray";
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  showHome: true,
  color: "gray",
});

const route = useRoute();

// Generar breadcrumbs automáticamente basado en la ruta
const autoBreadcrumbs = computed(() => {
  const pathSegments = route.path.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Agregar Home si está habilitado
  if (props.showHome) {
    breadcrumbs.push({
      label: "Inicio",
      to: "/",
      icon: "home",
    });
  }

  // Procesar cada segmento de la ruta
  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Determinar el tipo de página y generar label apropiado
    let label = "";
    let icon = "";

    if (segment === "players") {
      label = "Jugadores";
      icon = "users";
    } else if (segment === "coaches") {
      label = "Entrenadores";
      icon = "clipboard";
    } else if (segment === "clubs") {
      label = "Clubes";
      icon = "building";
    } else if (segment === "new") {
      label = "Nuevo";
      icon = "plus";
    } else if (segment === "edit") {
      label = "Editar";
      icon = "edit";
    } else if (segment.match(/^\d+$/)) {
      // Es un ID numérico
      label = `ID: ${segment}`;
      icon = "id";
    } else if (segment.match(/^[a-zA-Z0-9]+$/)) {
      // Es un ID string
      label = `ID: ${segment}`;
      icon = "id";
    } else {
      // Segmento genérico
      label = segment.charAt(0).toUpperCase() + segment.slice(1);
      icon = "file";
    }

    // Solo agregar enlace si no es el último elemento
    const isLast = index === pathSegments.length - 1;
    breadcrumbs.push({
      label,
      to: isLast ? undefined : currentPath,
      icon,
    });
  });

  return breadcrumbs;
});

// Usar breadcrumbs personalizados si se proporcionan, sino usar automáticos
const breadcrumbs = computed(() => {
  return props.items.length > 0 ? props.items : autoBreadcrumbs.value;
});

// Clases de color dinámicas
const colorClasses = computed(() => {
  const colors = {
    blue: {
      text: "text-blue-600",
      hover: "hover:text-blue-800",
      current: "text-blue-900",
      separator: "text-blue-400",
    },
    green: {
      text: "text-green-600",
      hover: "hover:text-green-800",
      current: "text-green-900",
      separator: "text-green-400",
    },
    orange: {
      text: "text-orange-600",
      hover: "hover:text-orange-800",
      current: "text-orange-900",
      separator: "text-orange-400",
    },
    gray: {
      text: "text-gray-600",
      hover: "hover:text-gray-800",
      current: "text-gray-900",
      separator: "text-gray-400",
    },
  };

  return colors[props.color];
});

// Iconos SVG inline
const getIcon = (iconName: string) => {
  const icons = {
    home: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
    </svg>`,
    users: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
    </svg>`,
    clipboard: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8zM3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" clip-rule="evenodd"/>
    </svg>`,
    building: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
    </svg>`,
    plus: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
    </svg>`,
    edit: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
    </svg>`,
    user: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
    </svg>`,
    file: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
    </svg>`,
  };

  return icons[iconName as keyof typeof icons] || icons.file;
};
</script>

<template>
  <nav
    class="flex"
    aria-label="Breadcrumb"
  >
    <ol class="flex items-center space-x-1 md:space-x-3">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <!-- Separador -->
        <svg
          v-if="index > 0"
          class="mx-1 h-4 w-4 md:mx-2"
          :class="colorClasses.separator"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>

        <!-- Elemento del breadcrumb -->
        <div class="flex items-center">
          <!-- Icono -->
          <span
            v-if="item.icon"
            class="mr-1 md:mr-2"
            :class="[index === breadcrumbs.length - 1 ? colorClasses.current : colorClasses.text]"
            v-html="getIcon(item.icon)"
          />

          <!-- Enlace o texto -->
          <NuxtLink
            v-if="item.to"
            :to="item.to"
            class="text-sm font-medium transition-colors duration-150"
            :class="[colorClasses.text, colorClasses.hover]"
          >
            {{ item.label }}
          </NuxtLink>
          <span
            v-else
            class="text-sm font-medium"
            :class="colorClasses.current"
            aria-current="page"
          >
            {{ item.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>
