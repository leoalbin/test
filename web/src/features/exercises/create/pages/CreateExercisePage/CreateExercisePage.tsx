import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Button } from 'src/atoms/Button'
import { Spacer } from 'src/atoms/Spacers'
import { Title } from 'src/atoms/Title'
import NewExerciseForm from 'src/features/exercises/create/components/NewExerciseForm/NewExerciseForm'
import AppLayout from 'src/layouts/AppLayout/AppLayout'

import { ExercisesTopBar } from '../../../list/pages/ExercisesPage/ExercisesTopBar'

const CreateExercisePage = () => {
  return (
    <>
      <MetaTags title="CreateExercise" description="CreateExercise page" />
      <AppLayout>
        <MetaTags title="Exercises" description="Exercises page" />
        <ExercisesTopBar>
          <div className="flex items-center ">
            <Title>Create a new exercise</Title>
            <Spacer size="md" />
          </div>
          <Button>
            <Link to={routes.createExercise()}>Create</Link>
          </Button>
        </ExercisesTopBar>
        <Spacer size="sm" />
        <div className="flex w-full max-w-xl items-center justify-center p-8">
          <NewExerciseForm />
        </div>
      </AppLayout>
    </>
  )
}

export default CreateExercisePage
