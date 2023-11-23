import GetCurrentUser from "@/app/actions/getCurrentUser";
import React from "react";
import DesktopSidebar from "./DesktopSidebar";

async function SidebarChat({ children }: { children: React.ReactNode }) {
  const currentUser = await GetCurrentUser();
  return (
    <div className="h-full flex">
      <DesktopSidebar currentUser={currentUser} />
      <main className="h-full w-full flex">{children}</main>
    </div>
  );
}

export default SidebarChat;
