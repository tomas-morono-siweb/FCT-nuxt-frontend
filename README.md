# ⚽ Football Club Management System

A modern, responsive football club management application built with Nuxt.js 4, featuring full CRUD operations for players, coaches, and clubs.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm
- **Backend API** running in the same URI/URL you've put on the .env

### Installation

Install dependencies:

```bash
# pnpm
pnpm install
```

### Environment Setup

Create a `.env` file from the example provided:

```bash
API_KEY=api-key-given-by-your-provider
API_BASE_URL=base-uri-given-by-provider
```

## 🛠️ Development

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

## 📦 Production

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

## 🎯 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

## 🔌 API Integration

This frontend connects to a Symfony backend API:

- **Base URL**: http://127.0.0.1:8000
- **Endpoints**:
  - `/players` - Player management
  - `/coaches` - Coach management
  - `/clubs` - Club management
- **Methods**: GET, POST, PUT, DELETE
- **Mock Data**: Fallback system for local development
- **CORS**: Configured headers for cross-origin requests

## 📁 Project Structure

```
FCT-nuxt-frontend/
├── app/
│   ├── components/        # Vue components
│   │   ├── entities/      # Player, Coach, Club cards
│   │   └── ui/           # Reusable UI components
│   ├── composables/       # Data management logic
│   │   ├── usePlayers.ts  # Player API operations
│   │   ├── useCoaches.ts  # Coach API operations
│   │   └── useClubs.ts    # Club API operations
│   ├── interfaces/        # TypeScript type definitions
│   │   ├── player.ts      # Player interface
│   │   ├── coach.ts       # Coach interface
│   │   └── club.ts        # Club interface
│   ├── layouts/          # Page layouts
│   ├── pages/            # Application pages
│   │   ├── clubs/        # Club management pages
│   │   ├── coaches/      # Coach management pages
│   │   ├── players/      # Player management pages
│   │   └── index.vue     # Home page
│   ├── utils/            # Utility functions
│   │   └── format.ts     # Financial formatting utilities
│   └── assets/           # CSS and static assets
├── server/
│   └── api/              # Backend API routes (Nuxt server)
│       ├── players/      # Player API endpoints
│       ├── coaches/      # Coach API endpoints
│       └── clubs/        # Club API endpoints
├── public/               # Static files
└── Configuration files   # Nuxt, Tailwind, TypeScript configs
```

## 🎨 Component Architecture

### UI Components

- **UiDataTable**: Modern, responsive data tables
- **UiFormField**: Consistent form inputs with validation
- **UiBreadcrumb**: Hierarchical navigation
- **UiPageHeader**: Page titles and descriptions
- **UiLoadingState**: Loading indicators
- **UiErrorState**: Error handling displays

### Entity Components

- **PlayerCard**: Player information display (desktop/mobile)
- **CoachCard**: Coach information display (desktop/mobile)
- **ClubCard**: Club information display (desktop/mobile)

### Composables

- **usePlayers**: Player data management and API calls
- **useCoaches**: Coach data management and API calls
- **useClubs**: Club data management and API calls
- **useGlobalLoading**: Global loading state management

## 🔄 State Management

The application uses **custom composables** instead of Pinia for state management:

### Global Loading State

- **Counter-based**: Tracks multiple concurrent operations
- **Message system**: Custom loading messages for each operation
- **Automatic cleanup**: Stops loading when all operations complete
- **withLoading wrapper**: Simplifies async operation handling

### Data State

- **useAsyncData**: Nuxt's built-in data fetching with caching
- **Reactive refs**: Vue 3 Composition API for local state
- **Cache invalidation**: Automatic cache clearing after mutations
- **Error handling**: Comprehensive error states and recovery

### Breadcrumb Hierarchy

- **Listings**: `Inicio > Entidad`
- **Creation**: `Inicio > Entidad > Nuevo`
- **Details**: `Inicio > Entidad > Nombre de la Entidad`
- **Editing**: `Inicio > Entidad > Editar > Nombre de la Entidad`

### Color Coding

- 🔵 **Players**: Blue theme throughout
- 🟢 **Coaches**: Green theme throughout
- 🟠 **Clubs**: Orange theme throughout

## 🔧 Development Features

- **Hot Reload**: Instant updates during development
- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency
- **Mock Data**: Fallback system when API is unavailable
- **Error Handling**: Comprehensive error states and messages
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Semantic HTML and ARIA labels

## 🚨 Troubleshooting

### Common Issues

**API Connection Issues:**

- Ensure backend is running on http://127.0.0.1:8000
- Check CORS configuration
- Verify API endpoints are accessible
