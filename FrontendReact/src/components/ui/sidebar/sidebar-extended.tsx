import React, { forwardRef, HTMLAttributes } from "react"
import { useSidebar } from "./sidebar-hooks"
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE } from "./sidebar-variants"

export const SidebarExtended = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { state, open, toggleSidebar, isMobile, openMobile } = useSidebar()

    const width = isMobile ? SIDEBAR_WIDTH_MOBILE : SIDEBAR_WIDTH

    return (
      <div
        ref={ref}
        style={{ width }}
        className={`transition-all duration-300 overflow-hidden ${
          state === "expanded" ? "bg-gray-100" : "bg-gray-50"
        }`}
        {...props}
      >
        <button onClick={toggleSidebar}>Toggle</button>
        {open && <div>Sidebar content</div>}
        {isMobile && openMobile && <div>Mobile content</div>}
      </div>
    )
  }
)

SidebarExtended.displayName = "SidebarExtended"