import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./app', import.meta.url)),
            '@': fileURLToPath(new URL('./app', import.meta.url))
        }
    },
    test: {
        environment: 'happy-dom',
        globals: true,
        include: [
            'tests/**/*.{test,spec}.{js,ts,vue}',
            'app/**/*.{test,spec}.{js,ts,vue}'
        ],
        exclude: [
            'node_modules',
            'dist',
            '.output',
            'coverage'
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'tests/',
                '**/*.d.ts',
                '**/*.config.*',
                '.output/',
                'coverage/'
            ],
            thresholds: {
                global: {
                    branches: 70,
                    functions: 70,
                    lines: 70,
                    statements: 70
                }
            }
        },
        setupFiles: ['./tests/setup.ts']
    },
})
