import { createContext, useContext, useEffect, useMemo, useState } from 'react'

interface SidebarContextType {
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  width: number
}

type SidebarContextProviderProps = {
  children: React.ReactNode
  width: number
}

const SidebarContext = createContext<SidebarContextType>(null)
export const useSidebarContext = () => useContext(SidebarContext)

export function SidebarProvider({
  children,
  width,
}: SidebarContextProviderProps) {
  const [showSidebar, setShowSidebar] = useState<boolean>(true)

  useEffect(() => {
    console.log(window.innerWidth)
    if (window.innerWidth <= 500) {
      setShowSidebar(false)
    }
  }, [])

  //if screen width is less than 400 px, hide sidebar

  const value: SidebarContextType = useMemo(() => {
    return {
      showSidebar,
      setShowSidebar,
      width,
    }
  }, [showSidebar, setShowSidebar, width])

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
