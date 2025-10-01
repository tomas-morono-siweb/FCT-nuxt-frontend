import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
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
