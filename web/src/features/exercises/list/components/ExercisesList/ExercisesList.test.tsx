import { render } from '@redwoodjs/testing/web'

import ExercisesList from './ExercisesList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExercisesList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExercisesList />)
    }).not.toThrow()
  })
})
