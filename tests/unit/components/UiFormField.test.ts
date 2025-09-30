import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UiFormField from '../../../app/components/ui/FormField.vue'

describe('UiFormField', () => {
    describe('Props and Defaults', () => {
        it('should render with default props', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Label',
                    modelValue: ''
                }
            })

            expect(wrapper.props('type')).toBe('text')
            expect(wrapper.props('required')).toBe(false)
            expect(wrapper.props('placeholder')).toBeUndefined()
            expect(wrapper.props('error')).toBeUndefined()
            expect(wrapper.props('options')).toBeUndefined()
        })

        it('should accept custom props', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter your email',
                    required: true,
                    error: 'Invalid email',
                    modelValue: 'test@example.com',
                    options: [{ value: 'option1', label: 'Option 1' }]
                }
            })

            expect(wrapper.props('type')).toBe('email')
            expect(wrapper.props('required')).toBe(true)
            expect(wrapper.props('placeholder')).toBe('Enter your email')
            expect(wrapper.props('error')).toBe('Invalid email')
            expect(wrapper.props('options')).toEqual([{ value: 'option1', label: 'Option 1' }])
        })
    })

    describe('Label Rendering', () => {
        it('should render label correctly', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Label',
                    modelValue: ''
                }
            })

            const label = wrapper.find('label')
            expect(label.exists()).toBe(true)
            expect(label.text()).toBe('Test Label')
            expect(label.classes()).toContain('text-secondary-700')
            expect(label.classes()).toContain('block')
            expect(label.classes()).toContain('text-sm')
            expect(label.classes()).toContain('font-semibold')
        })

        it('should show required asterisk when required', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Required Field',
                    required: true,
                    modelValue: ''
                }
            })

            const asterisk = wrapper.find('span.text-error-500')
            expect(asterisk.exists()).toBe(true)
            expect(asterisk.text()).toBe('*')
        })

        it('should not show required asterisk when not required', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Optional Field',
                    required: false,
                    modelValue: ''
                }
            })

            const asterisk = wrapper.find('span.text-error-500')
            expect(asterisk.exists()).toBe(false)
        })
    })

    describe('Input Field Rendering', () => {
        it('should render input when no options provided', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Input',
                    modelValue: 'test value'
                }
            })

            const input = wrapper.find('input')
            expect(input.exists()).toBe(true)
            expect(input.attributes('type')).toBe('text')
            expect(input.element.value).toBe('test value')
        })

        it('should render correct input type', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Email Input',
                    type: 'email',
                    modelValue: ''
                }
            })

            const input = wrapper.find('input')
            expect(input.attributes('type')).toBe('email')
        })

        it('should render placeholder', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Input',
                    placeholder: 'Enter text here',
                    modelValue: ''
                }
            })

            const input = wrapper.find('input')
            expect(input.attributes('placeholder')).toBe('Enter text here')
        })

        it('should have correct CSS classes', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Input',
                    modelValue: ''
                }
            })

            const input = wrapper.find('input')
            expect(input.classes()).toContain('border-secondary-300')
            expect(input.classes()).toContain('text-secondary-800')
            expect(input.classes()).toContain('focus:border-primary-500')
            expect(input.classes()).toContain('focus:ring-primary-200')
            expect(input.classes()).toContain('block')
            expect(input.classes()).toContain('w-full')
            expect(input.classes()).toContain('rounded-lg')
            expect(input.classes()).toContain('border')
            expect(input.classes()).toContain('bg-white')
            expect(input.classes()).toContain('px-4')
            expect(input.classes()).toContain('py-3')
            expect(input.classes()).toContain('text-sm')
        })

        it('should have required attribute when required', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Required Input',
                    required: true,
                    modelValue: ''
                }
            })

            const input = wrapper.find('input')
            expect(input.attributes('required')).toBeDefined()
        })
    })

    describe('Select Field Rendering', () => {
        const mockOptions = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
        ]

        it('should render select when options provided', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Select',
                    modelValue: '',
                    options: mockOptions
                }
            })

            const select = wrapper.find('select')
            expect(select.exists()).toBe(true)
            expect(wrapper.find('input').exists()).toBe(false)
        })

        it('should render all options', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Select',
                    modelValue: '',
                    options: mockOptions
                }
            })

            const options = wrapper.findAll('option')
            expect(options).toHaveLength(4) // 3 options + 1 default "Seleccionar..."

            expect(options[0].text()).toBe('Seleccionar...')
            expect(options[0].attributes('value')).toBe('')

            expect(options[1].text()).toBe('Option 1')
            expect(options[1].attributes('value')).toBe('option1')

            expect(options[2].text()).toBe('Option 2')
            expect(options[2].attributes('value')).toBe('option2')

            expect(options[3].text()).toBe('Option 3')
            expect(options[3].attributes('value')).toBe('option3')
        })

        it('should have correct CSS classes for select', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Select',
                    modelValue: '',
                    options: mockOptions
                }
            })

            const select = wrapper.find('select')
            expect(select.classes()).toContain('border-secondary-300')
            expect(select.classes()).toContain('text-secondary-800')
            expect(select.classes()).toContain('focus:border-primary-500')
            expect(select.classes()).toContain('focus:ring-primary-200')
        })

        it('should have required attribute when required', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Required Select',
                    required: true,
                    modelValue: '',
                    options: mockOptions
                }
            })

            const select = wrapper.find('select')
            expect(select.attributes('required')).toBeDefined()
        })
    })

    describe('Error State', () => {
        it('should show error message when error provided', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Field',
                    error: 'This field is required',
                    modelValue: ''
                }
            })

            const errorMessage = wrapper.find('p.text-red-600')
            expect(errorMessage.exists()).toBe(true)
            expect(errorMessage.text()).toBe('This field is required')
        })

        it('should not show error message when no error', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Field',
                    modelValue: ''
                }
            })

            const errorMessage = wrapper.find('p.text-red-600')
            expect(errorMessage.exists()).toBe(false)
        })

        it('should apply error styles to input when error', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Field',
                    error: 'Error message',
                    modelValue: ''
                }
            })

            const input = wrapper.find('input')
            expect(input.classes()).toContain('border-red-500')
            expect(input.classes()).toContain('focus:border-red-500')
            expect(input.classes()).toContain('focus:ring-red-500')
        })

        it('should apply error styles to select when error', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Select',
                    error: 'Error message',
                    modelValue: '',
                    options: [{ value: 'option1', label: 'Option 1' }]
                }
            })

            const select = wrapper.find('select')
            expect(select.classes()).toContain('border-red-500')
            expect(select.classes()).toContain('focus:border-red-500')
            expect(select.classes()).toContain('focus:ring-red-500')
        })
    })

    describe('Events', () => {
        it('should emit update:modelValue on input change', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Input',
                    modelValue: ''
                }
            })

            const input = wrapper.find('input')
            await input.setValue('new value')
            await input.trigger('input')

            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
        })

        it('should emit update:modelValue on select change', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Select',
                    modelValue: '',
                    options: [{ value: 'option1', label: 'Option 1' }]
                }
            })

            const select = wrapper.find('select')
            await select.setValue('option1')
            await select.trigger('change')

            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option1'])
        })

        it('should convert number input to number type', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Number Input',
                    type: 'number',
                    modelValue: 0
                }
            })

            const input = wrapper.find('input')
            await input.setValue('42')
            await input.trigger('input')

            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([42])
        })

        it('should handle empty string for number input', async () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Number Input',
                    type: 'number',
                    modelValue: 0
                }
            })

            const input = wrapper.find('input')
            await input.setValue('')
            await input.trigger('input')

            expect(wrapper.emitted('update:modelValue')).toBeTruthy()
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
        })
    })

    describe('Input Types', () => {
        const inputTypes = ['text', 'email', 'number', 'password', 'tel', 'url', 'date']

        inputTypes.forEach(type => {
            it(`should render ${type} input type correctly`, () => {
                const wrapper = mount(UiFormField, {
                    props: {
                        label: `${type} Input`,
                        type: type as any,
                        modelValue: ''
                    }
                })

                const input = wrapper.find('input')
                expect(input.attributes('type')).toBe(type)
            })
        })
    })

    describe('Model Value Binding', () => {
        it('should bind string model value', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'String Input',
                    modelValue: 'test string'
                }
            })

            const input = wrapper.find('input')
            expect(input.element.value).toBe('test string')
        })

        it('should bind number model value', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Number Input',
                    type: 'number',
                    modelValue: 42
                }
            })

            const input = wrapper.find('input')
            expect(input.element.value).toBe('42')
        })

        it('should bind undefined model value', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Undefined Input',
                    modelValue: undefined
                }
            })

            const input = wrapper.find('input')
            expect(input.element.value).toBe('')
        })

        it('should bind select model value', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Select Input',
                    modelValue: 'option2',
                    options: [
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' }
                    ]
                }
            })

            const select = wrapper.find('select')
            expect(select.element.value).toBe('option2')
        })
    })

    describe('Edge Cases', () => {
        it('should handle empty options array', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Empty Select',
                    modelValue: '',
                    options: []
                }
            })

            const select = wrapper.find('select')
            expect(select.exists()).toBe(true)

            const options = wrapper.findAll('option')
            expect(options).toHaveLength(1) // Only default option
            expect(options[0].text()).toBe('Seleccionar...')
        })

        it('should handle options with number values', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Number Select',
                    modelValue: 2,
                    options: [
                        { value: 1, label: 'One' },
                        { value: 2, label: 'Two' },
                        { value: 3, label: 'Three' }
                    ]
                }
            })

            const select = wrapper.find('select')
            expect(select.element.value).toBe('2')

            const options = wrapper.findAll('option')
            expect(options[1].attributes('value')).toBe('1')
            expect(options[2].attributes('value')).toBe('2')
            expect(options[3].attributes('value')).toBe('3')
        })

        it('should handle long error messages', () => {
            const longError = 'This is a very long error message that should be displayed correctly and not break the layout of the form field component'

            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Test Field',
                    error: longError,
                    modelValue: ''
                }
            })

            const errorMessage = wrapper.find('p.text-red-600')
            expect(errorMessage.exists()).toBe(true)
            expect(errorMessage.text()).toBe(longError)
        })

        it('should handle special characters in label', () => {
            const wrapper = mount(UiFormField, {
                props: {
                    label: 'Field with Special Characters: @#$%^&*()',
                    modelValue: ''
                }
            })

            const label = wrapper.find('label')
            expect(label.text()).toBe('Field with Special Characters: @#$%^&*()')
        })
    })
})
