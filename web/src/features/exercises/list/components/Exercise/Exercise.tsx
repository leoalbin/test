import dayjs from 'dayjs'
import Avatar from 'react-avatar'

import { HelperText } from 'src/atoms/HelperText'
import { ScrollArea } from 'src/atoms/ScrollArea'
import { Text } from 'src/atoms/Text'

import Card from '../../../../../components/Card/Card'

interface ExerciseProps {
  exercise: {
    id: string
    user: {
      name: string
    }
    content: string
    created_at: string
  }
}

const Exercise = ({ exercise }: ExerciseProps) => {
  return (
    <Card>
      <ExerciseHeader>
        <ExerciseAvatar name={exercise.user.name} />
        <ExerciseUserName>{exercise.user.name}</ExerciseUserName>
      </ExerciseHeader>
      <ExerciseContent>
        <Text>{exercise.content}</Text>
      </ExerciseContent>
      <ExerciseFooter>
        <HelperText>
          created: {dayjs(exercise.created_at).format('DD MMM YYYY')}
        </HelperText>
      </ExerciseFooter>
    </Card>
  )
}

const ExerciseFooter = ({ children }) => {
  return (
    <div className="flex h-16 items-center rounded-b-lg bg-slate-200 p-2 pl-8 text-sm text-slate-50 dark:bg-slate-700">
      {children}
    </div>
  )
}

const ExerciseContent = ({ children }) => {
  return (
    <div className="h-32 flex-grow bg-slate-100 p-8 dark:bg-slate-600">
      <div className="h-full">
        <ScrollArea>{children}</ScrollArea>
      </div>
    </div>
  )
}

const ExerciseUserName = ({ children }) => {
  return (
    <div className="ml-4 text-base font-bold text-slate-900 dark:text-white">
      {children}
    </div>
  )
}

const ExerciseAvatar = ({ name }) => {
  return (
    <div className="flex h-16 w-16 items-center justify-center">
      <Avatar
        className="text-white"
        name={name}
        size={'45'}
        textSizeRatio={1.2}
        round={true}
      />
    </div>
  )
}

const ExerciseHeader = ({ children }) => {
  return (
    <div className="flex h-24 items-stretch justify-between rounded-t-lg bg-slate-200 p-4 dark:bg-slate-700">
      <div className="flex h-16 items-center">{children}</div>
    </div>
  )
}

export default Exercise
