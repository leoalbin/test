import { render } from '@redwoodjs/testing/web'

import { SidebarProvider } from 'src/components/Sidebar/contexts/SidebarContext'

export function renderSideBarContext(children) {
  return render(<SidebarProvider width={300}>{children}</SidebarProvider>)
}
