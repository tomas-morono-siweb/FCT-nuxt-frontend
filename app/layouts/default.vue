<template>
  <div>
    <header class="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
      <nav
        class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
      >
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="bg-primary-600 h-8 w-8 rounded-xl"></div>
            <span class="text-lg font-semibold">Gestión Deportiva</span>
          </NuxtLink>
        </div>
        <div class="flex items-center gap-1">
          <NuxtLink to="/players" class="btn btn-ghost">Jugadores</NuxtLink>
          <NuxtLink to="/coaches" class="btn btn-ghost">
            Entrenadores
          </NuxtLink>
          <NuxtLink to="/clubs" class="btn btn-ghost">Clubes</NuxtLink>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6">
      <slot />
    </main>
  </div>
</template>
