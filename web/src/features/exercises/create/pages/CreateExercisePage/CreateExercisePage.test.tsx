import { render } from '@redwoodjs/testing/web'

import CreateExercisePage from './CreateExercisePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateExercisePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateExercisePage />)
    }).not.toThrow()
  })
})
