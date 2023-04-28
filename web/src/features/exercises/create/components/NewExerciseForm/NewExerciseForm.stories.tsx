// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof NewExerciseForm> = (args) => {
//   return <NewExerciseForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import NewExerciseForm from './NewExerciseForm'

export const generated = () => {
  return <NewExerciseForm />
}

export default {
  title: 'Components/NewExerciseForm',
  component: NewExerciseForm,
} as ComponentMeta<typeof NewExerciseForm>
