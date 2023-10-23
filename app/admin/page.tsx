import React from "react";
import requireAuth from "../libs/requireAuth";
import DashboardAdminPage from "./dashboard/page";

export const metadata = {
  title: "Dashboard Admin",
};

export default async function DashBoard() {
  return requireAuth(
    <div className="py-3">
      <div>
        <DashboardAdminPage />
      </div>
    </div>,
    [1]
  );
}
