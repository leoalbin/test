import { useForm } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { CreateExercise } from '../mutations/CreateExercise'

export function useNewExercise() {
  const formMethods = useForm({
    reValidateMode: 'onBlur',
    shouldFocusError: true,
  })
  const formState = formMethods.formState

  const onSubmit = (data) => {
    createExercise({
      variables: {
        input: {
          userId: data.userId,
          content: data.content,
        },
      },
    })
  }

  const [createExercise, { loading, error }] = useMutation(CreateExercise, {
    onCompleted: () => {
      navigate(routes.exercises())
    },
  })

  return {
    formMethods,
    onSubmit,
    error,
    loading,
    formState,
  }
}
