import { renderSideBarContext } from 'src/components/Sidebar/utils/renderSideBarContext'

import MainLayout from './MainLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MainLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      renderSideBarContext(<MainLayout />)
    }).not.toThrow()
  })
})
