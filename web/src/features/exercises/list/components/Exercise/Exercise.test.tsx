import { render } from '@redwoodjs/testing/web'

import Exercise from './Exercise'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Exercise', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Exercise
          exercise={{
            id: 'e8db8fe0-e0bf-4fff-87d0-1ed369b6acd0',
            user: {
              name: 'Foo Bar',
            },
            content: 'Sample Exercise',
            created_at: '2021-06-11T02:17:32-07:00',
          }}
        />
      )
    }).not.toThrow()
  })
})
