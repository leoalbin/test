import { ScrollArea } from 'src/atoms/ScrollArea'
import Logo from 'src/components/Logo/Logo'
import { Sidebar } from 'src/components/Sidebar/Sidebar'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex h-screen w-screen flex-col bg-slate-300 dark:bg-slate-800">
      <div className="flex w-full">
        <Sidebar.Root width={260}>
          <Sidebar.Hamburger />
          <Sidebar.Layout>
            <Sidebar.Hamburger />
            <div className="py-6">
              <Logo />
            </div>
            <Sidebar.Nav>
              <Sidebar.Link pageName="exercises">Exercises</Sidebar.Link>
              <Sidebar.Link pageName="createExercise">Create</Sidebar.Link>
            </Sidebar.Nav>
          </Sidebar.Layout>
        </Sidebar.Root>
        <div className="h-screen flex-1 flex-grow bg-slate-300 dark:bg-slate-800">
          <ScrollArea>{children}</ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default AppLayout
