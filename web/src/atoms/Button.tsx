export const Button = ({ children, ...props }) => {
  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  )
}
