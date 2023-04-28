interface TextProps {
  as?: keyof JSX.IntrinsicElements
  children: React.ReactNode
}

export function Text(props: TextProps) {
  const { as: Tag = 'p', children, ...rest } = props

  return (
    <Tag {...rest} className="font-base text-gray-900 dark:text-white">
      {children}
    </Tag>
  )
}
