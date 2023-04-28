import { useSidebarContext } from 'src/components/Sidebar/contexts/SidebarContext'

export const SidebarLayout = ({ children }) => {
  const { showSidebar, width } = useSidebarContext()
  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <aside
      style={{
        width: width,
      }}
      id="default-sidebar"
      role="complementary"
      className={`fixed left-0 top-0 z-40 h-screen transition-transform sm:relative sm:translate-x-0  ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label="Sidenav"
    >
      <div className="h-full overflow-y-auto border-r border-slate-200 bg-slate-800 px-3 py-5 dark:border-slate-700 dark:bg-slate-900">
        <nav className=" border-gray-200 px-4">{children}</nav>
      </div>
    </aside>
  )
}
