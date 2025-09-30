import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CoachCard from '../../../app/components/entities/CoachCard.vue'
import type { Coach } from '../../../app/interfaces/coach'

// Mock de formatMillions
vi.mock('../../../app/utils/format', () => ({
  formatMillions: vi.fn((value: number) => `${value}M`)
}))

// Mock de useClubs
vi.mock('../../../app/composables/useClubs', () => ({
  useClubs: vi.fn(() => ({
    list: vi.fn(() => Promise.resolve({
      data: [
        { id: 1, id_club: 'FCB', nombre: 'FC Barcelona' },
        { id: 2, id_club: 'RMA', nombre: 'Real Madrid' }
      ]
    }))
  }))
}))

// Mock de useAsyncData
vi.mock('#app', () => ({
  useAsyncData: vi.fn(() => ({
    data: ref({
      data: [
        { id: 1, id_club: 'FCB', nombre: 'FC Barcelona' },
        { id: 2, id_club: 'RMA', nombre: 'Real Madrid' }
      ]
    }),
    pending: ref(false),
    error: ref(null)
  }))
}))

describe('CoachCard', () => {
  const mockCoach: Coach = {
    id: 1,
    dni: '12345678A',
    nombre: 'Pep',
    apellidos: 'Guardiola',
    salario: 15000000,
    id_club: 'FCB'
  }

  describe('Props', () => {
    it('should render with default props', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach
        }
      })

      expect(wrapper.props('variant')).toBe('desktop')
    })

    it('should render with custom props', () => {
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
    it('should render desktop table row', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'desktop'
        }
      })

      expect(wrapper.find('tr').exists()).toBe(true)
      expect(wrapper.find('div.mx-4').exists()).toBe(false)
    })

    it('should display coach information correctly', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'desktop'
        }
      })

      // Check coach name
      expect(wrapper.text()).toContain('Pep Guardiola')
      
      // Check initials in avatar
      expect(wrapper.text()).toContain('PG')
      
      // Check salary
      expect(wrapper.text()).toContain('15000000M')
      
      // Check club name (should resolve from id_club)
      expect(wrapper.text()).toContain('FC Barcelona')
    })

    it('should render action buttons', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'desktop'
        }
      })

      const editButton = wrapper.find('a[href="/coaches/edit-1"]')
      const deleteButton = wrapper.find('button')

      expect(editButton.exists()).toBe(true)
      expect(editButton.text()).toBe('Editar')
      
      expect(deleteButton.exists()).toBe(true)
      expect(deleteButton.text()).toBe('Borrar')
    })

    it('should handle missing salary', () => {
      const coachWithoutSalary = { ...mockCoach, salario: 0 }
      const wrapper = mount(CoachCard, {
        props: {
          coach: coachWithoutSalary,
          variant: 'desktop'
        }
      })

      expect(wrapper.text()).toContain('-')
    })

    it('should handle missing club', () => {
      const coachWithoutClub = { ...mockCoach, id_club: '' }
      const wrapper = mount(CoachCard, {
        props: {
          coach: coachWithoutClub,
          variant: 'desktop'
        }
      })

      expect(wrapper.text()).toContain('-')
    })
  })

  describe('Mobile Variant', () => {
    it('should render mobile card', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'mobile'
        }
      })

      expect(wrapper.find('div.mx-4').exists()).toBe(true)
      expect(wrapper.find('tr').exists()).toBe(false)
    })

    it('should display coach information correctly', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'mobile'
        }
      })

      // Check coach name
      expect(wrapper.text()).toContain('Pep Guardiola')
      
      // Check initials in avatar
      expect(wrapper.text()).toContain('PG')
      
      // Check salary
      expect(wrapper.text()).toContain('15000000M')
      
      // Check club name
      expect(wrapper.text()).toContain('Club: FC Barcelona')
    })

    it('should render action buttons', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'mobile'
        }
      })

      const editButton = wrapper.find('a[href="/coaches/edit-1"]')
      const deleteButton = wrapper.find('button')

      expect(editButton.exists()).toBe(true)
      expect(editButton.text()).toBe('Editar')
      
      expect(deleteButton.exists()).toBe(true)
      expect(deleteButton.text()).toBe('Borrar')
    })

    it('should handle missing salary in mobile', () => {
      const coachWithoutSalary = { ...mockCoach, salario: 0 }
      const wrapper = mount(CoachCard, {
        props: {
          coach: coachWithoutSalary,
          variant: 'mobile'
        }
      })

      expect(wrapper.text()).not.toContain('15000000M')
    })

    it('should handle missing club in mobile', () => {
      const coachWithoutClub = { ...mockCoach, id_club: '' }
      const wrapper = mount(CoachCard, {
        props: {
          coach: coachWithoutClub,
          variant: 'mobile'
        }
      })

      expect(wrapper.text()).not.toContain('Club:')
    })
  })

  describe('Events', () => {
    it('should emit delete event when delete button is clicked', async () => {
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

    it('should emit delete event in mobile variant', async () => {
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

  describe('Links', () => {
    it('should render correct coach detail link', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'desktop'
        }
      })

      const detailLink = wrapper.find('a[href="/coaches/1"]')
      expect(detailLink.exists()).toBe(true)
      expect(detailLink.text()).toBe('Pep Guardiola')
    })

    it('should render correct edit link', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'desktop'
        }
      })

      const editLink = wrapper.find('a[href="/coaches/edit-1"]')
      expect(editLink.exists()).toBe(true)
      expect(editLink.text()).toBe('Editar')
    })
  })

  describe('Styling', () => {
    it('should apply correct CSS classes for desktop variant', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'desktop'
        }
      })

      const row = wrapper.find('tr')
      expect(row.classes()).toContain('group')
      expect(row.classes()).toContain('hover:bg-green-50/30')
    })

    it('should apply correct CSS classes for mobile variant', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'mobile'
        }
      })

      const card = wrapper.find('div.mx-4')
      expect(card.classes()).toContain('rounded-xl')
      expect(card.classes()).toContain('border')
      expect(card.classes()).toContain('bg-white')
    })
  })

  describe('Club Resolution', () => {
    it('should show club name when club is found', () => {
      const wrapper = mount(CoachCard, {
        props: {
          coach: mockCoach,
          variant: 'desktop'
        }
      })

      expect(wrapper.text()).toContain('FC Barcelona')
    })

    it('should show club id when club is not found', () => {
      const coachWithUnknownClub = { ...mockCoach, id_club: 'UNKNOWN' }
      const wrapper = mount(CoachCard, {
        props: {
          coach: coachWithUnknownClub,
          variant: 'desktop'
        }
      })

      expect(wrapper.text()).toContain('UNKNOWN')
    })
  })
})
