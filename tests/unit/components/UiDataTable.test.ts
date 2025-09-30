import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiDataTable from '../../../app/components/ui/DataTable.vue'

// Mock de los componentes hijos que no existen
vi.mock('../../../app/components/ui/LoadingState.vue', () => ({
    default: {
        name: 'UiLoadingState',
        props: ['variant', 'message'],
        template: '<div data-testid="loading-state">{{ message }}</div>'
    }
}))

vi.mock('../../../app/components/ui/ErrorState.vue', () => ({
    default: {
        name: 'UiErrorState',
        props: ['variant', 'message'],
        template: '<div data-testid="error-state">{{ message }}</div>'
    }
}))

describe('UiDataTable', () => {
    const mockColumns = [
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'age', label: 'Edad' }
    ]

    describe('Props', () => {
        it('should render with default props', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            expect(wrapper.props('loading')).toBe(false)
            expect(wrapper.props('error')).toBe(null)
            expect(wrapper.props('loadingMessage')).toBe('Cargando datos...')
        })

        it('should render with custom props', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    loading: true,
                    error: 'Error de conexión',
                    loadingMessage: 'Cargando información...'
                }
            })

            expect(wrapper.props('loading')).toBe(true)
            expect(wrapper.props('error')).toBe('Error de conexión')
            expect(wrapper.props('loadingMessage')).toBe('Cargando información...')
        })
    })

    describe('Desktop Table Rendering', () => {
        it('should render table headers correctly', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            const headers = wrapper.findAll('th')
            expect(headers).toHaveLength(4) // 3 columns + 1 actions column

            // Check column headers
            expect(headers[0].text()).toBe('Nombre')
            expect(headers[1].text()).toBe('Email')
            expect(headers[2].text()).toBe('Edad')
            expect(headers[3].text()).toBe('Acciones')
        })

        it('should render table with correct classes', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            const table = wrapper.find('table')
            expect(table.classes()).toContain('min-w-full')

            const desktopContainer = wrapper.find('.hidden.lg\\:block')
            expect(desktopContainer.exists()).toBe(true)
        })

        it('should render slot content when not loading or error', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                },
                slots: {
                    default: '<tr><td>Test Row</td></tr>'
                }
            })

            expect(wrapper.find('tbody tr').text()).toBe('Test Row')
        })
    })

    describe('Mobile Card Rendering', () => {
        it('should render mobile container with correct classes', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                }
            })

            const mobileContainer = wrapper.find('.lg\\:hidden')
            expect(mobileContainer.exists()).toBe(true)

            const mobileCardsContainer = wrapper.find('.space-y-4.p-4')
            expect(mobileCardsContainer.exists()).toBe(true)
        })

        it('should render mobile slot content when not loading or error', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns
                },
                slots: {
                    mobile: '<div>Mobile Card</div>'
                }
            })

            expect(wrapper.find('.space-y-4.p-4 div').text()).toBe('Mobile Card')
        })
    })

    describe('Loading State', () => {
        it('should show loading state in desktop view', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    loading: true,
                    loadingMessage: 'Cargando jugadores...'
                }
            })

            const loadingState = wrapper.findComponent({ name: 'UiLoadingState' })
            expect(loadingState.exists()).toBe(true)
            expect(loadingState.props('variant')).toBe('table')
            expect(loadingState.props('message')).toBe('Cargando jugadores...')
        })

        it('should show loading state in mobile view', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    loading: true,
                    loadingMessage: 'Cargando entrenadores...'
                }
            })

            const loadingStates = wrapper.findAllComponents({ name: 'UiLoadingState' })
            expect(loadingStates).toHaveLength(2) // Desktop and mobile

            const mobileLoadingState = loadingStates.find(component =>
                component.props('variant') === 'inline'
            )
            expect(mobileLoadingState?.props('message')).toBe('Cargando entrenadores...')
        })

        it('should not render slot content when loading', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    loading: true
                },
                slots: {
                    default: '<tr><td>Should not show</td></tr>',
                    mobile: '<div>Should not show</div>'
                }
            })

            expect(wrapper.find('tbody tr').exists()).toBe(false)
            expect(wrapper.find('.space-y-4.p-4 div').exists()).toBe(false)
        })
    })

    describe('Error State', () => {
        it('should show error state in desktop view', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    error: 'Error al cargar datos'
                }
            })

            const errorState = wrapper.findComponent({ name: 'UiErrorState' })
            expect(errorState.exists()).toBe(true)
            expect(errorState.props('variant')).toBe('table')
            expect(errorState.props('message')).toBe('Error al cargar datos')
        })

        it('should show error state in mobile view', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    error: 'Error de conexión'
                }
            })

            const errorStates = wrapper.findAllComponents({ name: 'UiErrorState' })
            expect(errorStates).toHaveLength(2) // Desktop and mobile

            const mobileErrorState = errorStates.find(component =>
                component.props('variant') === 'inline'
            )
            expect(mobileErrorState?.props('message')).toBe('Error de conexión')
        })

        it('should not render slot content when error', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    error: 'Error message'
                },
                slots: {
                    default: '<tr><td>Should not show</td></tr>',
                    mobile: '<div>Should not show</div>'
                }
            })

            expect(wrapper.find('tbody tr').exists()).toBe(false)
            expect(wrapper.find('.space-y-4.p-4 div').exists()).toBe(false)
        })
    })

    describe('State Priority', () => {
        it('should prioritize loading over error', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    loading: true,
                    error: 'Error message'
                }
            })

            const loadingState = wrapper.findComponent({ name: 'UiLoadingState' })
            const errorState = wrapper.findComponent({ name: 'UiErrorState' })

            expect(loadingState.exists()).toBe(true)
            expect(errorState.exists()).toBe(false)
        })

        it('should show data when neither loading nor error', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: mockColumns,
                    loading: false,
                    error: null
                },
                slots: {
                    default: '<tr><td>Data Row</td></tr>',
                    mobile: '<div>Mobile Data</div>'
                }
            })

            expect(wrapper.findComponent({ name: 'UiLoadingState' }).exists()).toBe(false)
            expect(wrapper.findComponent({ name: 'UiErrorState' }).exists()).toBe(false)
            expect(wrapper.find('tbody tr').text()).toBe('Data Row')
            expect(wrapper.find('.space-y-4.p-4 div').text()).toBe('Mobile Data')
        })
    })

    describe('Column Configuration', () => {
        it('should handle empty columns array', () => {
            const wrapper = mount(UiDataTable, {
                props: {
                    columns: []
                }
            })

            const headers = wrapper.findAll('th')
            expect(headers).toHaveLength(1) // Only actions column
            expect(headers[0].text()).toBe('Acciones')
        })

        it('should handle columns with sortable property', () => {
            const sortableColumns = [
                { key: 'name', label: 'Nombre', sortable: true },
                { key: 'date', label: 'Fecha', sortable: false }
            ]

            const wrapper = mount(UiDataTable, {
                props: {
                    columns: sortableColumns
                }
            })

            const headers = wrapper.findAll('th')
            expect(headers).toHaveLength(3) // 2 columns + 1 actions column
            expect(headers[0].text()).toBe('Nombre')
            expect(headers[1].text()).toBe('Fecha')
        })
    })
})
