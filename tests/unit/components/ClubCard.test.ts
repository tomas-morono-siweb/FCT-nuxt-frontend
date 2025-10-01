import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ClubCard from '../../../app/components/entities/ClubCard.vue'
import type { Club } from '../../../app/interfaces/club'

describe('ClubCard', () => {
    const mockClub: Club = {
        id: 1,
        id_club: 'RM',
        nombre: 'Real Madrid',
        fundacion: 1902,
        ciudad: 'Madrid',
        estadio: 'Santiago Bernabéu',
        presupuesto: 500000000,
        presupuesto_restante: 300000000,
        entrenador: 'Carlo Ancelotti',
        jugadores: ['Vinicius Junior', 'Jude Bellingham']
    }

    const NuxtLinkStub = {
        name: 'NuxtLink',
        props: ['to'],
        template: '<a :href="to"><slot /></a>'
    }

    const mountComponent = (props: any) => {
        return mount(ClubCard, {
            props,
            global: {
                stubs: {
                    NuxtLink: NuxtLinkStub
                }
            }
        })
    }

    describe('Props and Defaults', () => {
        it('should render with default props', () => {
            const wrapper = mountComponent({
                club: mockClub
            })

            expect(wrapper.props('variant')).toBe('desktop')
        })

        it('should accept custom props', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            expect(wrapper.props('variant')).toBe('mobile')
        })
    })

    describe('Desktop Variant', () => {
        it('should render desktop table row when variant is desktop', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            const tableRow = wrapper.find('tr')
            expect(tableRow.exists()).toBe(true)
            expect(tableRow.classes()).toContain('group')
            expect(tableRow.classes()).toContain('transition-all')
            expect(tableRow.classes()).toContain('duration-200')
            expect(tableRow.classes()).toContain('hover:bg-orange-50/30')
        })

        it('should render club avatar with first letter', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            const avatar = wrapper.find('.flex.h-10.w-10')
            expect(avatar.exists()).toBe(true)

            const initial = avatar.find('span')
            expect(initial.text()).toBe('R') // Real Madrid
            expect(initial.classes()).toContain('text-sm')
            expect(initial.classes()).toContain('font-semibold')
            expect(initial.classes()).toContain('text-orange-700')
        })

        it('should render club name as link', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            const nameLink = wrapper.find('a[href="/clubs/1"]')
            expect(nameLink.exists()).toBe(true)
            expect(nameLink.text()).toBe('Real Madrid')
            expect(nameLink.classes()).toContain('text-sm')
            expect(nameLink.classes()).toContain('font-semibold')
            expect(nameLink.classes()).toContain('text-gray-900')
        })

        it('should render city badge', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            const cityBadge = wrapper.find('span.bg-orange-100.text-orange-800')
            expect(cityBadge.exists()).toBe(true)
            expect(cityBadge.text()).toBe('Madrid')
            expect(cityBadge.classes()).toContain('inline-flex')
            expect(cityBadge.classes()).toContain('items-center')
            expect(cityBadge.classes()).toContain('rounded-full')
            expect(cityBadge.classes()).toContain('px-2.5')
            expect(cityBadge.classes()).toContain('py-0.5')
            expect(cityBadge.classes()).toContain('text-xs')
            expect(cityBadge.classes()).toContain('font-medium')
            expect(cityBadge.classes()).toContain('text-orange-800')
        })

        it('should render stadium badge', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            const stadiumBadge = wrapper.find('.bg-gray-100')
            expect(stadiumBadge.exists()).toBe(true)
            expect(stadiumBadge.text()).toBe('Santiago Bernabéu')
            expect(stadiumBadge.classes()).toContain('text-gray-800')
        })

        it('should render foundation year badge', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            const foundationBadge = wrapper.find('.bg-green-100')
            expect(foundationBadge.exists()).toBe(true)
            expect(foundationBadge.text()).toBe('1902')
            expect(foundationBadge.classes()).toContain('text-green-800')
        })

        it('should render action buttons', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            const editButton = wrapper.find('a[href="/clubs/edit-1"]')
            expect(editButton.exists()).toBe(true)
            expect(editButton.text()).toBe('Editar')
            expect(editButton.classes()).toContain('bg-orange-600')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.exists()).toBe(true)
            expect(deleteButton.text()).toBe('Borrar')
            expect(deleteButton.classes()).toContain('bg-red-600')
        })
    })

    describe('Mobile Variant', () => {
        it('should render mobile card when variant is mobile', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            const mobileCard = wrapper.find('.mx-4.mb-4')
            expect(mobileCard.exists()).toBe(true)
            expect(mobileCard.classes()).toContain('rounded-lg')
            expect(mobileCard.classes()).toContain('border')
            expect(mobileCard.classes()).toContain('border-gray-100')
            expect(mobileCard.classes()).toContain('bg-white')
            expect(mobileCard.classes()).toContain('p-4')
            expect(mobileCard.classes()).toContain('shadow-sm')
        })

        it('should render larger avatar for mobile', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            const avatar = wrapper.find('.h-12.w-12')
            expect(avatar.exists()).toBe(true)

            const initial = avatar.find('span')
            expect(initial.text()).toBe('R')
            expect(initial.classes()).toContain('text-orange-600')
        })

        it('should render club name as link in mobile', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            const nameLink = wrapper.find('a[href="/clubs/1"]')
            expect(nameLink.exists()).toBe(true)
            expect(nameLink.text()).toBe('Real Madrid')
            expect(nameLink.classes()).toContain('text-base')
            expect(nameLink.classes()).toContain('font-medium')
        })

        it('should render city badge in mobile', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            const cityBadge = wrapper.find('.bg-gray-100')
            expect(cityBadge.exists()).toBe(true)
            expect(cityBadge.text()).toBe('Madrid')
            expect(cityBadge.classes()).toContain('text-gray-800')
        })

        it('should render foundation year badge in mobile', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            const foundationBadge = wrapper.find('span.bg-orange-100.text-orange-800')
            expect(foundationBadge.exists()).toBe(true)
            expect(foundationBadge.text()).toBe('1902')
            expect(foundationBadge.classes()).toContain('text-orange-800')
        })

        it('should render stadium information in mobile', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            const stadiumInfo = wrapper.find('p.text-gray-500')
            expect(stadiumInfo.exists()).toBe(true)
            expect(stadiumInfo.text()).toBe('Santiago Bernabéu')
        })

        it('should render mobile action buttons', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            const editLink = wrapper.find('a[href="/clubs/edit-1"]')
            expect(editLink.exists()).toBe(true)
            expect(editLink.text()).toBe('Editar')
            expect(editLink.classes()).toContain('text-orange-600')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.exists()).toBe(true)
            expect(deleteButton.text()).toBe('Borrar')
            expect(deleteButton.classes()).toContain('text-red-600')
        })
    })

    describe('Events', () => {
        it('should emit delete event when delete button is clicked in desktop', async () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            const deleteButton = wrapper.find('button')
            await deleteButton.trigger('click')

            expect(wrapper.emitted('delete')).toBeTruthy()
            expect(wrapper.emitted('delete')?.[0]).toEqual([1])
        })

        it('should emit delete event when delete button is clicked in mobile', async () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            const deleteButton = wrapper.find('button')
            await deleteButton.trigger('click')

            expect(wrapper.emitted('delete')).toBeTruthy()
            expect(wrapper.emitted('delete')?.[0]).toEqual([1])
        })
    })

    describe('Edge Cases', () => {
        it('should handle club with long name', () => {
            const clubWithLongName: Club = {
                ...mockClub,
                nombre: 'Club Atlético de Madrid S.A.D.'
            }

            const wrapper = mount(ClubCard, {
                props: {
                    club: clubWithLongName,
                    variant: 'desktop'
                }
            })

            const initial = wrapper.find('.text-orange-700')
            expect(initial.text()).toBe('C') // Club Atlético de Madrid S.A.D.
        })

        it('should handle club with special characters in name', () => {
            const clubWithSpecialChars: Club = {
                ...mockClub,
                nombre: 'São Paulo Futebol Clube'
            }

            const wrapper = mount(ClubCard, {
                props: {
                    club: clubWithSpecialChars,
                    variant: 'desktop'
                }
            })

            const initial = wrapper.find('.text-orange-700')
            expect(initial.text()).toBe('S')
        })

        it('should handle club with empty city', () => {
            const clubWithoutCity: Club = {
                ...mockClub,
                ciudad: ''
            }

            const wrapper = mountComponent({
                club: clubWithoutCity,
                variant: 'desktop'
            })

            const cityBadge = wrapper.find('span.bg-orange-100.text-orange-800')
            expect(cityBadge.text()).toBe('')
        })

        it('should handle club with empty stadium', () => {
            const clubWithoutStadium: Club = {
                ...mockClub,
                estadio: ''
            }

            const wrapper = mount(ClubCard, {
                props: {
                    club: clubWithoutStadium,
                    variant: 'mobile'
                }
            })

            const stadiumInfo = wrapper.find('p.text-gray-500')
            expect(stadiumInfo.text()).toBe('')
        })

        it('should handle club with very old foundation year', () => {
            const oldClub: Club = {
                ...mockClub,
                fundacion: 1863
            }

            const wrapper = mount(ClubCard, {
                props: {
                    club: oldClub,
                    variant: 'desktop'
                }
            })

            const foundationBadge = wrapper.find('.bg-green-100')
            expect(foundationBadge.text()).toBe('1863')
        })

        it('should handle club with recent foundation year', () => {
            const newClub: Club = {
                ...mockClub,
                fundacion: 2020
            }

            const wrapper = mount(ClubCard, {
                props: {
                    club: newClub,
                    variant: 'desktop'
                }
            })

            const foundationBadge = wrapper.find('.bg-green-100')
            expect(foundationBadge.text()).toBe('2020')
        })

        it('should handle club with very long stadium name', () => {
            const clubWithLongStadium: Club = {
                ...mockClub,
                estadio: 'Estadio Santiago Bernabéu - Ciudad Deportiva del Real Madrid'
            }

            const wrapper = mount(ClubCard, {
                props: {
                    club: clubWithLongStadium,
                    variant: 'mobile'
                }
            })

            const stadiumInfo = wrapper.find('p.text-gray-500')
            expect(stadiumInfo.text()).toBe('Estadio Santiago Bernabéu - Ciudad Deportiva del Real Madrid')
        })
    })

    describe('Accessibility', () => {
        it('should have proper link attributes', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            const nameLink = wrapper.find('a[href="/clubs/1"]')
            expect(nameLink.exists()).toBe(true)

            const editLink = wrapper.find('a[href="/clubs/edit-1"]')
            expect(editLink.exists()).toBe(true)
        })

        it('should have proper button attributes', () => {
            const wrapper = mountComponent({
                club: mockClub,
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
                club: mockClub,
                variant: 'desktop'
            })

            const tableRow = wrapper.find('tr')
            expect(tableRow.classes()).toContain('hover:bg-orange-50/30')

            const nameLink = wrapper.find('a[href="/clubs/1"]')
            expect(nameLink.classes()).toContain('hover:text-orange-600')
        })

        it('should have correct hover effects in mobile', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            const nameLink = wrapper.find('a[href="/clubs/1"]')
            expect(nameLink.classes()).toContain('hover:text-blue-600')

            const editLink = wrapper.find('a[href="/clubs/edit-1"]')
            expect(editLink.classes()).toContain('hover:text-orange-900')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.classes()).toContain('hover:text-red-900')
        })

        it('should have correct color scheme', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            // Avatar should be orange
            const avatar = wrapper.find('.bg-orange-100')
            expect(avatar.exists()).toBe(true)

            // City badge should be orange
            const cityBadge = wrapper.find('.bg-orange-100')
            expect(cityBadge.exists()).toBe(true)

            // Foundation badge should be green
            const foundationBadge = wrapper.find('.bg-green-100')
            expect(foundationBadge.exists()).toBe(true)

            // Stadium badge should be gray
            const stadiumBadge = wrapper.find('.bg-gray-100')
            expect(stadiumBadge.exists()).toBe(true)
        })
    })

    describe('Data Display', () => {
        it('should display all club information correctly', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'desktop'
            })

            expect(wrapper.text()).toContain('Real Madrid')
            expect(wrapper.text()).toContain('Madrid')
            expect(wrapper.text()).toContain('Santiago Bernabéu')
            expect(wrapper.text()).toContain('1902')
        })

        it('should display club information in mobile layout', () => {
            const wrapper = mountComponent({
                club: mockClub,
                variant: 'mobile'
            })

            expect(wrapper.text()).toContain('Real Madrid')
            expect(wrapper.text()).toContain('Madrid')
            expect(wrapper.text()).toContain('Santiago Bernabéu')
            expect(wrapper.text()).toContain('1902')
        })
    })
})
