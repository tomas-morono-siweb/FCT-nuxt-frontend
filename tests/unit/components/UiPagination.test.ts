import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiPagination from '../../../app/components/ui/Pagination.vue'

describe('UiPagination', () => {
    const defaultProps = {
        currentPage: 1,
        totalPages: 10,
        totalItems: 100,
        itemsPerPage: 10
    }

    describe('Props', () => {
        it('should render with default props', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            expect(wrapper.props('showInfo')).toBe(true)
            expect(wrapper.props('color')).toBe('blue')
        })

        it('should render with custom props', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    showInfo: false,
                    color: 'green'
                }
            })

            expect(wrapper.props('showInfo')).toBe(false)
            expect(wrapper.props('color')).toBe('green')
        })
    })

    describe('Page Information Display', () => {
        it('should calculate and display correct item range', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 3,
                    totalPages: 10,
                    totalItems: 95,
                    itemsPerPage: 10
                }
            })

            // Should show "Mostrando 21 a 30 de 95 resultados"
            expect(wrapper.text()).toContain('Mostrando')
            expect(wrapper.text()).toContain('21')
            expect(wrapper.text()).toContain('30')
            expect(wrapper.text()).toContain('95')
        })

        it('should handle last page correctly', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 10,
                    totalPages: 10,
                    totalItems: 95,
                    itemsPerPage: 10
                }
            })

            // Should show "Mostrando 91 a 95 de 95 resultados"
            expect(wrapper.text()).toContain('91')
            expect(wrapper.text()).toContain('95')
        })

        it('should hide info when showInfo is false', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    showInfo: false
                }
            })

            const infoElements = wrapper.findAll('.text-secondary-600')
            expect(infoElements).toHaveLength(0)
        })
    })

    describe('Navigation Buttons', () => {
        it('should disable previous button on first page', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 1
                }
            })

            const prevButton = wrapper.find('button:first-child')
            expect(prevButton.attributes('disabled')).toBeDefined()
        })

        it('should disable next button on last page', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 10,
                    totalPages: 10
                }
            })

            const nextButton = wrapper.find('button:last-child')
            expect(nextButton.attributes('disabled')).toBeDefined()
        })

        it('should enable navigation buttons on middle pages', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 5
                }
            })

            const prevButton = wrapper.find('button:first-child')
            const nextButton = wrapper.find('button:last-child')

            expect(prevButton.attributes('disabled')).toBeUndefined()
            expect(nextButton.attributes('disabled')).toBeUndefined()
        })
    })

    describe('Page Numbers Display', () => {
        it('should show all pages when total pages <= 5', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    totalPages: 3
                }
            })

            const pageButtons = wrapper.findAll('button').filter(button =>
                !button.attributes('aria-label')
            )
            expect(pageButtons).toHaveLength(3)
        })

        it('should show ellipsis for large page counts', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 5,
                    totalPages: 20
                }
            })

            expect(wrapper.text()).toContain('...')
        })

        it('should highlight current page', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 3
                }
            })

            const currentPageButton = wrapper.find('button:not([aria-label])')
            expect(currentPageButton.classes()).toContain('bg-blue-600')
        })
    })

    describe('Color Themes', () => {
        it('should apply blue theme correctly', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    color: 'blue'
                }
            })

            const currentPageButton = wrapper.find('button:not([aria-label])')
            expect(currentPageButton.classes()).toContain('bg-blue-600')
        })

        it('should apply green theme correctly', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    color: 'green'
                }
            })

            const currentPageButton = wrapper.find('button:not([aria-label])')
            expect(currentPageButton.classes()).toContain('bg-green-600')
        })

        it('should apply orange theme correctly', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    color: 'orange'
                }
            })

            const currentPageButton = wrapper.find('button:not([aria-label])')
            expect(currentPageButton.classes()).toContain('bg-orange-600')
        })

        it('should apply gray theme correctly', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    color: 'gray'
                }
            })

            const currentPageButton = wrapper.find('button:not([aria-label])')
            expect(currentPageButton.classes()).toContain('bg-gray-600')
        })
    })

    describe('Events', () => {
        it('should emit page-change when clicking page number', async () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const pageButton = wrapper.find('button:not([aria-label])')
            await pageButton.trigger('click')

            expect(wrapper.emitted('page-change')).toBeTruthy()
            expect(wrapper.emitted('page-change')?.[0]).toEqual([1])
        })

        it('should emit page-change when clicking next button', async () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 1
                }
            })

            const nextButton = wrapper.find('button:last-child')
            await nextButton.trigger('click')

            expect(wrapper.emitted('page-change')).toBeTruthy()
            expect(wrapper.emitted('page-change')?.[0]).toEqual([2])
        })

        it('should emit page-change when clicking previous button', async () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 2
                }
            })

            const prevButton = wrapper.find('button:first-child')
            await prevButton.trigger('click')

            expect(wrapper.emitted('page-change')).toBeTruthy()
            expect(wrapper.emitted('page-change')?.[0]).toEqual([1])
        })

        it('should not emit page-change when clicking disabled buttons', async () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 1
                }
            })

            const prevButton = wrapper.find('button:first-child')
            await prevButton.trigger('click')

            expect(wrapper.emitted('page-change')).toBeFalsy()
        })

        it('should not emit page-change when clicking current page', async () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 1
                }
            })

            // Buscar el botón de la página actual (página 1)
            const pageButtons = wrapper.findAll('button').filter(button =>
                button.text() === '1'
            )
            if (pageButtons.length > 0) {
                await pageButtons[0].trigger('click')
                expect(wrapper.emitted('page-change')).toBeFalsy()
            }
        })
    })

    describe('Mobile View', () => {
        it('should show mobile navigation buttons', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const mobileButtons = wrapper.findAll('.sm\\:hidden button')
            expect(mobileButtons).toHaveLength(2) // Previous and Next
        })

        it('should show mobile info text', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const mobileInfo = wrapper.find('.sm\\:hidden .text-secondary-600')
            expect(mobileInfo.exists()).toBe(true)
        })
    })

    describe('Edge Cases', () => {
        it('should handle single page', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 1,
                    totalPages: 1,
                    totalItems: 5,
                    itemsPerPage: 10
                }
            })

            const pageButtons = wrapper.findAll('button:not([aria-label])')
            expect(pageButtons).toHaveLength(1)
            expect(wrapper.text()).toContain('Mostrando 1 a 5 de 5 resultados')
        })

        it('should handle zero items', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 1,
                    totalPages: 0,
                    totalItems: 0,
                    itemsPerPage: 10
                }
            })

            expect(wrapper.text()).toContain('Mostrando 1 a 0 de 0 resultados')
        })

        it('should handle large page numbers', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 100,
                    totalPages: 1000,
                    totalItems: 10000,
                    itemsPerPage: 10
                }
            })

            expect(wrapper.text()).toContain('Mostrando 991 a 1000 de 10000 resultados')
        })
    })
})
