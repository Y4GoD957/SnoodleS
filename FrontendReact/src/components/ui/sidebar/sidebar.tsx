import React from "react"
import { SidebarProvider } from "./sidebar-context"
import { SidebarExtended } from "./sidebar-extended"

export const Sidebar = () => {
  return (
    <SidebarProvider>
      <SidebarExtended />
    </SidebarProvider>
  )
}

export default Sidebar