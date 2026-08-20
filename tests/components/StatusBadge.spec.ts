import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import StatusBadge from '~/components/StatusBadge.vue'
import type { ApplicationStatus } from '~/types/visa'

describe('StatusBadge', () => {
  it.each<ApplicationStatus>(['Pending', 'Approved', 'Rejected'])('renders the centered %s variant', async (status) => {
    const wrapper = await mountSuspended(StatusBadge, { props: { status } })

    expect(wrapper.text()).toContain(status)
    expect(wrapper.get('span').classes()).toContain('justify-center')
    expect(wrapper.get('img').attributes('src')).toBeTruthy()
  })
})
