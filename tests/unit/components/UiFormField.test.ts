import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UiFormField from '../../../app/components/ui/FormField.vue'

describe('UiFormField', () => {
    const defaultProps = {
        label: 'Test Label',
        modelValue: ''
    }

    describe('Props', () => {
        it('should render with default props', () => {
            const wrapper = mount(UiFormField, {
                props: defaultProps
            })

            expect(wrapper.props('type')).toBe('text')
            expect(wrapper.props('required')).toBe(false)
            expect(wrapper.props('placeholder')).toBeUndefined()
            expect(wrapper.props('error')).toBeUndefined()
            expect(wrapper.props('options')).toBeUndefined()
        })

        it('should render with custom props', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    type: 'email',
                    placeholder: 'Enter email',
                    required: true,
                    error: 'Invalid email',
                    modelValue: 'test@example.com'
                }
            })

            expect(wrapper.props('type')).toBe('email')
            expect(wrapper.props('placeholder')).toBe('Enter email')
            expect(wrapper.props('required')).toBe(true)
            expect(wrapper.props('error')).toBe('Invalid email')
            expect(wrapper.props('modelValue')).toBe('test@example.com')
        })
    })

    describe('Label Rendering', () => {
        it('should render label correctly', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    label: 'Player Name'
                }
            })

            const label = wrapper.find('label')
            expect(label.text()).toBe('Player Name')
            expect(label.classes()).toContain('text-secondary-700')
        })

        it('should show required asterisk when required', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    required: true
                }
            })

            const asterisk = wrapper.find('span.text-error-500')
            expect(asterisk.exists()).toBe(true)
            expect(asterisk.text()).toBe('*')
        })

        it('should not show required asterisk when not required', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    required: false
                }
            })

            const asterisk = wrapper.find('span.text-error-500')
            expect(asterisk.exists()).toBe(false)
        })
    })

    describe('Input Field Rendering', () => {
        it('should render input field by default', () => {
            const wrapper = mount(UiFormField, {
                props: defaultProps
            })

            const input = wrapper.find('input')
            expect(input.exists()).toBe(true)
            expect(input.attributes('type')).toBe('text')
        })

        it('should render different input types', () => {
            const types = ['text', 'email', 'number', 'password', 'tel', 'url', 'date']

            types.forEach(type => {
                const wrapper = mount(UiFormField, {
                    props: {
                        ...defaultProps,
                        type: type as any
                    }
                })

                const input = wrapper.find('input')
                expect(input.attributes('type')).toBe(type)
            })
        })

        it('should bind modelValue to input value', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    modelValue: 'Test Value'
                }
            })

            const input = wrapper.find('input')
            expect(input.element.value).toBe('Test Value')
        })

        it('should set placeholder when provided', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    placeholder: 'Enter your name'
                }
            })

            const input = wrapper.find('input')
            expect(input.attributes('placeholder')).toBe('Enter your name')
        })

        it('should set required attribute when required', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    required: true
                }
            })

            const input = wrapper.find('input')
            expect(input.attributes('required')).toBeDefined()
        })
    })

    describe('Select Field Rendering', () => {
        const selectOptions = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
        ]

        it('should render select field when options provided', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    options: selectOptions
                }
            })

            const select = wrapper.find('select')
            expect(select.exists()).toBe(true)
            expect(wrapper.find('input').exists()).toBe(false)
        })

        it('should render all options correctly', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    options: selectOptions
                }
            })

            const options = wrapper.findAll('option')
            expect(options).toHaveLength(4) // 3 options + 1 default "Seleccionar..."

            expect(options[0].text()).toBe('Seleccionar...')
            expect(options[1].text()).toBe('Option 1')
            expect(options[2].text()).toBe('Option 2')
            expect(options[3].text()).toBe('Option 3')
        })

        it('should bind modelValue to select value', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    options: selectOptions,
                    modelValue: 'option2'
                }
            })

            const select = wrapper.find('select')
            expect(select.element.value).toBe('option2')
        })
    })

    describe('Error State', () => {
        it('should show error message when error provided', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    error: 'This field is required'
                }
            })

            const errorMessage = wrapper.find('p.text-red-600')
            expect(errorMessage.exists()).toBe(true)
            expect(errorMessage.text()).toBe('This field is required')
        })

        it('should not show error message when no error', () => {
            const wrapper = mount(UiFormField, {
                props: defaultProps
            })

            const errorMessage = wrapper.find('p.text-red-600')
            expect(errorMessage.exists()).toBe(false)
        })

        it('should apply error classes to input when error', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    error: 'Invalid input'
                }
            })

            const input = wrapper.find('input')
            expect(input.classes()).toContain('border-red-500')
            expect(input.classes()).toContain('focus:border-red-500')
            expect(input.classes()).toContain('focus:ring-red-500')
        })

        it('should apply error classes to select when error', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    options: [{ value: 'test', label: 'Test' }],
                    error: 'Invalid selection'
                }
            })

            const select = wrapper.find('select')
            expect(select.classes()).toContain('border-red-500')
            expect(select.classes()).toContain('focus:border-red-500')
            expect(select.classes()).toContain('focus:ring-red-500')
        })
    })

    describe('Events', () => {
        it('should emit update:modelValue when input changes', async () => {
            const wrapper = mount(UiFormField, {
                props: defaultProps
            })

            const input = wrapper.find('input')
            await input.setValue('New Value')

            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New Value'])
        })

        it('should emit update:modelValue when select changes', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    options: [{ value: 'test', label: 'Test' }]
                }
            })

            const select = wrapper.find('select')
            await select.setValue('test')

            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test'])
        })

        it('should convert number input to number type', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    type: 'number'
                }
            })

            const input = wrapper.find('input')
            await input.setValue('42')

            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([42])
        })

        it('should handle empty values', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    modelValue: 'initial'
                }
            })

            const input = wrapper.find('input')
            await input.setValue('')

            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
        })
    })

    describe('Number Type Handling', () => {
        it('should handle valid number input', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    type: 'number'
                }
            })

            const input = wrapper.find('input')
            await input.setValue('123')

            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([123])
        })

        it('should handle decimal number input', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    type: 'number'
                }
            })

            const input = wrapper.find('input')
            await input.setValue('123.45')

            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([123.45])
        })

        it('should handle negative number input', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    type: 'number'
                }
            })

            const input = wrapper.find('input')
            await input.setValue('-50')

            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([-50])
        })
    })

    describe('Accessibility', () => {
        it('should have proper label association', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    label: 'Player Name'
                }
            })

            const label = wrapper.find('label')
            const input = wrapper.find('input')

            expect(label.text()).toBe('Player Name')
            expect(input.exists()).toBe(true)
        })

        it('should indicate required fields', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    ...defaultProps,
                    required: true
                }
            })

            const asterisk = wrapper.find('span.text-error-500')
            const input = wrapper.find('input')

            expect(asterisk.exists()).toBe(true)
            expect(input.attributes('required')).toBeDefined()
        })
    })
})
