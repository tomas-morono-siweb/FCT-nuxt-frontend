<script setup>
const { width, height } = useDimensions();

onMounted(() => {
  console.log(calculateCircleArea(10));
  width.value = window.innerWidth;
  height.value = window.innerHeight;

  window.addEventListener('resize', () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  });
});

async function test() {
  const response = await $fetch('/api/send-message', {
    method: 'POST',
    body: {
      message: 'Hola desde el frontend'
    }
  });
  console.log(response);
}
</script>

<template>
  <div>
    <h1>Hello World</h1>
    <p>Width: {{ width }}</p>
    <p>Height: {{ height }}</p>
    <button @click="test">Test</button>
  </div>
</template>

<!--
Notas acerca de Nuxt.js:
- Para los links no se usan <a> sino <NuxtLink>
- Los componentes deben llevar 2 palabras para diferenciarlos de los elementos HTML
- Los componentes se pueden dividir en carpetas dentro de la carpeta components pero luego
  deben usarse con el nombre de la carpeta como prefijo: <NavBar /> -> <CarpetaNavBar />
- Para compartir utilidades usaremos una carpeta /utils en el directorio en el que queramos
  compartirlas, en caso de querer que sean accesibles globalmente, la crearemos en /shared

-->