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

## Project Structure

```
FCT-nuxt-frontend/
├── app/
│   ├── components/        # Vue components (UI + entities)
│   ├── composables/       # Data management logic
│   ├── interfaces/        # TypeScript type definitions
│   ├── layouts/          # Page layouts
│   ├── pages/            # Application pages
│   │   ├── clubs/        # Club management pages
│   │   ├── coaches/      # Coach management pages
│   │   ├── players/      # Player management pages
│   │   └── index.vue     # Home page
│   ├── utils/            # Utility functions
│   └── assets/           # CSS and static assets
├── server/
│   └── api/              # Backend API routes
├── public/               # Static files
└── Configuration files   # Nuxt, Tailwind, TypeScript configs
```

## What you'll find

This is a **football club management application** built with Nuxt.js that allows you to:

- **Manage Players** (🔵 Blue theme) - Create, edit, view player information
- **Manage Coaches** (🟢 Green theme) - Handle coaching staff data
- **Manage Clubs** (🟣 Purple theme) - Organize club information

Each section includes full CRUD operations (Create, Read, Update, Delete) with a modern, responsive interface.
