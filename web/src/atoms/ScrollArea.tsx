export const scrollbarStyles =
  'scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-400 overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full mr-2'

export const ScrollArea = ({ children, ...props }) => {
  return (
    <div className={`w-full h-full ${scrollbarStyles}`} {...props}>
      {children}
    </div>
  )
}
