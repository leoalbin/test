export const schema = gql`
  type ExerciseUser {
    name: String
  }

  type ExerciseDTO {
    id: String
    user_id: String
    content: String
    created_at: String
    user: ExerciseUser
  }

  type TimeRangeOutput {
    start: String
    end: String
  }
  input CreateExerciseInput {
    userId: String!
    content: String!
  }

  type CreateExerciseInputResponse {
    status: String!
  }

  type Mutation {
    createExercise(input: CreateExerciseInput!): CreateExerciseInputResponse!
      @skipAuth
  }

  type Query {
    getAllExercises: [ExerciseDTO] @skipAuth
  }
`
