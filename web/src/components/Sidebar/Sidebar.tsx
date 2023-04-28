import MainLayout from 'src/layouts/MainLayout/MainLayout'

import HamburgerButton from './components/HamburgerButton/HamburgerButton'
import NavLink from './components/NavLink/NavLink'
import NavLinks from './components/NavLinks/NavLinks'
import { SidebarLayout } from './components/SidebarLayout'
import { SideBarRoot } from './components/SideBarRoot'

export const Sidebar = {
  Root: SideBarRoot,
  Layout: SidebarLayout,
  Nav: NavLinks,
  Link: NavLink,
  Hamburger: HamburgerButton,
  Main: MainLayout,
}

export default SidebarLayout
