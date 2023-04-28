const Card = ({ children }) => {
  return (
    <div
      className="flex min-h-full  w-full flex-col justify-between rounded-lg bg-slate-100 dark:bg-slate-600 "
      style={{
        maxHeight: '500px',
      }}
    >
      {children}
    </div>
  )
}

export default Card
