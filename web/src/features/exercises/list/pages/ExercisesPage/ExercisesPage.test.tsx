import { render } from '@redwoodjs/testing/web'

import ExercisesPage from './ExercisesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ExercisesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExercisesPage />)
    }).not.toThrow()
  })
})
