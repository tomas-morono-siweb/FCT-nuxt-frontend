import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayerCard from '../../../app/components/entities/PlayerCard.vue'
import type { Player } from '../../../app/interfaces/player'

// Mock de NuxtLink
vi.mock('#app', () => ({
    NuxtLink: {
        name: 'NuxtLink',
        props: ['to'],
        template: '<a :href="to"><slot /></a>'
    }
}))

describe('PlayerCard', () => {
    const mockPlayer: Player = {
        id: 1,
        nombre: 'Lionel',
        apellidos: 'Messi',
        dorsal: 10,
        salario: 50000000,
        club: 'PSG',
        entrenador: 'Mauricio Pochettino',
        id_club: 'psg-001'
    }

    describe('Props and Defaults', () => {
        it('should render with default props', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer
                }
            })

            expect(wrapper.props('variant')).toBe('desktop')
        })

        it('should accept custom props', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'mobile'
                }
            })

            expect(wrapper.props('variant')).toBe('mobile')
        })
    })

    describe('Desktop Variant', () => {
        it('should render desktop table row when variant is desktop', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const tableRow = wrapper.find('tr')
            expect(tableRow.exists()).toBe(true)
            expect(tableRow.classes()).toContain('group')
            expect(tableRow.classes()).toContain('transition-all')
            expect(tableRow.classes()).toContain('duration-200')
            expect(tableRow.classes()).toContain('hover:bg-blue-50/30')
        })

        it('should render player avatar with initials', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const avatar = wrapper.find('.flex.h-10.w-10')
            expect(avatar.exists()).toBe(true)

            const initials = avatar.find('span')
            expect(initials.text()).toBe('LM') // Lionel Messi
            expect(initials.classes()).toContain('text-sm')
            expect(initials.classes()).toContain('font-semibold')
            expect(initials.classes()).toContain('text-blue-700')
        })

        it('should render player name as link', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const nameLink = wrapper.find('a[href="/players/1"]')
            expect(nameLink.exists()).toBe(true)
            expect(nameLink.text()).toBe('Lionel Messi')
            expect(nameLink.classes()).toContain('text-sm')
            expect(nameLink.classes()).toContain('font-semibold')
            expect(nameLink.classes()).toContain('text-gray-900')
        })

        it('should render salary badge', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const salaryBadge = wrapper.find('.bg-green-100')
            expect(salaryBadge.exists()).toBe(true)
            expect(salaryBadge.text()).toBe('50,000,000 €')
            expect(salaryBadge.classes()).toContain('inline-flex')
            expect(salaryBadge.classes()).toContain('items-center')
            expect(salaryBadge.classes()).toContain('rounded-full')
            expect(salaryBadge.classes()).toContain('px-2.5')
            expect(salaryBadge.classes()).toContain('py-0.5')
            expect(salaryBadge.classes()).toContain('text-xs')
            expect(salaryBadge.classes()).toContain('font-medium')
            expect(salaryBadge.classes()).toContain('text-green-800')
        })

        it('should render dorsal badge', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const dorsalBadge = wrapper.find('.bg-gray-100')
            expect(dorsalBadge.exists()).toBe(true)
            expect(dorsalBadge.text()).toBe('10')
            expect(dorsalBadge.classes()).toContain('text-gray-800')
        })

        it('should render club badge', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const clubBadge = wrapper.find('.bg-orange-100')
            expect(clubBadge.exists()).toBe(true)
            expect(clubBadge.text()).toBe('PSG')
            expect(clubBadge.classes()).toContain('text-orange-800')
        })

        it('should render action buttons', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const editButton = wrapper.find('a[href="/players/edit-1"]')
            expect(editButton.exists()).toBe(true)
            expect(editButton.text()).toBe('Editar')
            expect(editButton.classes()).toContain('bg-blue-600')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.exists()).toBe(true)
            expect(deleteButton.text()).toBe('Borrar')
            expect(deleteButton.classes()).toContain('bg-red-600')
        })
    })

    describe('Mobile Variant', () => {
        it('should render mobile card when variant is mobile', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'mobile'
                }
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
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'mobile'
                }
            })

            const avatar = wrapper.find('.h-12.w-12')
            expect(avatar.exists()).toBe(true)

            const initials = avatar.find('span')
            expect(initials.text()).toBe('LM')
            expect(initials.classes()).toContain('text-blue-600')
        })

        it('should render player name as link in mobile', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'mobile'
                }
            })

            const nameLink = wrapper.find('a[href="/players/1"]')
            expect(nameLink.exists()).toBe(true)
            expect(nameLink.text()).toBe('Lionel Messi')
            expect(nameLink.classes()).toContain('text-base')
            expect(nameLink.classes()).toContain('font-medium')
        })

        it('should render salary badge in mobile', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'mobile'
                }
            })

            const salaryBadge = wrapper.find('.bg-blue-100')
            expect(salaryBadge.exists()).toBe(true)
            expect(salaryBadge.text()).toBe('50,000,000 €')
            expect(salaryBadge.classes()).toContain('text-blue-800')
        })

        it('should render dorsal badge in mobile when available', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'mobile'
                }
            })

            const dorsalBadge = wrapper.find('.bg-gray-100')
            expect(dorsalBadge.exists()).toBe(true)
            expect(dorsalBadge.text()).toBe('Dorsal 10')
        })

        it('should render club information in mobile', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'mobile'
                }
            })

            const clubInfo = wrapper.find('p.text-gray-500')
            expect(clubInfo.exists()).toBe(true)
            expect(clubInfo.text()).toBe('Club: PSG')
        })

        it('should render mobile action buttons', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'mobile'
                }
            })

            const editLink = wrapper.find('a[href="/players/edit-1"]')
            expect(editLink.exists()).toBe(true)
            expect(editLink.text()).toBe('Editar')
            expect(editLink.classes()).toContain('text-blue-600')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.exists()).toBe(true)
            expect(deleteButton.text()).toBe('Borrar')
            expect(deleteButton.classes()).toContain('text-red-600')
        })
    })

    describe('Events', () => {
        it('should emit delete event when delete button is clicked in desktop', async () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const deleteButton = wrapper.find('button')
            await deleteButton.trigger('click')

            expect(wrapper.emitted('delete')).toBeTruthy()
            expect(wrapper.emitted('delete')?.[0]).toEqual([1])
        })

        it('should emit delete event when delete button is clicked in mobile', async () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
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
        it('should handle player without salary', () => {
            const playerWithoutSalary: Player = {
                ...mockPlayer,
                salario: 0
            }

            const wrapper = mount(PlayerCard, {
                props: {
                    player: playerWithoutSalary,
                    variant: 'desktop'
                }
            })

            const salaryBadge = wrapper.find('.bg-green-100')
            expect(salaryBadge.text()).toBe('Sin salario')
        })

        it('should handle player without dorsal', () => {
            const playerWithoutDorsal: Player = {
                ...mockPlayer,
                dorsal: undefined as any
            }

            const wrapper = mount(PlayerCard, {
                props: {
                    player: playerWithoutDorsal,
                    variant: 'desktop'
                }
            })

            const dorsalBadge = wrapper.find('.bg-gray-100')
            expect(dorsalBadge.text()).toBe('-')
        })

        it('should handle player without club', () => {
            const playerWithoutClub: Player = {
                ...mockPlayer,
                club: ''
            }

            const wrapper = mount(PlayerCard, {
                props: {
                    player: playerWithoutClub,
                    variant: 'mobile'
                }
            })

            const clubInfo = wrapper.find('p.text-gray-500')
            expect(clubInfo.exists()).toBe(false)
        })

        it('should handle player without dorsal in mobile', () => {
            const playerWithoutDorsal: Player = {
                ...mockPlayer,
                dorsal: undefined as any
            }

            const wrapper = mount(PlayerCard, {
                props: {
                    player: playerWithoutDorsal,
                    variant: 'mobile'
                }
            })

            const dorsalBadge = wrapper.find('.bg-gray-100')
            expect(dorsalBadge.exists()).toBe(false)
        })

        it('should handle player with long names', () => {
            const playerWithLongName: Player = {
                ...mockPlayer,
                nombre: 'Cristiano',
                apellidos: 'Ronaldo dos Santos Aveiro'
            }

            const wrapper = mount(PlayerCard, {
                props: {
                    player: playerWithLongName,
                    variant: 'desktop'
                }
            })

            const initials = wrapper.find('.text-blue-700')
            expect(initials.text()).toBe('CR') // Cristiano Ronaldo
        })

        it('should handle player with special characters in name', () => {
            const playerWithSpecialChars: Player = {
                ...mockPlayer,
                nombre: 'José',
                apellidos: 'María'
            }

            const wrapper = mount(PlayerCard, {
                props: {
                    player: playerWithSpecialChars,
                    variant: 'desktop'
                }
            })

            const initials = wrapper.find('.text-blue-700')
            expect(initials.text()).toBe('JM')
        })

        it('should format large salary numbers correctly', () => {
            const playerWithLargeSalary: Player = {
                ...mockPlayer,
                salario: 1000000000
            }

            const wrapper = mount(PlayerCard, {
                props: {
                    player: playerWithLargeSalary,
                    variant: 'desktop'
                }
            })

            const salaryBadge = wrapper.find('.bg-green-100')
            expect(salaryBadge.text()).toBe('1,000,000,000 €')
        })
    })

    describe('Accessibility', () => {
        it('should have proper link attributes', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const nameLink = wrapper.find('a[href="/players/1"]')
            expect(nameLink.exists()).toBe(true)

            const editLink = wrapper.find('a[href="/players/edit-1"]')
            expect(editLink.exists()).toBe(true)
        })

        it('should have proper button attributes', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
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
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'desktop'
                }
            })

            const tableRow = wrapper.find('tr')
            expect(tableRow.classes()).toContain('hover:bg-blue-50/30')

            const nameLink = wrapper.find('a[href="/players/1"]')
            expect(nameLink.classes()).toContain('hover:text-blue-600')
        })

        it('should have correct hover effects in mobile', () => {
            const wrapper = mount(PlayerCard, {
                props: {
                    player: mockPlayer,
                    variant: 'mobile'
                }
            })

            const nameLink = wrapper.find('a[href="/players/1"]')
            expect(nameLink.classes()).toContain('hover:text-blue-600')

            const editLink = wrapper.find('a[href="/players/edit-1"]')
            expect(editLink.classes()).toContain('hover:text-blue-900')

            const deleteButton = wrapper.find('button')
            expect(deleteButton.classes()).toContain('hover:text-red-900')
        })
    })
})
