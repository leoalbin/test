import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Button } from 'src/atoms/Button'
import { Spacer } from 'src/atoms/Spacers'
import { Subtitle } from 'src/atoms/Subtitle'
import { Title } from 'src/atoms/Title'
import ExercisesList from 'src/features/exercises/list/components/ExercisesList/ExercisesList'
import AppLayout from 'src/layouts/AppLayout/AppLayout'

import { ExercisesTopBar } from './ExercisesTopBar'

const ExercisesPage = () => {
  return (
    <AppLayout>
      <MetaTags title="Exercises" description="Exercises page" />
      <ExercisesTopBar>
        <div className="flex flex-col items-start pl-6 sm:flex-row sm:items-center sm:pl-0 ">
          <Title>Exercises</Title>
          <Spacer size="md" />
          <Subtitle as="h3"> A list of exercises of all users</Subtitle>
        </div>
        <Button
          onClick={() => {
            navigate(routes.createExercise())
          }}
        >
          Create
        </Button>
      </ExercisesTopBar>
      <Spacer size="sm" />
      <ExercisesList />
    </AppLayout>
  )
}

export default ExercisesPage
