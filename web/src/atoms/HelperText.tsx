export const HelperText = ({ children, ...props }) => {
  return (
    <div className="text-sm dark:text-slate-200 text-slate-700" {...props}>
      {children}
    </div>
  )
}
