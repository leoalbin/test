interface SubtitleProps {
  as?: keyof JSX.IntrinsicElements
  children: React.ReactNode
}

export function Subtitle(props: SubtitleProps) {
  const { as: Tag = 'h2', children, ...rest } = props

  return (
    <Tag {...rest} className="leading-3 text-gray-900 dark:text-white">
      {children}
    </Tag>
  )
}
