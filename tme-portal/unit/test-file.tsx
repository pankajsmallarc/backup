import '@testing-library/jest-dom'
import Banner from './banner.component'
import { BannerState } from '../../models/banner.interface'
import { renderWithContext, getStateWithItems } from '../../utils/test-utils'

describe('Banner', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  const bannerState: BannerState = {
    banner: {
      icon: '',
      title: '',
      message: '',
    },
    autoDelete: 5000,
    showBanner: false,
  }
  const initialState = getStateWithItems({
    bannerState,
  })
  it('should render Banner when no data', () => {
    const { baseElement } = renderWithContext(<Banner />)
    expect(baseElement).toBeTruthy()
  })

  it('should render Banner with initial state', () => {
    const { baseElement } = renderWithContext(<Banner />, initialState)
    expect(baseElement).toBeTruthy()
  })

  it('should render Banner with showBanner', () => {
    const coreState: any = {
      banner: {
        ...initialState,
        showBanner: true,
        banner: {
          icon: 'success',
          title: 'user',
          message: 'User added or updated.',
        },
        autoDelete: 5000,
      },
    }
    const { baseElement } = renderWithContext(<Banner />, coreState)
    expect(baseElement).toBeTruthy()
    jest.advanceTimersByTime(5000)
  })
  it('should render close Banner', () => {
    const coreState: any = {
      banner: {
        ...initialState,
        showBanner: false,
        banner: {
          icon: '',
          title: '',
          message: '',
        },
        autoDelete: 5000,
      },
    }
    const { baseElement } = renderWithContext(<Banner />, coreState)
    expect(baseElement).toBeTruthy()
    jest.advanceTimersByTime(5000)
  })
  it('should render Banner with showBanner', () => {
    const coreState: any = {
      banner: {
        ...initialState,
        showBanner: true,
        banner: {
          icon: 'warning',
          title: 'user',
          message: 'User updated.',
        },
        autoDelete: 5000,
      },
    }
    const { baseElement } = renderWithContext(<Banner />, coreState)
    expect(baseElement).toBeTruthy()
    jest.advanceTimersByTime(5000)
  })
})
