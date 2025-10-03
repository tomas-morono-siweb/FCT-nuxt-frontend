import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CoachCard from '../../../app/components/entities/CoachCard.vue'
import type { Coach } from '../../../app/interfaces/coach'

describe('CoachCard', () => {
    const mockCoach: Coach = {
        id: 1,
        dni: '12345678A',
        nombre: 'Pep',
        apellidos: 'Guardiola',
        salario: 20000000,
        id_club: 'MCI'
    }

    const NuxtLinkStub = {
        name: 'NuxtLink',
        props: ['to'],
        template: '<a :href="to"><slot /></a>'
    }

    const mountComponent = (props: any) => {
        return mount(CoachCard, {
            props,
            global: {
                stubs: {
                    NuxtLink: NuxtLinkStub
                }
            }
        })
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Props and Defaults', () => {
        it('should render with default props', () => {
            const wrapper = mountComponent({
                coach: mockCoach
            })

            expect(wrapper.props('variant')).toBe('desktop')
        })

        it('should accept custom props', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
            })

            expect(wrapper.props('variant')).toBe('mobile')
        })
    })

    describe('Desktop Variant', () => {
        it('should render desktop table row when variant is desktop', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            // Debug: ver qué se está renderizando
            // console.log(wrapper.html())

            const tableRow = wrapper.find('tr')
            expect(tableRow.exists()).toBe(true)

            if (tableRow.exists()) {
                expect(tableRow.classes()).toContain('group')
                expect(tableRow.classes()).toContain('transition-all')
                expect(tableRow.classes()).toContain('duration-200')
                expect(tableRow.classes()).toContain('hover:bg-green-50/30')
            }
        })

        it('should render coach avatar with initials', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            const avatar = wrapper.find('.flex.h-10.w-10')
            expect(avatar.exists()).toBe(true)

            if (avatar.exists()) {
                const initials = avatar.find('span')
                expect(initials.text()).toBe('PG') // Pep Guardiola
                expect(initials.classes()).toContain('text-sm')
                expect(initials.classes()).toContain('font-semibold')
                expect(initials.classes()).toContain('text-green-700')
            }
        })

        it('should render coach name as link', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.exists()).toBe(true)
            expect(nameLink.text()).toBe('Pep Guardiola')
            expect(nameLink.classes()).toContain('text-sm')
            expect(nameLink.classes()).toContain('font-semibold')
            expect(nameLink.classes()).toContain('text-gray-900')
        })

        it('should render salary badge', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            const salaryBadge = wrapper.find('.bg-gray-100')
            expect(salaryBadge.exists()).toBe(true)
            expect(salaryBadge.text()).toBe('20.000.000 €')
            expect(salaryBadge.classes()).toContain('inline-flex')
            expect(salaryBadge.classes()).toContain('items-center')
            expect(salaryBadge.classes()).toContain('rounded-full')
            expect(salaryBadge.classes()).toContain('px-2.5')
            expect(salaryBadge.classes()).toContain('py-0.5')
            expect(salaryBadge.classes()).toContain('text-xs')
            expect(salaryBadge.classes()).toContain('font-medium')
            expect(salaryBadge.classes()).toContain('text-gray-800')
        })

        it('should render club badge with club code', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            // Buscar específicamente el badge de club (tercer td -> span)
            const clubBadges = wrapper.findAll('.bg-green-100')
            const clubBadge = clubBadges[1] // El segundo es el club badge (primero es avatar)
            expect(clubBadge.exists()).toBe(true)
            expect(clubBadge.text()).toBe('MCI')
            expect(clubBadge.classes()).toContain('text-green-800')
        })

        it('should render action buttons', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
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
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
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
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
            })

            const avatar = wrapper.find('.h-12.w-12')
            expect(avatar.exists()).toBe(true)

            const initials = avatar.find('span')
            expect(initials.text()).toBe('PG')
            expect(initials.classes()).toContain('text-green-600')
        })

        it('should render coach name as link in mobile', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
            })

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.exists()).toBe(true)
            expect(nameLink.text()).toBe('Pep Guardiola')
            expect(nameLink.classes()).toContain('text-base')
            expect(nameLink.classes()).toContain('font-medium')
        })

        it('should render salary badge in mobile when available', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
            })

            const salaryBadge = wrapper.find('span.bg-green-100.text-green-800')
            expect(salaryBadge.exists()).toBe(true)
            expect(salaryBadge.text()).toBe('20.000.000 €')
            expect(salaryBadge.classes()).toContain('text-green-800')
        })

        it('should render club information in mobile', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
            })

            const clubInfo = wrapper.find('p.text-gray-500')
            expect(clubInfo.exists()).toBe(true)
            expect(clubInfo.text()).toBe('Club: MCI')
        })

        it('should render mobile action buttons', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
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

    describe('Club Code Display', () => {
        it('should show club code', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            const clubBadges = wrapper.findAll('.bg-green-100')
            expect(clubBadges[1].text()).toBe('MCI')
        })

        it('should show unknown club code', () => {
            const coachWithUnknownClub: Coach = {
                ...mockCoach,
                id_club: 'UNKNOWN'
            }

            const wrapper = mountComponent({
                coach: coachWithUnknownClub,
                variant: 'desktop'
            })

            const clubBadges = wrapper.findAll('.bg-green-100')
            expect(clubBadges[1].text()).toBe('UNKNOWN')
        })

        it('should show dash when no club assigned', () => {
            const coachWithoutClub: Coach = {
                ...mockCoach,
                id_club: ''
            }

            const wrapper = mountComponent({
                coach: coachWithoutClub,
                variant: 'desktop'
            })

            const clubBadges = wrapper.findAll('.bg-green-100')
            expect(clubBadges[1].text()).toBe('-')
        })
    })

    describe('Events', () => {
        it('should emit delete event when delete button is clicked in desktop', async () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            const deleteButton = wrapper.find('button')
            await deleteButton.trigger('click')

            expect(wrapper.emitted('delete')).toBeTruthy()
            expect(wrapper.emitted('delete')?.[0]).toEqual([1])
        })

        it('should emit delete event when delete button is clicked in mobile', async () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
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

            const wrapper = mountComponent({
                coach: coachWithoutSalary,
                variant: 'desktop'
            })

            const salaryBadge = wrapper.find('.bg-gray-100')
            expect(salaryBadge.text()).toBe('-')
        })

        it('should handle coach without salary in mobile', () => {
            const coachWithoutSalary: Coach = {
                ...mockCoach,
                salario: 0
            }

            const wrapper = mountComponent({
                coach: coachWithoutSalary,
                variant: 'mobile'
            })

            const salaryBadge = wrapper.find('span.bg-green-100.text-green-800')
            expect(salaryBadge.exists()).toBe(false)
        })

        it('should handle coach without club in mobile', () => {
            const coachWithoutClub: Coach = {
                ...mockCoach,
                id_club: ''
            }

            const wrapper = mountComponent({
                coach: coachWithoutClub,
                variant: 'mobile'
            })

            const clubInfo = wrapper.find('p.text-gray-500')
            expect(clubInfo.exists()).toBe(true)
            expect(clubInfo.text()).toBe('Club: -')
        })

        it('should handle coach with long names', () => {
            const coachWithLongName: Coach = {
                ...mockCoach,
                nombre: 'José',
                apellidos: 'Mourinho dos Santos'
            }

            const wrapper = mountComponent({
                coach: coachWithLongName,
                variant: 'desktop'
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

            const wrapper = mountComponent({
                coach: coachWithSpecialChars,
                variant: 'desktop'
            })

            const initials = wrapper.find('.text-green-700')
            expect(initials.text()).toBe('JM')
        })

        it('should format large salary numbers correctly', () => {
            const coachWithLargeSalary: Coach = {
                ...mockCoach,
                salario: 50000000
            }

            const wrapper = mountComponent({
                coach: coachWithLargeSalary,
                variant: 'desktop'
            })

            const salaryBadge = wrapper.find('.bg-gray-100')
            expect(salaryBadge.text()).toBe('50.000.000 €')
        })
    })

    describe('Accessibility', () => {
        it('should have proper link attributes', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.exists()).toBe(true)

            const editLink = wrapper.find('a[href="/coaches/edit-1"]')
            expect(editLink.exists()).toBe(true)
        })

        it('should have proper button attributes', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            const deleteButton = wrapper.find('button')
            expect(deleteButton.exists()).toBe(true)
            expect(deleteButton.text()).toBe('Borrar')
        })
    })

    describe('Styling and Classes', () => {
        it('should have correct hover effects in desktop', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            const tableRow = wrapper.find('tr')
            expect(tableRow.classes()).toContain('hover:bg-green-50/30')

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.classes()).toContain('hover:text-green-600')
        })

        it('should have correct hover effects in mobile', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
            })

            const nameLink = wrapper.find('a[href="/coaches/1"]')
            expect(nameLink.classes()).toContain('hover:text-blue-600')

            const editLink = wrapper.find('a[href="/coaches/edit-1"]')
            expect(editLink.classes()).toContain('hover:text-green-900')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.classes()).toContain('hover:text-red-900')
        })

        it('should have correct mobile card hover effects', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'mobile'
            })

            const mobileCard = wrapper.find('.mx-4.mb-4')
            expect(mobileCard.classes()).toContain('hover:shadow-md')
        })
    })

    describe('Component Rendering', () => {
        it('should render without errors', () => {
            const wrapper = mountComponent({
                coach: mockCoach,
                variant: 'desktop'
            })

            expect(wrapper.exists()).toBe(true)
        })
    })
})
