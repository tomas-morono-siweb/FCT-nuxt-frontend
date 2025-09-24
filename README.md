# Mini-application about a football club

## Setup

Install dependencies:

```bash

# pnpm
pnpm install

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash

# pnpm
pnpm dev

```

## Production

Build the application for production:

```bash

# pnpm
pnpm build

```

Locally preview production build:

```bash

# pnpm
pnpm preview

```

## Secret

The secret will be `abc123.` by default

## Notas acerca de Nuxt

- Para los links no se usan \<a> sino \<NuxtLink>
- Los componentes deben llevar 2 palabras para diferenciarlos de los elementos HTML
- Los componentes se pueden dividir en carpetas dentro de la carpeta components pero luego
  deben usarse con el nombre de la carpeta como prefijo: \<NavBar /> -> \<CarpetaNavBar />
- Para compartir utilidades usaremos una carpeta /utils en el directorio en el que queramos
  compartirlas, en caso de querer que sean accesibles globalmente, la crearemos en /shared
- En /interfaces creamos los tipos de datos para las entidades de la aplicación.
