import { render } from '@redwoodjs/testing/web'

import NewExerciseForm from './NewExerciseForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewExerciseForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewExerciseForm />)
    }).not.toThrow()
  })
})
