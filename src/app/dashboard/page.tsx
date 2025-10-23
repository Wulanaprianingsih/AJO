"use client";
import DashboardAdminContainer from "modules/dashboard/containers/DashboardAdminContainer";
import DashboardUserContainer from "modules/dashboard/containers/DashboardUserContainer";
import React from "react";
import { useUserStore } from "store/userDataStore";

export default function DashboardPage() {
  const userData = useUserStore((s) => s.userProfile);
  const role = userData?.role;
  if (role === "admin") {
    return <DashboardAdminContainer />;
  } else {
    return <DashboardUserContainer />;
  }
}
