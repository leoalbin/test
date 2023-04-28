interface SpacerProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Spacer = ({ size }: SpacerProps) => {
  switch (size) {
    case 'xs':
      return <div className="h-2 w-2" />
    case 'sm':
      return <div className="h-4 w-4 " />
    case 'md':
      return <div className="h-8 w-8" />
    case 'lg':
      return <div className="h-16 w-16" />
    case 'xl':
      return <div className="h-32 w-32" />
  }
}
