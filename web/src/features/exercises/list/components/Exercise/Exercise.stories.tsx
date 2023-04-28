// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Exercise> = (args) => {
//   return <Exercise {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Exercise from './Exercise'

export const generated = () => {
  return <Exercise />
}

export default {
  title: 'Components/Exercise',
  component: Exercise,
} as ComponentMeta<typeof Exercise>
