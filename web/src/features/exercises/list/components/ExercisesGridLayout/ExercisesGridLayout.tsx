type ExercisesGridLayoutProps = {
  children?: React.ReactNode
}

const ExercisesGridLayout = ({ children }: ExercisesGridLayoutProps) => {
  return (
    <div>
      <div className="mx-auto grid grid-cols-1 gap-3 p-8 lg:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>
    </div>
  )
}

export default ExercisesGridLayout
