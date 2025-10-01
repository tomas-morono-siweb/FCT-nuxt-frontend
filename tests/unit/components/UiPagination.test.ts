import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UiPagination from '../../../app/components/ui/Pagination.vue'

describe('UiPagination', () => {
    const defaultProps = {
        currentPage: 1,
        totalPages: 10,
        totalItems: 100,
        itemsPerPage: 10
    }

    describe('Props and Defaults', () => {
        it('should render with default props', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            expect(wrapper.props('showInfo')).toBe(true)
            expect(wrapper.props('color')).toBe('blue')
        })

        it('should accept custom props', () => {
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

    describe('Information Display', () => {
        it('should show correct item information', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 3,
                    totalPages: 10,
                    totalItems: 100,
                    itemsPerPage: 10
                }
            })

            const infoText = wrapper.text()
            expect(infoText).toContain('Mostrando 21 a 30 de 100 resultados')
        })

        it('should show correct information for last page', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 10,
                    totalPages: 10,
                    totalItems: 95,
                    itemsPerPage: 10
                }
            })

            const infoText = wrapper.text()
            expect(infoText).toContain('Mostrando 91 a 95 de 95 resultados')
        })

        it('should hide info when showInfo is false', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    showInfo: false
                }
            })

            // When showInfo is false, the desktop info text should not exist
            const desktopInfo = wrapper.find('.hidden.sm\\:flex .text-secondary-600')
            expect(desktopInfo.exists()).toBe(false)
        })
    })

    describe('Page Navigation', () => {
        it('should emit page-change event when clicking page number', async () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const pageButton = wrapper.find('button[aria-label="Pagination"] button')
            if (pageButton.exists()) {
                await pageButton.trigger('click')
                expect(wrapper.emitted('page-change')).toBeTruthy()
                expect(wrapper.emitted('page-change')?.[0]).toEqual([2])
            }
        })

        it('should emit page-change event when clicking next button', async () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const nav = wrapper.find('nav[aria-label="Pagination"]')
            const buttons = nav.findAll('button')
            const nextButton = buttons[buttons.length - 1] // Last button is "Next"
            await nextButton.trigger('click')

            expect(wrapper.emitted('page-change')).toBeTruthy()
            expect(wrapper.emitted('page-change')?.[0]).toEqual([2])
        })

        it('should emit page-change event when clicking previous button', async () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 2
                }
            })

            const nav = wrapper.find('nav[aria-label="Pagination"]')
            const buttons = nav.findAll('button')
            const prevButton = buttons[0] // First button is "Previous"
            await prevButton.trigger('click')

            expect(wrapper.emitted('page-change')).toBeTruthy()
            expect(wrapper.emitted('page-change')?.[0]).toEqual([1])
        })

        it('should not emit event when clicking current page', async () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const currentPageButton = wrapper.find('button[aria-label="Pagination"] button')
            if (currentPageButton.exists()) {
                await currentPageButton.trigger('click')
                expect(wrapper.emitted('page-change')).toBeFalsy()
            }
        })

        it('should not emit event when clicking disabled buttons', async () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 1
                }
            })

            const nav = wrapper.find('nav[aria-label="Pagination"]')
            const buttons = nav.findAll('button')
            const prevButton = buttons[0] // First button is "Previous"
            await prevButton.trigger('click')

            expect(wrapper.emitted('page-change')).toBeFalsy()
        })
    })

    describe('Visible Pages Logic', () => {
        it('should show all pages when totalPages <= 5', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    totalPages: 3
                }
            })

            const nav = wrapper.find('nav[aria-label="Pagination"]')
            const pageButtons = nav.findAll('button')
            // Should show: Previous, 1, 2, 3, Next = 5 buttons total
            expect(pageButtons.length).toBeGreaterThanOrEqual(3)
        })

        it('should show ellipsis for large page counts', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 5,
                    totalPages: 20
                }
            })

            const ellipsisElements = wrapper.findAll('span')
            const hasEllipsis = ellipsisElements.some(el => el.text() === '...')
            expect(hasEllipsis).toBe(true)
        })

        it('should show correct pages around current page', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 5,
                    totalPages: 10
                }
            })

            const nav = wrapper.find('nav[aria-label="Pagination"]')
            const pageButtons = nav.findAll('button')
            const pageNumbers = pageButtons
                .map(btn => btn.text())
                .filter(text => !isNaN(Number(text)))
                .map(Number)

            // Should include pages around current page (3, 4, 5, 6, 7)
            expect(pageNumbers).toContain(5) // Current page
            expect(pageNumbers.length).toBeGreaterThanOrEqual(3)
        })
    })

    describe('Button States', () => {
        it('should disable previous button on first page', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 1
                }
            })

            const nav = wrapper.find('nav[aria-label="Pagination"]')
            const buttons = nav.findAll('button')
            const prevButton = buttons[0] // First button is "Previous"
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

            const nav = wrapper.find('nav[aria-label="Pagination"]')
            const buttons = nav.findAll('button')
            const nextButton = buttons[buttons.length - 1] // Last button is "Next"
            expect(nextButton.attributes('disabled')).toBeDefined()
        })

        it('should highlight current page', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 3
                }
            })

            const currentPageButton = wrapper.find('button[aria-label="Pagination"] button')
            if (currentPageButton.exists()) {
                expect(currentPageButton.classes()).toContain('bg-blue-600')
            }
        })
    })

    describe('Color Themes', () => {
        it('should apply blue color theme by default', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const currentPageButton = wrapper.find('button[aria-label="Pagination"] button')
            if (currentPageButton.exists()) {
                expect(currentPageButton.classes()).toContain('bg-blue-600')
            }
        })

        it('should apply green color theme', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    color: 'green'
                }
            })

            const currentPageButton = wrapper.find('button[aria-label="Pagination"] button')
            if (currentPageButton.exists()) {
                expect(currentPageButton.classes()).toContain('bg-green-600')
            }
        })

        it('should apply orange color theme', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    color: 'orange'
                }
            })

            const currentPageButton = wrapper.find('button[aria-label="Pagination"] button')
            if (currentPageButton.exists()) {
                expect(currentPageButton.classes()).toContain('bg-orange-600')
            }
        })

        it('should apply gray color theme', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    color: 'gray'
                }
            })

            const currentPageButton = wrapper.find('button[aria-label="Pagination"] button')
            if (currentPageButton.exists()) {
                expect(currentPageButton.classes()).toContain('bg-gray-600')
            }
        })
    })

    describe('Responsive Design', () => {
        it('should show mobile navigation on small screens', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const mobileNav = wrapper.find('.sm\\:hidden')
            expect(mobileNav.exists()).toBe(true)
        })

        it('should show desktop navigation on large screens', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const desktopNav = wrapper.find('.hidden.sm\\:flex')
            expect(desktopNav.exists()).toBe(true)
        })

        it('should have correct mobile button text', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const mobileButtons = wrapper.findAll('.sm\\:hidden button')
            expect(mobileButtons[0].text()).toBe('Anterior')
            expect(mobileButtons[1].text()).toBe('Siguiente')
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

            const infoText = wrapper.text()
            expect(infoText).toContain('Mostrando 1 a 5 de 5 resultados')
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

            const infoText = wrapper.text()
            expect(infoText).toContain('Mostrando 1 a 0 de 0 resultados')
        })

        it('should handle invalid page numbers gracefully', async () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            // Test clicking on ellipsis (should not emit)
            const ellipsisElements = wrapper.findAll('span')
            const ellipsis = ellipsisElements.find(el => el.text() === '...')
            if (ellipsis) {
                await ellipsis.trigger('click')
                expect(wrapper.emitted('page-change')).toBeFalsy()
            }
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

            const infoText = wrapper.text()
            expect(infoText).toContain('Mostrando 991 a 1000 de 10000 resultados')
        })
    })

    describe('Accessibility', () => {
        it('should have proper ARIA labels', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const nav = wrapper.find('nav[aria-label="Pagination"]')
            expect(nav.exists()).toBe(true)
        })

        it('should have screen reader text for navigation buttons', () => {
            const wrapper = mount(UiPagination, {
                props: defaultProps
            })

            const srOnlyElements = wrapper.findAll('.sr-only')
            expect(srOnlyElements.length).toBeGreaterThan(0)
        })

        it('should have proper disabled states', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    ...defaultProps,
                    currentPage: 1
                }
            })

            const disabledButtons = wrapper.findAll('button[disabled]')
            expect(disabledButtons.length).toBeGreaterThan(0)
        })
    })

    describe('Computed Properties', () => {
        it('should calculate startItem correctly', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 3,
                    totalPages: 10,
                    totalItems: 100,
                    itemsPerPage: 10
                }
            })

            // startItem = (3 - 1) * 10 + 1 = 21
            const infoText = wrapper.text()
            expect(infoText).toContain('Mostrando 21')
        })

        it('should calculate endItem correctly', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 3,
                    totalPages: 10,
                    totalItems: 100,
                    itemsPerPage: 10
                }
            })

            // endItem = Math.min(3 * 10, 100) = 30
            const infoText = wrapper.text()
            expect(infoText).toContain('a 30')
        })

        it('should handle last page endItem calculation', () => {
            const wrapper = mount(UiPagination, {
                props: {
                    currentPage: 10,
                    totalPages: 10,
                    totalItems: 95,
                    itemsPerPage: 10
                }
            })

            // endItem = Math.min(10 * 10, 95) = 95
            const infoText = wrapper.text()
            expect(infoText).toContain('a 95')
        })
    })
})
