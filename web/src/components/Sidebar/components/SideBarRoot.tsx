import { SidebarProvider } from 'src/components/Sidebar/contexts/SidebarContext'

interface SidebarRootProps {
  children: React.ReactNode
  width: number
}

export const SideBarRoot = ({ children, width }: SidebarRootProps) => {
  return <SidebarProvider width={width}>{children}</SidebarProvider>
}
