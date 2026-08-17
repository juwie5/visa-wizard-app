import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import PhoneField from '~/components/PhoneField.vue'
import { canada, germany } from '../fixtures/countries'

describe('PhoneField', () => {
  it('changes the calling-code country without changing the phone number', async () => {
    const wrapper = await mountSuspended(PhoneField, {
      props: {
        id: 'phone',
        label: 'Phone Number',
        modelValue: '8021234567',
        countries: [canada, germany],
        selectedCountry: canada
      }
    })

    await wrapper.get('[aria-label="Choose phone country code"]').trigger('click')
    const germanyOption = wrapper.findAll('[role="option"]').find(option => option.text().includes('Germany'))
    await germanyOption?.trigger('click')

    expect(wrapper.emitted('update:selectedCountry')?.[0]).toEqual([germany])
    expect(wrapper.get('#phone').element).toHaveProperty('value', '8021234567')
  })
})
