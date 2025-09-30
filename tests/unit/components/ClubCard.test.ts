import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ClubCard from '../../../app/components/entities/ClubCard.vue'
import type { Club } from '../../../app/interfaces/club'

describe('ClubCard', () => {
  const mockClub: Club = {
    id: 1,
    id_club: 'FCB',
    nombre: 'FC Barcelona',
    fundacion: 1899,
    ciudad: 'Barcelona',
    estadio: 'Camp Nou',
    presupuesto: 100000000,
    presupuesto_restante: 50000000
  }

  describe('Props', () => {
    it('should render with default props', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub
        }
      })

      expect(wrapper.props('variant')).toBe('desktop')
    })

    it('should render with custom props', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'mobile'
        }
      })

      expect(wrapper.props('variant')).toBe('mobile')
    })
  })

  describe('Desktop Variant', () => {
    it('should render desktop table row', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'desktop'
        }
      })

      expect(wrapper.find('tr').exists()).toBe(true)
      expect(wrapper.find('div.mx-4').exists()).toBe(false)
    })

    it('should display club information correctly', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'desktop'
        }
      })

      // Check club name
      expect(wrapper.text()).toContain('FC Barcelona')
      
      // Check initial in avatar
      expect(wrapper.text()).toContain('F')
      
      // Check city
      expect(wrapper.text()).toContain('Barcelona')
      
      // Check stadium
      expect(wrapper.text()).toContain('Camp Nou')
      
      // Check foundation year
      expect(wrapper.text()).toContain('1899')
    })

    it('should render action buttons', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'desktop'
        }
      })

      const editButton = wrapper.find('a[href="/clubs/edit-1"]')
      const deleteButton = wrapper.find('button')

      expect(editButton.exists()).toBe(true)
      expect(editButton.text()).toBe('Editar')
      
      expect(deleteButton.exists()).toBe(true)
      expect(deleteButton.text()).toBe('Borrar')
    })
  })

  describe('Mobile Variant', () => {
    it('should render mobile card', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'mobile'
        }
      })

      expect(wrapper.find('div.mx-4').exists()).toBe(true)
      expect(wrapper.find('tr').exists()).toBe(false)
    })

    it('should display club information correctly', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'mobile'
        }
      })

      // Check club name
      expect(wrapper.text()).toContain('FC Barcelona')
      
      // Check initial in avatar
      expect(wrapper.text()).toContain('F')
      
      // Check city
      expect(wrapper.text()).toContain('Barcelona')
      
      // Check stadium
      expect(wrapper.text()).toContain('Camp Nou')
      
      // Check foundation year
      expect(wrapper.text()).toContain('1899')
    })

    it('should render action buttons', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'mobile'
        }
      })

      const editButton = wrapper.find('a[href="/clubs/edit-1"]')
      const deleteButton = wrapper.find('button')

      expect(editButton.exists()).toBe(true)
      expect(editButton.text()).toBe('Editar')
      
      expect(deleteButton.exists()).toBe(true)
      expect(deleteButton.text()).toBe('Borrar')
    })
  })

  describe('Events', () => {
    it('should emit delete event when delete button is clicked', async () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'desktop'
        }
      })

      const deleteButton = wrapper.find('button')
      await deleteButton.trigger('click')

      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('delete')?.[0]).toEqual([1])
    })

    it('should emit delete event in mobile variant', async () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
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
    it('should render correct club detail link', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'desktop'
        }
      })

      const detailLink = wrapper.find('a[href="/clubs/1"]')
      expect(detailLink.exists()).toBe(true)
      expect(detailLink.text()).toBe('FC Barcelona')
    })

    it('should render correct edit link', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'desktop'
        }
      })

      const editLink = wrapper.find('a[href="/clubs/edit-1"]')
      expect(editLink.exists()).toBe(true)
      expect(editLink.text()).toBe('Editar')
    })
  })

  describe('Styling', () => {
    it('should apply correct CSS classes for desktop variant', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'desktop'
        }
      })

      const row = wrapper.find('tr')
      expect(row.classes()).toContain('group')
      expect(row.classes()).toContain('hover:bg-orange-50/30')
    })

    it('should apply correct CSS classes for mobile variant', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'mobile'
        }
      })

      const card = wrapper.find('div.mx-4')
      expect(card.classes()).toContain('rounded-lg')
      expect(card.classes()).toContain('border')
      expect(card.classes()).toContain('bg-white')
    })
  })

  describe('Data Display', () => {
    it('should display all club fields correctly', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'desktop'
        }
      })

      // Check all fields are displayed
      expect(wrapper.text()).toContain('FC Barcelona')
      expect(wrapper.text()).toContain('Barcelona')
      expect(wrapper.text()).toContain('Camp Nou')
      expect(wrapper.text()).toContain('1899')
    })

    it('should handle empty club name', () => {
      const clubWithEmptyName = { ...mockClub, nombre: '' }
      const wrapper = mount(ClubCard, {
        props: {
          club: clubWithEmptyName,
          variant: 'desktop'
        }
      })

      // Should not crash and should show empty string
      expect(wrapper.find('tr').exists()).toBe(true)
    })

    it('should handle zero foundation year', () => {
      const clubWithZeroYear = { ...mockClub, fundacion: 0 }
      const wrapper = mount(ClubCard, {
        props: {
          club: clubWithZeroYear,
          variant: 'desktop'
        }
      })

      expect(wrapper.text()).toContain('0')
    })
  })

  describe('Avatar Display', () => {
    it('should show first letter of club name in avatar', () => {
      const wrapper = mount(ClubCard, {
        props: {
          club: mockClub,
          variant: 'desktop'
        }
      })

      const avatar = wrapper.find('.bg-orange-100 span')
      expect(avatar.text()).toBe('F')
    })

    it('should handle single character club name', () => {
      const singleCharClub = { ...mockClub, nombre: 'A' }
      const wrapper = mount(ClubCard, {
        props: {
          club: singleCharClub,
          variant: 'desktop'
        }
      })

      const avatar = wrapper.find('.bg-orange-100 span')
      expect(avatar.text()).toBe('A')
    })
  })
})
