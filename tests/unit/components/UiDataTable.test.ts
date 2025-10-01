import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiDataTable from '../../../app/components/ui/DataTable.vue'

describe('UiDataTable', () => {
    const mockColumns = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Nombre', sortable: false },
        { key: 'email', label: 'Email', sortable: true }
    ]

    const mountWithComponents = (props: any, options: any = {}) => {
        return mount(UiDataTable, {
            props,
            global: {
                stubs: {
                    UiLoadingState: {
                        name: 'UiLoadingState',
                        props: ['variant', 'message'],
                        template: '<div class="loading-state">Loading: {{ message }}</div>'
                    },
                    UiErrorState: {
                        name: 'UiErrorState',
                        props: ['variant', 'message'],
                        template: '<div class="error-state">Error: {{ message }}</div>'
                    }
                }
            },
            ...options
        })
    }

    describe('Props and Defaults', () => {
        it('should render with default props', () => {
            const wrapper = mountWithComponents({
                columns: mockColumns
            })

            expect(wrapper.props('loading')).toBe(false)
            expect(wrapper.props('error')).toBeUndefined()
            expect(wrapper.props('loadingMessage')).toBe('Cargando datos...')
        })

        it('should accept custom props', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    loading: true,
                    error: 'Error de conexión',
                    loadingMessage: 'Cargando usuarios...'
                }
            })

            expect(wrapper.props('loading')).toBe(true)
            expect(wrapper.props('error')).toBe('Error de conexión')
            expect(wrapper.props('loadingMessage')).toBe('Cargando usuarios...')
        })
    })

    describe('Column Rendering', () => {
        it('should render all columns in desktop view', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            const desktopTable = wrapper.find('.hidden.lg\\:block table')
            expect(desktopTable.exists()).toBe(true)

            const headers = desktopTable.findAll('th')
            expect(headers).toHaveLength(4) // 3 columns + 1 actions column

            // Verificar que se renderizan las columnas correctas
            expect(headers[0].text()).toBe('ID')
            expect(headers[1].text()).toBe('Nombre')
            expect(headers[2].text()).toBe('Email')
            expect(headers[3].text()).toBe('Acciones')
        })

        it('should render columns with correct classes', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            const headers = wrapper.findAll('th')
            headers.forEach(header => {
                expect(header.classes()).toContain('px-6')
                expect(header.classes()).toContain('py-4')
                expect(header.classes()).toContain('text-xs')
                expect(header.classes()).toContain('font-semibold')
            })
        })

        it('should handle empty columns array', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: []
                }
            })

            const headers = wrapper.findAll('th')
            expect(headers).toHaveLength(1) // Solo la columna de acciones
            expect(headers[0].text()).toBe('Acciones')
        })
    })

    describe('Loading State', () => {
        it('should show loading state in desktop view', () => {
            const wrapper = mountWithComponents({
                columns: mockColumns,
                loading: true,
                loadingMessage: 'Cargando datos...'
            })

            const loadingState = wrapper.findComponent({ name: 'UiLoadingState' })
            expect(loadingState.exists()).toBe(true)
            expect(loadingState.props('variant')).toBe('table')
            expect(loadingState.props('message')).toBe('Cargando datos...')
        })

        it('should show loading state in mobile view', () => {
            const wrapper = mountWithComponents({
                columns: mockColumns,
                loading: true,
                loadingMessage: 'Cargando datos...'
            })

            const mobileLoadingState = wrapper.findAllComponents({ name: 'UiLoadingState' })
            expect(mobileLoadingState).toHaveLength(2) // Desktop + Mobile

            const mobileState = mobileLoadingState.find(comp => comp.props('variant') === 'inline')
            expect(mobileState?.props('message')).toBe('Cargando datos...')
        })

        it('should not render data when loading', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    loading: true
                },
                slots: {
                    default: '<tr><td>Test Data</td></tr>'
                }
            })

            const dataRows = wrapper.findAll('tbody tr')
            expect(dataRows).toHaveLength(0) // No debería renderizar datos cuando está cargando
        })
    })

    describe('Error State', () => {
        it('should show error state in desktop view', () => {
            const wrapper = mountWithComponents({
                columns: mockColumns,
                error: 'Error de conexión'
            })

            const errorState = wrapper.findComponent({ name: 'UiErrorState' })
            expect(errorState.exists()).toBe(true)
            expect(errorState.props('variant')).toBe('table')
            expect(errorState.props('message')).toBe('Error de conexión')
        })

        it('should show error state in mobile view', () => {
            const wrapper = mountWithComponents({
                columns: mockColumns,
                error: 'Error de conexión'
            })

            const mobileErrorState = wrapper.findAllComponents({ name: 'UiErrorState' })
            expect(mobileErrorState).toHaveLength(2) // Desktop + Mobile

            const mobileState = mobileErrorState.find(comp => comp.props('variant') === 'inline')
            expect(mobileState?.props('message')).toBe('Error de conexión')
        })

        it('should not render data when error', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    error: 'Error de conexión'
                },
                slots: {
                    default: '<tr><td>Test Data</td></tr>'
                }
            })

            const dataRows = wrapper.findAll('tbody tr')
            expect(dataRows).toHaveLength(0) // No debería renderizar datos cuando hay error
        })
    })

    describe('Data Rendering', () => {
        it('should render default slot content when not loading and no error', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                },
                slots: {
                    default: '<tr><td>Test Row</td></tr>'
                }
            })

            const dataRows = wrapper.findAll('tbody tr')
            expect(dataRows).toHaveLength(1)
            expect(dataRows[0].text()).toBe('Test Row')
        })

        it('should render mobile slot content when not loading and no error', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                },
                slots: {
                    mobile: '<div>Mobile Card</div>'
                }
            })

            const mobileCards = wrapper.findAll('.lg\\:hidden .space-y-4 div')
            expect(mobileCards).toHaveLength(1)
            expect(mobileCards[0].text()).toBe('Mobile Card')
        })

        it('should render both desktop and mobile content', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                },
                slots: {
                    default: '<tr><td>Desktop Row</td></tr>',
                    mobile: '<div>Mobile Card</div>'
                }
            })

            const desktopRows = wrapper.findAll('.hidden.lg\\:block tbody tr')
            const mobileCards = wrapper.findAll('.lg\\:hidden .space-y-4 div')

            expect(desktopRows).toHaveLength(1)
            expect(mobileCards).toHaveLength(1)
            expect(desktopRows[0].text()).toBe('Desktop Row')
            expect(mobileCards[0].text()).toBe('Mobile Card')
        })
    })

    describe('Responsive Design', () => {
        it('should have correct responsive classes', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            // Desktop view should be hidden on small screens
            const desktopView = wrapper.find('.hidden.lg\\:block')
            expect(desktopView.exists()).toBe(true)

            // Mobile view should be hidden on large screens
            const mobileView = wrapper.find('.lg\\:hidden')
            expect(mobileView.exists()).toBe(true)
        })

        it('should have overflow-x-auto for horizontal scrolling', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            const overflowContainer = wrapper.find('.overflow-x-auto')
            expect(overflowContainer.exists()).toBe(true)
        })
    })

    describe('Table Structure', () => {
        it('should have correct table classes', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            const table = wrapper.find('table')
            expect(table.classes()).toContain('min-w-full')
        })

        it('should have correct thead structure', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            const thead = wrapper.find('thead')
            expect(thead.exists()).toBe(true)

            const headerRow = thead.find('tr')
            expect(headerRow.classes()).toContain('border-b')
            expect(headerRow.classes()).toContain('border-gray-100')
        })

        it('should have correct tbody structure', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            const tbody = wrapper.find('tbody')
            expect(tbody.exists()).toBe(true)
            expect(tbody.classes()).toContain('divide-y')
            expect(tbody.classes()).toContain('divide-gray-50')
        })
    })

    describe('Edge Cases', () => {
        it('should handle undefined error prop', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    error: undefined
                }
            })

            expect(wrapper.props('error')).toBeUndefined()
            // No debería mostrar estado de error
            const errorStates = wrapper.findAllComponents({ name: 'UiErrorState' })
            expect(errorStates).toHaveLength(0)
        })

        it('should handle empty string error', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    error: ''
                }
            })

            // Error vacío no debería mostrar estado de error
            const errorStates = wrapper.findAllComponents({ name: 'UiErrorState' })
            expect(errorStates).toHaveLength(0)
        })

        it('should prioritize loading over error state', () => {
            const wrapper = mountWithComponents({
                columns: mockColumns,
                loading: true,
                error: 'Error de conexión'
            })

            // Cuando está cargando, no debería mostrar error
            const errorStates = wrapper.findAllComponents({ name: 'UiErrorState' })
            expect(errorStates).toHaveLength(0)

            const loadingStates = wrapper.findAllComponents({ name: 'UiLoadingState' })
            expect(loadingStates.length).toBeGreaterThan(0)
        })
    })
})
