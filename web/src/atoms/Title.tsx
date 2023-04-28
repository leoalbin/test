interface TitleProps {
  children: React.ReactNode
}

export const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="text-2xl font-bold leading-3 text-gray-900 dark:text-white">
      {children}
    </h1>
  )
}
