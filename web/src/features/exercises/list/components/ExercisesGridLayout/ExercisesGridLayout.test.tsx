import { render } from '@redwoodjs/testing/web'

import ExercisesGridLayout from './ExercisesGridLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ExercisesGridLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExercisesGridLayout />)
    }).not.toThrow()
  })
})
