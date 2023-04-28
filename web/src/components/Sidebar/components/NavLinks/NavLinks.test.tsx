import { render } from '@redwoodjs/testing/web'

import NavLinks from './NavLinks'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavLinks', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavLinks />)
    }).not.toThrow()
  })
})
