import type { ComponentMeta } from '@storybook/react'

import CreateExercisePage from './CreateExercisePage'

export const generated = () => {
  return <CreateExercisePage />
}

export default {
  title: 'Pages/CreateExercisePage',
  component: CreateExercisePage,
} as ComponentMeta<typeof CreateExercisePage>
