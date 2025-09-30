import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CoachCard from '../../../app/components/entities/CoachCard.vue'
import type { Coach } from '../../../app/interfaces/coach'
import type { Club } from '../../../app/interfaces/club'

// Mock de NuxtLink
vi.mock('#app', () => ({
    NuxtLink: {
        name: 'NuxtLink',
        props: ['to'],
        template: '<a :href="to"><slot /></a>'
    }
}))

// Mock de useAsyncData y useClubs
const mockUseAsyncData = vi.fn()
const mockUseClubs = vi.fn()

vi.mock('#app', () => ({
    ...vi.importActual('#app'),
    useAsyncData: mockUseAsyncData,
    useClubs: mockUseClubs
}))

vi.mock('../../../app/composables/useClubs', () => ({
    useClubs: mockUseClubs
}))

describe('CoachCard', () => {
    const mockCoach: Coach = {
        id: 1,
        dni: '12345678A',
        nombre: 'Pep',
        apellidos: 'Guardiola',
        salario: 20000000,
        id_club: 'MCI'
    }

    const mockClubs: Club[] = [
        {
            id: 1,
            id_club: 'MCI',
            nombre: 'Manchester City',
            fundacion: 1880,
            ciudad: 'Manchester',
            estadio: 'Etihad Stadium',
            presupuesto: 500000000,
            presupuesto_restante: 300000000,
            entrenador: 'Pep Guardiola',
            jugadores: []
        }
    ]

    beforeEach(() => {
        vi.clearAllMocks()

        // Mock useClubs
        mockUseClubs.mockReturnValue({
            list: vi.fn().mockResolvedValue({
                data: mockClubs,
                pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
            })
        })

        // Mock useAsyncData
        mockUseAsyncData.mockReturnValue({
            data: { value: { data: mockClubs, pagination: null } },
            pending: { value: false },
            error: { value: null }
        })
    })

    describe('Props and Defaults', () => {
        it('should render with default props', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach
                }
            })

            expect(wrapper.props('variant')).toBe('desktop')
        })

        it('should accept custom props', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            expect(wrapper.props('variant')).toBe('mobile')
        })
    })

    describe('Desktop Variant', () => {
        it('should render desktop table row when variant is desktop', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const tableRow = wrapper.find('tr')
            expect(tableRow.exists()).toBe(true)
            expect(tableRow.classes()).toContain('group')
            expect(tableRow.classes()).toContain('transition-all')
            expect(tableRow.classes()).toContain('duration-200')
            expect(tableRow.classes()).toContain('hover:bg-green-50/30')
        })

        it('should render coach avatar with initials', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const avatar = wrapper.find('.flex.h-10.w-10')
            expect(avatar.exists()).toBe(true)

            const initials = avatar.find('span')
            expect(initials.text()).toBe('PG') // Pep Guardiola
            expect(initials.classes()).toContain('text-sm')
            expect(initials.classes()).toContain('font-semibold')
            expect(initials.classes()).toContain('text-green-700')
        })

        it('should render coach name as link', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.exists()).toBe(true)
            expect(nameLink.text()).toBe('Pep Guardiola')
            expect(nameLink.classes()).toContain('text-sm')
            expect(nameLink.classes()).toContain('font-semibold')
            expect(nameLink.classes()).toContain('text-gray-900')
        })

        it('should render salary badge', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const salaryBadge = wrapper.find('.bg-gray-100')
            expect(salaryBadge.exists()).toBe(true)
            expect(salaryBadge.text()).toBe('20,000,000 €')
            expect(salaryBadge.classes()).toContain('inline-flex')
            expect(salaryBadge.classes()).toContain('items-center')
            expect(salaryBadge.classes()).toContain('rounded-full')
            expect(salaryBadge.classes()).toContain('px-2.5')
            expect(salaryBadge.classes()).toContain('py-0.5')
            expect(salaryBadge.classes()).toContain('text-xs')
            expect(salaryBadge.classes()).toContain('font-medium')
            expect(salaryBadge.classes()).toContain('text-gray-800')
        })

        it('should render club badge with club name', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const clubBadge = wrapper.find('.bg-green-100')
            expect(clubBadge.exists()).toBe(true)
            expect(clubBadge.text()).toBe('Manchester City')
            expect(clubBadge.classes()).toContain('text-green-800')
        })

        it('should render action buttons', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const editButton = wrapper.find('a[href="/coaches/edit-1"]')
            expect(editButton.exists()).toBe(true)
            expect(editButton.text()).toBe('Editar')
            expect(editButton.classes()).toContain('bg-green-600')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.exists()).toBe(true)
            expect(deleteButton.text()).toBe('Borrar')
            expect(deleteButton.classes()).toContain('bg-red-600')
        })
    })

    describe('Mobile Variant', () => {
        it('should render mobile card when variant is mobile', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            const mobileCard = wrapper.find('.mx-4.mb-4')
            expect(mobileCard.exists()).toBe(true)
            expect(mobileCard.classes()).toContain('rounded-xl')
            expect(mobileCard.classes()).toContain('border')
            expect(mobileCard.classes()).toContain('border-secondary-200')
            expect(mobileCard.classes()).toContain('bg-white')
            expect(mobileCard.classes()).toContain('p-6')
            expect(mobileCard.classes()).toContain('shadow-sm')
        })

        it('should render larger avatar for mobile', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            const avatar = wrapper.find('.h-12.w-12')
            expect(avatar.exists()).toBe(true)

            const initials = avatar.find('span')
            expect(initials.text()).toBe('PG')
            expect(initials.classes()).toContain('text-green-600')
        })

        it('should render coach name as link in mobile', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.exists()).toBe(true)
            expect(nameLink.text()).toBe('Pep Guardiola')
            expect(nameLink.classes()).toContain('text-base')
            expect(nameLink.classes()).toContain('font-medium')
        })

        it('should render salary badge in mobile when available', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            const salaryBadge = wrapper.find('.bg-green-100')
            expect(salaryBadge.exists()).toBe(true)
            expect(salaryBadge.text()).toBe('20,000,000 €')
            expect(salaryBadge.classes()).toContain('text-green-800')
        })

        it('should render club information in mobile', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            const clubInfo = wrapper.find('p.text-gray-500')
            expect(clubInfo.exists()).toBe(true)
            expect(clubInfo.text()).toBe('Club: Manchester City')
        })

        it('should render mobile action buttons', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            const editLink = wrapper.find('a[href="/coaches/edit-1"]')
            expect(editLink.exists()).toBe(true)
            expect(editLink.text()).toBe('Editar')
            expect(editLink.classes()).toContain('text-green-600')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.exists()).toBe(true)
            expect(deleteButton.text()).toBe('Borrar')
            expect(deleteButton.classes()).toContain('text-red-600')
        })
    })

    describe('Club Name Resolution', () => {
        it('should show club name when club is found', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const clubBadge = wrapper.find('.bg-green-100')
            expect(clubBadge.text()).toBe('Manchester City')
        })

        it('should show club code when club is not found', () => {
            const coachWithUnknownClub: Coach = {
                ...mockCoach,
                id_club: 'UNKNOWN'
            }

            mockUseAsyncData.mockReturnValue({
                data: { value: { data: mockClubs, pagination: null } },
                pending: { value: false },
                error: { value: null }
            })

            const wrapper = mount(CoachCard, {
                props: {
                    coach: coachWithUnknownClub,
                    variant: 'desktop'
                }
            })

            const clubBadge = wrapper.find('.bg-green-100')
            expect(clubBadge.text()).toBe('UNKNOWN')
        })

        it('should show club code when clubs are loading', () => {
            mockUseAsyncData.mockReturnValue({
                data: { value: null },
                pending: { value: true },
                error: { value: null }
            })

            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const clubBadge = wrapper.find('.bg-green-100')
            expect(clubBadge.text()).toBe('MCI')
        })

        it('should show club code when there is an error loading clubs', () => {
            mockUseAsyncData.mockReturnValue({
                data: { value: null },
                pending: { value: false },
                error: { value: new Error('Failed to load clubs') }
            })

            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const clubBadge = wrapper.find('.bg-green-100')
            expect(clubBadge.text()).toBe('MCI')
        })

        it('should show dash when no club assigned', () => {
            const coachWithoutClub: Coach = {
                ...mockCoach,
                id_club: ''
            }

            const wrapper = mount(CoachCard, {
                props: {
                    coach: coachWithoutClub,
                    variant: 'desktop'
                }
            })

            const clubBadge = wrapper.find('.bg-green-100')
            expect(clubBadge.text()).toBe('-')
        })
    })

    describe('Events', () => {
        it('should emit delete event when delete button is clicked in desktop', async () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const deleteButton = wrapper.find('button')
            await deleteButton.trigger('click')

            expect(wrapper.emitted('delete')).toBeTruthy()
            expect(wrapper.emitted('delete')?.[0]).toEqual([1])
        })

        it('should emit delete event when delete button is clicked in mobile', async () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            const deleteButton = wrapper.find('button')
            await deleteButton.trigger('click')

            expect(wrapper.emitted('delete')).toBeTruthy()
            expect(wrapper.emitted('delete')?.[0]).toEqual([1])
        })
    })

    describe('Edge Cases', () => {
        it('should handle coach without salary', () => {
            const coachWithoutSalary: Coach = {
                ...mockCoach,
                salario: 0
            }

            const wrapper = mount(CoachCard, {
                props: {
                    coach: coachWithoutSalary,
                    variant: 'desktop'
                }
            })

            const salaryBadge = wrapper.find('.bg-gray-100')
            expect(salaryBadge.text()).toBe('-')
        })

        it('should handle coach without salary in mobile', () => {
            const coachWithoutSalary: Coach = {
                ...mockCoach,
                salario: 0
            }

            const wrapper = mount(CoachCard, {
                props: {
                    coach: coachWithoutSalary,
                    variant: 'mobile'
                }
            })

            const salaryBadge = wrapper.find('.bg-green-100')
            expect(salaryBadge.exists()).toBe(false)
        })

        it('should handle coach without club in mobile', () => {
            const coachWithoutClub: Coach = {
                ...mockCoach,
                id_club: ''
            }

            const wrapper = mount(CoachCard, {
                props: {
                    coach: coachWithoutClub,
                    variant: 'mobile'
                }
            })

            const clubInfo = wrapper.find('p.text-gray-500')
            expect(clubInfo.exists()).toBe(false)
        })

        it('should handle coach with long names', () => {
            const coachWithLongName: Coach = {
                ...mockCoach,
                nombre: 'José',
                apellidos: 'Mourinho dos Santos'
            }

            const wrapper = mount(CoachCard, {
                props: {
                    coach: coachWithLongName,
                    variant: 'desktop'
                }
            })

            const initials = wrapper.find('.text-green-700')
            expect(initials.text()).toBe('JM') // José Mourinho
        })

        it('should handle coach with special characters in name', () => {
            const coachWithSpecialChars: Coach = {
                ...mockCoach,
                nombre: 'José',
                apellidos: 'María'
            }

            const wrapper = mount(CoachCard, {
                props: {
                    coach: coachWithSpecialChars,
                    variant: 'desktop'
                }
            })

            const initials = wrapper.find('.text-green-700')
            expect(initials.text()).toBe('JM')
        })

        it('should format large salary numbers correctly', () => {
            const coachWithLargeSalary: Coach = {
                ...mockCoach,
                salario: 50000000
            }

            const wrapper = mount(CoachCard, {
                props: {
                    coach: coachWithLargeSalary,
                    variant: 'desktop'
                }
            })

            const salaryBadge = wrapper.find('.bg-gray-100')
            expect(salaryBadge.text()).toBe('50,000,000 €')
        })
    })

    describe('Accessibility', () => {
        it('should have proper link attributes', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.exists()).toBe(true)

            const editLink = wrapper.find('a[href="/coaches/edit-1"]')
            expect(editLink.exists()).toBe(true)
        })

        it('should have proper button attributes', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const deleteButton = wrapper.find('button')
            expect(deleteButton.exists()).toBe(true)
            expect(deleteButton.text()).toBe('Borrar')
        })
    })

    describe('Styling and Classes', () => {
        it('should have correct hover effects in desktop', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            const tableRow = wrapper.find('tr')
            expect(tableRow.classes()).toContain('hover:bg-green-50/30')

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.classes()).toContain('hover:text-green-600')
        })

        it('should have correct hover effects in mobile', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.classes()).toContain('hover:text-blue-600')

            const editLink = wrapper.find('a[href="/coaches/edit-1"]')
            expect(editLink.classes()).toContain('hover:text-green-900')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.classes()).toContain('hover:text-red-900')
        })

        it('should have correct mobile card hover effects', () => {
            const wrapper = mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'mobile'
                }
            })

            const mobileCard = wrapper.find('.mx-4.mb-4')
            expect(mobileCard.classes()).toContain('hover:shadow-md')
        })
    })

    describe('Data Loading Integration', () => {
        it('should call useAsyncData with correct parameters', () => {
            mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            expect(mockUseAsyncData).toHaveBeenCalledWith(
                'clubs-shared',
                expect.any(Function)
            )
        })

        it('should call useClubs list method', () => {
            mount(CoachCard, {
                props: {
                    coach: mockCoach,
                    variant: 'desktop'
                }
            })

            expect(mockUseClubs).toHaveBeenCalled()
        })
    })
})
