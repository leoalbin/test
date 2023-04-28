import { navigate, routes } from '@redwoodjs/router'

const NavLink = ({
  pageName,
  href,
  children,
}: {
  href?: string
  pageName?: string
  children: React.ReactNode
}) => {
  return (
    <li>
      <a
        href={href || '#'}
        onClick={(e) => {
          if (!pageName) return
          e.preventDefault()
          navigate(routes[pageName]())
        }}
        className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-white"
        aria-current="page"
      >
        {children}
      </a>
    </li>
  )
}

export default NavLink
