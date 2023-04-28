import React from 'react'

import { gql } from '@apollo/client'

import Loader from 'src/components/Loader/Loader'
import withQuery from 'src/hocs/withQuery'

import Exercise from '../Exercise/Exercise'
import ExercisesGridLayout from '../ExercisesGridLayout/ExercisesGridLayout'

// Define your query
const GET_ALL_EXERCISES = gql`
  query getAllExercisesQuery {
    getAllExercises {
      id
      user_id
      content
      created_at
      user {
        name
      }
    }
  }
`

// Define your loading, error, empty, and success components
const LoadingComponent = () => (
  <ExercisesGridLayout>
    {Array.from(Array(10).keys()).map((index) => (
      <Loader key={index} />
    ))}
  </ExercisesGridLayout>
)
const ErrorComponent = ({ error }) => <div>Error: {error.message}</div>
const EmptyComponent = () => <div>No data found.</div>
const SuccessComponent = ({ data }) => (
  <ExercisesGridLayout>
    {data.getAllExercises.map((exercise) => (
      <Exercise
        key={exercise.id}
        exercise={{
          id: exercise.id,
          user: {
            name: exercise.user.name,
          },
          content: exercise.content,
          created_at: exercise.created_at,
        }}
      />
    ))}
  </ExercisesGridLayout>
)

// Use the withQuery HOC to fetch data and render different components based on the state of the query
const ExercisesList = withQuery(
  GET_ALL_EXERCISES,
  LoadingComponent,
  EmptyComponent,
  ErrorComponent,
  SuccessComponent
)

export default ExercisesList
