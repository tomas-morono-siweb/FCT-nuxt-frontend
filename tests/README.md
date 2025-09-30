# 🧪 Testing Guide

Este proyecto está configurado con **Vitest** para testing unitario y de componentes en Vue/Nuxt.

## 🚀 Comandos Disponibles

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests en modo watch (desarrollo)
pnpm test:watch

# Ejecutar tests una sola vez
pnpm test:run

# Ejecutar tests con cobertura
pnpm test:coverage

# Abrir interfaz visual de tests
pnpm test:ui

# Ejecutar solo tests unitarios
pnpm test:unit

# Ejecutar solo tests de integración
pnpm test:integration
```

## 📁 Estructura de Tests

```
tests/
├── unit/                    # Tests unitarios
│   ├── composables/        # Tests de composables (usePlayers, useCoaches, etc.)
│   ├── utils/              # Tests de funciones utilitarias
│   └── components/         # Tests de componentes individuales
├── integration/            # Tests de integración
│   ├── pages/              # Tests de páginas completas
│   └── flows/              # Tests de flujos de usuario
└── e2e/                    # Tests end-to-end (futuro)
```

## 🎯 Tipos de Tests

### Tests Unitarios

- **Composables**: Funciones como `usePlayers()`, `useCoaches()`, `useClubs()`
- **Utilidades**: Funciones como `formatMillions()`, `parseMillions()`
- **Componentes**: Componentes Vue individuales

### Tests de Integración

- **Páginas**: Funcionalidad completa de páginas
- **Flujos**: Procesos completos de usuario

## 📝 Ejemplos de Tests

### Test de Utilidad

```typescript
// tests/unit/utils/format.test.ts
import { describe, it, expect } from "vitest";
import { formatMillions } from "~/utils/format";

describe("formatMillions", () => {
  it("should format positive numbers correctly", () => {
    expect(formatMillions(1000000)).toBe("1M €");
  });
});
```

### Test de Composable

```typescript
// tests/unit/composables/usePlayers.test.ts
import { describe, it, expect, vi } from "vitest";
import { usePlayers } from "~/composables/usePlayers";

describe("usePlayers", () => {
  it("should fetch players list", async () => {
    const { list } = usePlayers();
    // ... test implementation
  });
});
```

## 🔧 Configuración

- **Vitest**: Configurado en `vitest.config.ts`
- **Setup**: Configuración global en `tests/setup.ts`
- **TypeScript**: Configuración específica en `tests/tsconfig.json`

## 📊 Cobertura de Código

El proyecto tiene umbrales mínimos de cobertura:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## 🎨 Convenciones

1. **Nombres de archivos**: `*.test.ts` o `*.spec.ts`
2. **Estructura**: `describe` → `it` → `expect`
3. **Mocks**: Usar `vi.fn()` para funciones mock
4. **Setup**: Limpiar mocks en `beforeEach`

## 🚀 Próximos Pasos

1. ✅ Configuración básica de Vitest
2. ✅ Tests unitarios para utilidades
3. ✅ Tests unitarios para composables
4. 🔄 Tests de componentes Vue
5. 🔄 Tests de integración
6. 🔄 Tests E2E con Playwright
