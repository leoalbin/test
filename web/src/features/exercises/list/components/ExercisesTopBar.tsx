export const ExercisesTopBar = ({ children }) => {
  return (
    <div className="sticky top-0 flex w-full items-center justify-between bg-slate-300 p-8  dark:bg-slate-800">
      {children}
    </div>
  )
}
