import { CircleLoader } from 'react-spinners'

import {
  FieldError,
  Form,
  FormError,
  Label,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { Button } from 'src/atoms/Button'
import { Spacer } from 'src/atoms/Spacers'
import { Text } from 'src/atoms/Text'

import Card from '../../../../../components/Card/Card'

const inputClass =
  'appearance-none w-50 mr-10 bg-slate-200 dark:bg-slate-500 block text-sm text-slate-900 dark:text-white p-2 rounded focus:outline-none focus:bg-slate-400 opacity-60 focus:opacity-100'

const errorInputClass = `${inputClass} border border-red-300`

const NewExerciseForm = () => {
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

  const CreateExercise = gql`
    mutation CreateExerciseMutation($input: CreateExerciseInput!) {
      createExercise(input: $input) {
        status
      }
    }
  `

  const [createExercise, { loading, error }] = useMutation(CreateExercise, {
    onCompleted: () => {
      navigate(routes.exercises())
    },
  })

  return (
    <Card>
      <Form formMethods={formMethods} onSubmit={onSubmit}>
        <div className="flex flex-col p-8">
          <Label name="userId" htmlFor="userId">
            <Text as="span">User Id</Text>
          </Label>
          <Spacer size="xs" />
          <TextField
            className={inputClass}
            errorClassName={errorInputClass}
            // required
            name="userId"
            validation={{
              required: 'User id required',
            }}
          />
          <Spacer size="xs" />
          <FieldError name="userId" className="text-sm text-red-400 " />
          <Spacer size="md" />
          <Label name="content" htmlFor="content">
            <Text as="span">Content</Text>
          </Label>
          <Spacer size="xs" />
          <TextAreaField
            className={inputClass}
            rows={5}
            name="content"
            id="content"
            validation={{
              required: 'Content required',
              maxLength: {
                value: 100,
                message: 'Please shorten your exercise!',
              },
            }}
          />
          <Spacer size="xs" />
          <FieldError name={'content'} className="text-sm text-red-400 " />
          <Spacer size="md" />
          {error && (
            <div className="mb-4 rounded-lg bg-red-200 p-6 text-red-950">
              <FormError error={error} />
            </div>
          )}
          <Button disabled={!formState?.isValid || loading} type="submit">
            <div className="flex items-center justify-center">
              Save
              <Spacer size="xs" />
              {loading && <CircleLoader size={20} />}
            </div>
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default NewExerciseForm
