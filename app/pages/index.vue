<template>
  <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div class="card">
      <div class="card-body">
        <h2 class="mb-2 text-lg font-semibold">Jugadores</h2>
        <p class="mb-4 text-sm text-gray-600">Gestiona altas, bajas y datos de jugadores.</p>
        <NuxtLink to="/players" class="btn btn-primary">Ir a Jugadores</NuxtLink>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h2 class="mb-2 text-lg font-semibold">Entrenadores</h2>
        <p class="mb-4 text-sm text-gray-600">Información y asignación a clubes.</p>
        <NuxtLink to="/coaches" class="btn btn-primary">Ir a Entrenadores</NuxtLink>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h2 class="mb-2 text-lg font-semibold">Clubes</h2>
        <p class="mb-4 text-sm text-gray-600">Alta de clubes y detalles.</p>
        <NuxtLink to="/clubs" class="btn btn-primary">Ir a Clubes</NuxtLink>
      </div>
    </div>
  </section>
</template>

<!--
Notas acerca de Nuxt.js:
- Para los links no se usan <a> sino <NuxtLink>
- Los componentes deben llevar 2 palabras para diferenciarlos de los elementos HTML
- Los componentes se pueden dividir en carpetas dentro de la carpeta components pero luego
  deben usarse con el nombre de la carpeta como prefijo: <NavBar /> -> <CarpetaNavBar />
- Para compartir utilidades usaremos una carpeta /utils en el directorio en el que queramos
  compartirlas, en caso de querer que sean accesibles globalmente, la crearemos en /shared
- En /interfaces creamos los tipos de datos para las entidades de la aplicación.

-->
