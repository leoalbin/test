import { useSidebarContext } from 'src/components/Sidebar/contexts/SidebarContext'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { showSidebar, width } = useSidebarContext()
  return (
    <div
      style={{
        width: showSidebar ? `calc(100% - ${width})` : '100%',
      }}
    >
      {children}
    </div>
  )
}

export default MainLayout
