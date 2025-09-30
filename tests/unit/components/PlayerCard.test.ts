import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayerCard from '../../../app/components/entities/PlayerCard.vue'
import type { Player } from '../../../app/interfaces/player'

// Mock de formatMillions
vi.mock('../../../app/utils/format', () => ({
  formatMillions: vi.fn((value: number) => `${value}M`)
}))

describe('PlayerCard', () => {
  const mockPlayer: Player = {
    id: 1,
    nombre: 'Lionel',
    apellidos: 'Messi',
    dorsal: 10,
    salario: 50000000,
    club: 'FC Barcelona',
    id_club: 'FCB'
  }

  describe('Props', () => {
    it('should render with default props', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer
        }
      })

      expect(wrapper.props('variant')).toBe('desktop')
    })

    it('should render with custom props', () => {
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
    it('should render desktop table row', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'desktop'
        }
      })

      expect(wrapper.find('tr').exists()).toBe(true)
      expect(wrapper.find('div.mx-4').exists()).toBe(false)
    })

    it('should display player information correctly', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'desktop'
        }
      })

      // Check player name
      expect(wrapper.text()).toContain('Lionel Messi')
      
      // Check initials in avatar
      expect(wrapper.text()).toContain('LM')
      
      // Check salary
      expect(wrapper.text()).toContain('50000000M')
      
      // Check dorsal
      expect(wrapper.text()).toContain('10')
      
      // Check club
      expect(wrapper.text()).toContain('FC Barcelona')
    })

    it('should render action buttons', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'desktop'
        }
      })

      const editButton = wrapper.find('a[href="/players/edit-1"]')
      const deleteButton = wrapper.find('button')

      expect(editButton.exists()).toBe(true)
      expect(editButton.text()).toBe('Editar')
      
      expect(deleteButton.exists()).toBe(true)
      expect(deleteButton.text()).toBe('Borrar')
    })

    it('should handle missing dorsal', () => {
      const playerWithoutDorsal = { ...mockPlayer, dorsal: undefined }
      const wrapper = mount(PlayerCard, {
        props: {
          player: playerWithoutDorsal,
          variant: 'desktop'
        }
      })

      expect(wrapper.text()).toContain('-')
    })

    it('should handle missing salary', () => {
      const playerWithoutSalary = { ...mockPlayer, salario: 0 }
      const wrapper = mount(PlayerCard, {
        props: {
          player: playerWithoutSalary,
          variant: 'desktop'
        }
      })

      expect(wrapper.text()).toContain('Sin salario')
    })
  })

  describe('Mobile Variant', () => {
    it('should render mobile card', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'mobile'
        }
      })

      expect(wrapper.find('div.mx-4').exists()).toBe(true)
      expect(wrapper.find('tr').exists()).toBe(false)
    })

    it('should display player information correctly', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'mobile'
        }
      })

      // Check player name
      expect(wrapper.text()).toContain('Lionel Messi')
      
      // Check initials in avatar
      expect(wrapper.text()).toContain('LM')
      
      // Check salary
      expect(wrapper.text()).toContain('50000000M')
      
      // Check dorsal
      expect(wrapper.text()).toContain('Dorsal 10')
      
      // Check club
      expect(wrapper.text()).toContain('Club: FC Barcelona')
    })

    it('should render action buttons', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'mobile'
        }
      })

      const editButton = wrapper.find('a[href="/players/edit-1"]')
      const deleteButton = wrapper.find('button')

      expect(editButton.exists()).toBe(true)
      expect(editButton.text()).toBe('Editar')
      
      expect(deleteButton.exists()).toBe(true)
      expect(deleteButton.text()).toBe('Borrar')
    })

    it('should handle missing dorsal in mobile', () => {
      const playerWithoutDorsal = { ...mockPlayer, dorsal: undefined }
      const wrapper = mount(PlayerCard, {
        props: {
          player: playerWithoutDorsal,
          variant: 'mobile'
        }
      })

      expect(wrapper.text()).not.toContain('Dorsal')
    })

    it('should handle missing club in mobile', () => {
      const playerWithoutClub = { ...mockPlayer, club: '' }
      const wrapper = mount(PlayerCard, {
        props: {
          player: playerWithoutClub,
          variant: 'mobile'
        }
      })

      expect(wrapper.text()).not.toContain('Club:')
    })
  })

  describe('Events', () => {
    it('should emit delete event when delete button is clicked', async () => {
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

    it('should emit delete event in mobile variant', async () => {
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

  describe('Links', () => {
    it('should render correct player detail link', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'desktop'
        }
      })

      const detailLink = wrapper.find('a[href="/players/1"]')
      expect(detailLink.exists()).toBe(true)
      expect(detailLink.text()).toBe('Lionel Messi')
    })

    it('should render correct edit link', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'desktop'
        }
      })

      const editLink = wrapper.find('a[href="/players/edit-1"]')
      expect(editLink.exists()).toBe(true)
      expect(editLink.text()).toBe('Editar')
    })
  })

  describe('Styling', () => {
    it('should apply correct CSS classes for desktop variant', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'desktop'
        }
      })

      const row = wrapper.find('tr')
      expect(row.classes()).toContain('group')
      expect(row.classes()).toContain('hover:bg-blue-50/30')
    })

    it('should apply correct CSS classes for mobile variant', () => {
      const wrapper = mount(PlayerCard, {
        props: {
          player: mockPlayer,
          variant: 'mobile'
        }
      })

      const card = wrapper.find('div.mx-4')
      expect(card.classes()).toContain('rounded-lg')
      expect(card.classes()).toContain('border')
      expect(card.classes()).toContain('bg-white')
    })
  })
})
