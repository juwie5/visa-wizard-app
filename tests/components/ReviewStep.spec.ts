import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import ReviewStep from '~/components/steps/ReviewStep.vue'
import type { VisaFormData } from '~/types/visa'
import { canada, germany } from '../fixtures/countries'

const form: VisaFormData = {
  citizenship: canada,
  destination: germany,
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  phone: '802 123 4567',
  phoneCountry: germany,
  dateOfBirth: '1990-01-01',
  passportNumber: 'A-1234567'
}

describe('ReviewStep', () => {
  it('renders applicant and country details with the idd calling code', async () => {
    const wrapper = await mountSuspended(ReviewStep, { props: { form } })

    expect(wrapper.text()).toContain('Ada Lovelace')
    expect(wrapper.text()).toContain('+49 802 123 4567')
    expect(wrapper.text()).toContain('38,005,238')
    expect(wrapper.text()).toContain('German')
  })

  it('emits back and submit actions', async () => {
    const wrapper = await mountSuspended(ReviewStep, { props: { form } })
    const buttons = wrapper.findAll('button')
    await buttons[0]!.trigger('click')
    await buttons[1]!.trigger('click')

    expect(wrapper.emitted('back')).toHaveLength(1)
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })
})
