import { renderSideBarContext } from '../../utils/renderSideBarContext'

import HamburgerButton from './HamburgerButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HamburgerButton', () => {
  it('renders successfully', () => {
    expect(() => {
      renderSideBarContext(<HamburgerButton />)
    }).not.toThrow()
  })
})
