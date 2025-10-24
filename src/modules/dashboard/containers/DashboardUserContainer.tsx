"use client";

import React from "react";
import DashboardUserComponent from "../components/DashboardUserComponent";
import { useUserStore } from "store/userDataStore";

export default function DashboardUserContainer() {
  const userData = useUserStore((s) => s.userProfile);
  const role = userData?.role;

  const dashboardData = {
    point: userData?.points ?? 0,
    badge: userData?.user_badges?.[0].name ?? "",
    level: userData?.level ?? 1,
  };

  return <DashboardUserComponent role={role} dashboardData={dashboardData} />;
}
