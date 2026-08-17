import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import CountryDropdown from '~/components/CountryDropdown.vue'
import { canada, germany, unitedStates } from '../fixtures/countries'

describe('CountryDropdown', () => {
  it('fuzzy searches and emits a selected country', async () => {
    const wrapper = await mountSuspended(CountryDropdown, {
      props: { id: 'citizenship', label: 'Citizenship', countries: [canada, germany, unitedStates], modelValue: null }
    })
    await wrapper.get('.select-control').trigger('click')
    await wrapper.get('input').setValue('Grmany')
    expect(wrapper.text()).toContain('Germany')
    expect(wrapper.text()).not.toContain('Berlin')
    await wrapper.get('.option').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([germany])
  })

  it('disables a conflicting selection', async () => {
    const wrapper = await mountSuspended(CountryDropdown, {
      props: { id: 'destination', label: 'Destination', countries: [canada, germany], modelValue: null, disabledCode: 'CAN' }
    })
    await wrapper.get('.select-control').trigger('click')
    expect(wrapper.findAll('.option')[0]?.attributes('disabled')).toBeDefined()
  })

  it('shows countries beyond the first page of alphabetical results', async () => {
    const countries = Array.from({ length: 50 }, (_, index) => ({
      ...canada,
      code: `C${index}`,
      name: `Country ${String(index).padStart(2, '0')}`
    }))

    const wrapper = await mountSuspended(CountryDropdown, {
      props: { id: 'citizenship', label: 'Citizenship', countries: [...countries, unitedStates], modelValue: null }
    })
    await wrapper.get('.select-control').trigger('click')

    expect(wrapper.text()).toContain('United States')
    expect(wrapper.findAll('.option')).toHaveLength(51)
  })
})
