const NavLinks = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="flex flex-col mt-4 font-medium pt-8 lg:mt-0">{children}</ul>
  )
}

export default NavLinks
