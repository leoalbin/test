// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ExercisesList> = (args) => {
//   return <ExercisesList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ExercisesList from './ExercisesList'

export const generated = () => {
  return <ExercisesList />
}

export default {
  title: 'Components/ExercisesList',
  component: ExercisesList,
} as ComponentMeta<typeof ExercisesList>
