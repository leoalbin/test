import type { ComponentMeta, ComponentStory } from '@storybook/react'

import ExercisesGridLayout from './ExercisesGridLayout'

export const generated: ComponentStory<typeof ExercisesGridLayout> = (args) => {
  return <ExercisesGridLayout {...args} />
}

export default {
  title: 'Layouts/ExercisesGridLayout',
  component: ExercisesGridLayout,
} as ComponentMeta<typeof ExercisesGridLayout>
