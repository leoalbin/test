import { useSidebarContext } from 'src/components/Sidebar/contexts/SidebarContext'

const HamburgerButton = () => {
  const { setShowSidebar, showSidebar } = useSidebarContext()
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <button
      onClick={() => {
        setShowSidebar(!showSidebar)
      }}
      id="sidebar-toggle"
      name="sidebar-toggle"
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      role="button"
      className="fixed left-5 top-5 z-50 inline-flex items-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
    >
      <span className="sr-only">Open sidebar</span>
      <svg
        className="h-6 w-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>
  )
}

export default HamburgerButton
