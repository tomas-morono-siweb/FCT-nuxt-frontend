# ⚽ Football Club Management System

A modern, responsive football club management application built with Nuxt.js 3, featuring full CRUD operations for players, coaches, and clubs.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm
- **Backend API** running on http://127.0.0.1:8000

### Installation

Install dependencies:

```bash
# pnpm
pnpm install
```

### Environment Setup

Create a `.env` file (optional):

```bash
API_BASE_URL=http://127.0.0.1:8000
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

## 🏗️ Tech Stack

- **Framework**: Nuxt.js 3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **API**: REST API integration with Symfony backend
- **Icons**: Custom SVG icons
- **Formatting**: Custom utilities for financial data

## 🌟 Features

- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- 🔄 **CRUD Operations**: Full Create, Read, Update, Delete functionality
- 📱 **Mobile First**: Optimized for all device sizes
- 🎯 **Type Safety**: Full TypeScript implementation
- 🔍 **Search & Filter**: Advanced filtering capabilities with debounce
- 💰 **Smart Formatting**: Salary/budget displayed in millions format (e.g., "50M €")
- 🧭 **Smart Navigation**: Hierarchical breadcrumbs with contextual information
- 🎨 **Themed Sections**: Color-coded entities (🔵 Players, 🟢 Coaches, 🟠 Clubs)
- ⚡ **Performance**: Optimized data fetching with caching
- 🔄 **Real-time Updates**: Automatic cache invalidation after operations

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
│   │   │   ├── index.vue     # Club list
│   │   │   ├── new.vue       # Create club
│   │   │   ├── [id].vue      # Club details
│   │   │   └── edit-[id].vue # Edit club
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

## 💰 Data Formatting

The application uses a custom formatting system for financial data:

- **Salaries**: Displayed as "50M €" (50 million euros)
- **Budgets**: Displayed as "500M €" (500 million euros)
- **Input**: Users can type "50M €" and it converts to 50,000,000
- **Output**: All financial values are automatically formatted

## 🧭 Navigation System

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

**Build Issues:**

- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Check Node.js version compatibility

## 🎯 What You'll Find

This is a **football club management application** that allows you to:

- **Manage Players** (🔵 Blue theme) - Create, edit, view player information with salary formatting
- **Manage Coaches** (🟢 Green theme) - Handle coaching staff data with professional details
- **Manage Clubs** (🟠 Orange theme) - Organize club information with budget management

Each section includes full CRUD operations with a modern, responsive interface, smart data formatting, and intuitive navigation.
