<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <UiHeroSection
      title="Gestión Deportiva"
      subtitle="La plataforma definitiva para gestionar jugadores, entrenadores y clubes de fútbol. Organiza tu equipo con herramientas profesionales y modernas."
      :primary-action="{
        text: 'Gestionar Jugadores',
        to: '/players',
        icon: 'users',
      }"
      :secondary-action="{
        text: 'Gestionar Entrenadores',
        to: '/coaches',
        icon: 'clipboard',
      }"
    />

    <!-- Features Section -->
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Gestiona tu Equipo</h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Herramientas profesionales para la gestión completa de tu equipo deportivo
        </p>
      </div>

      <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Players Card -->
        <UiFeatureCard
          title="Jugadores"
          description="Administra fichas de jugadores, dorsales, salarios y asignaciones a clubes. Control total sobre la información deportiva."
          icon="users"
          color="blue"
          link-to="/players"
          link-text="Ver Jugadores"
        />

        <!-- Coaches Card -->
        <UiFeatureCard
          title="Entrenadores"
          description="Organiza el equipo técnico, nacionalidades, salarios y asignaciones. Herramientas profesionales para la gestión del staff."
          icon="clipboard"
          color="green"
          link-to="/coaches"
          link-text="Ver Entrenadores"
        />

        <!-- Clubs Card -->
        <UiFeatureCard
          title="Clubes"
          description="Gestiona información completa de clubes: estadios, ciudades, presupuestos y años de fundación. Control total de las instituciones deportivas."
          icon="building"
          color="orange"
          link-to="/clubs"
          link-text="Ver Clubes"
        />
      </div>
    </div>

    <!-- Key Features Section -->
    <UiFeatureGrid
      title="Características Principales"
      subtitle="Herramientas profesionales diseñadas para la gestión deportiva moderna"
      :features="[
        {
          icon: 'lightning',
          title: 'Rápido',
          description: 'Interfaz optimizada para máxima eficiencia',
          color: 'blue',
        },
        {
          icon: 'shield',
          title: 'Seguro',
          description: 'Datos protegidos con las mejores prácticas',
          color: 'green',
        },
        {
          icon: 'mobile',
          title: 'Responsive',
          description: 'Funciona perfectamente en todos los dispositivos',
          color: 'orange',
        },
        {
          icon: 'heart',
          title: 'Intuitivo',
          description: 'Diseño centrado en la experiencia del usuario',
          color: 'gray',
        },
      ]"
    />

    <!-- Call to Action Section -->
    <UiCTASection
      title="¿Listo para comenzar?"
      subtitle="Comienza a gestionar tu equipo deportivo de manera profesional desde hoy mismo"
      :actions="[
        {
          text: 'Registrar un jugador',
          to: '/players/new',
          variant: 'primary',
          icon: 'plus',
        },
        {
          text: 'Registrar un club',
          to: '/clubs/new',
          variant: 'secondary',
          icon: 'building',
        },
      ]"
    />
  </div>
</template>
