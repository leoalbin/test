import Logo from '../Logo/Logo'

import { Sidebar } from './Sidebar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const SidebarImplementation = () => {
  return (
    <Sidebar.Root width={260}>
      <Sidebar.Hamburger />
      <Sidebar.Layout>
        <Sidebar.Hamburger />
        <div className="py-6">
          <Logo />
        </div>
        <Sidebar.Nav>
          <Sidebar.Link pageName="exercises">Exercises</Sidebar.Link>
          <Sidebar.Link pageName="createExercise">Create</Sidebar.Link>
        </Sidebar.Nav>
      </Sidebar.Layout>
    </Sidebar.Root>
  )
}

describe('SideBar', () => {
  it('renders successfully', () => {
    expect(() => <SidebarImplementation />).not.toThrow()
  })
})
